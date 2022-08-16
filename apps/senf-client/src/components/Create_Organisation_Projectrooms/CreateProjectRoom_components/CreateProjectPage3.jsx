/** @format */

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

// firebase
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { Loader, Hyperlink } from "senf-atomic-design-system";
import { db } from "../../../firebase";

// Components
import {
  ComponentInnerWrapper,
  ComponentWrapper,
} from "../styles/sharedStyles";
import { StyledH3 } from "../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

// images

const StyledLabel = styled.label`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin-left: calc(50% - 75px);
`;

const StyledIconWrapper = styled.div`
  flex-shrink: 0;
  width: 150px;
  height: 150px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255, 0.8);
  border-radius: 20px;
`;

const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const CreateProjectPage3 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [nextClicked, setNextClicked] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadImageHover, setUploadImageHover] = useState(false);

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
          "createProjectRoomOrganizationId"
        )}/${localStorage.getItem("createProjectRoomId")}/thumbnail`
      );
      const projectRoomRef = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );

      await uploadBytes(storageRef, compressedFile).then((snapshot) => {
        console.log("Uploaded a file!");
      });
      const logoURL = await getDownloadURL(storageRef);
      setUploadedImage(logoURL);
      await updateDoc(projectRoomRef, { logoURL });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `organizationsData/${localStorage.getItem(
        "createProjectRoomOrganizationId"
      )}/${localStorage.getItem("createProjectRoomId")}/thumbnail`
    );

    getDownloadURL(storageRef).then(onResolve, onReject);
    function onResolve(foundURL) {
      setUploadedImage(foundURL);
    }

    function onReject(error) {
      console.log(error.code);
    }
  }, [uploadedImage]);

  const handleNext = () => {
    setNextClicked(true);

    setTimeout(() => {
      if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
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
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>
          <StyledLabel
            onMouseEnter={() => setUploadImageHover(true)}
            onMouseLeave={() => setUploadImageHover(false)}
            htmlFor="imageUploader"
          >
            {(!uploadedImage || uploadImageHover) && (
              <StyledIconWrapper>
                {loading ? (
                  <div style={{ width: "50px" }}>
                    <Loader />
                  </div>
                ) : (
                  <Hyperlink alt="UploadImageIcon" />
                )}
              </StyledIconWrapper>
            )}

            {uploadedImage && <StyledImg src={uploadedImage} width="100%" />}
          </StyledLabel>
          <input
            type="file"
            onChange={(event) => handleImageUpload(event)}
            style={{ display: "none" }}
            id="imageUploader"
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        disabled={!uploadedImage || nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage3;
