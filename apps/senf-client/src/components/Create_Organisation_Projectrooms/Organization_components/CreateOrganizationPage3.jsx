/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

// firebase
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { ImageUploadTile, Box, Typography } from "senf-atomic-design-system";
import { db } from "../../../firebase";
// redux
// import { createProjectSaveData } from "../../../../redux/actions/formDataActions";

// images
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import Navigation from "../Components/Navigation";

const CreateOrganizationPage3 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [loading, setLoading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);

  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];
    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    const options = {
      maxSizeMB: 0.03,
      maxWidthOrHeight: 700,
      useWebWorker: true,
    };
    try {
      setLoading(true);
      const compressedFile = await imageCompression(imageFile, options);
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `organizationsData/${localStorage.getItem(
          "createOrganizationId"
        )}/logo/logo`
      );
      await uploadBytes(storageRef, compressedFile).then((snapshot) => {
        console.log("Uploaded a file!");
      });
      const logoURL = await getDownloadURL(storageRef);
      const orgRef = doc(
        db,
        "organizations",
        localStorage.getItem("createOrganizationId")
      );
      await updateDoc(orgRef, { logoURL });

      setLoading(false);
      setUploadedImage(logoURL);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `organizationsData/${localStorage.getItem(
        "createOrganizationId"
      )}/logo/logo`
    );

    function onResolve(foundURL) {
      setUploadedImage(foundURL);
    }

    function onReject(error) {
      console.log(error.code);
    }

    getDownloadURL(storageRef).then(onResolve, onReject);
  }, [uploadedImage]);

  const handleNext = () => {
    setNextClicked(true);

    setTimeout(() => {
      if (localStorage.getItem("createOrganizationPostEdit") === "true") {
        set(pagesData.length - 1);
      } else {
        onClickNext();
      }
    }, 200);
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <Typography
            variant="h3"
            textAlign="center"
            margin="20px"
          >
            {pagesData[index].subTitle}
          </Typography>
          <Box
            justifyContent="center"
            marginTop="20px"
          >
            <ImageUploadTile
              photoURL={uploadedImage}
              uploadingImage={loading}
              handleImageUpload={handleImageUpload}
            />
          </Box>
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        index={index}
        pagesData={pagesData}
        disabled={!uploadedImage || nextClicked}
        loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPage3;
