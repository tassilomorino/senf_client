/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import imageCompression from "browser-image-compression";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//redux
import { createProjectSaveData } from "../../../../redux/actions/formDataActions";

//Components
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import UploadImageIcon from "../../../../images/icons/uploadImage.png";
import { CircularProgress } from "@material-ui/core";
import CreateProjectTitle from "./CreateProjectTitle";
import { SubTitle, Title } from "./styles/sharedStyles";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLabel = styled.label`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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

const CreateProjectPage3 = ({ onClickNext }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );
  const organization = useSelector((state) => state.user.organization);

  const fileName = null;

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
      const storageRef = firebase.storage().ref();

      const fileRef = storageRef.child(
        `projectRoomThumbnails/${fileName}/thumbnail`
      );
      await fileRef.put(compressedFile);
      setUploadedImage(
        await fileRef.getDownloadURL().then(() => {
          setLoading(false);
        })
      );

      var createProjectFormDataPage1 = {
        ...createProjectFormData,
        imgUrl: fileRef,
      };

      dispatch(createProjectSaveData(createProjectFormDataPage1));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadImageFromStorage(fileName, setUploadedImage);
    console.log(uploadedImage);

    const db = firebase.firestore();
    const ref = db.collection("projects").doc();
    const myId = ref.id;

    console.log(myId);
  }, []);

  const loadImageFromStorage = (fileName, setUploadedImage) => {
    const storageRef = firebase.storage().ref();
    storageRef
      .child(`projectRoomThumbnails/${fileName}/thumbnail`)
      .getDownloadURL()
      .then(onResolve, onReject);

    function onResolve(foundURL) {
      setUploadedImage(foundURL);
    }

    function onReject(error) {
      console.log(error.code);
    }
  };

  return (
    <Wrapper>
      <CreateProjectTitle />
      <Title> Bild hochladen</Title>
      <SubTitle>
        Lade ein aussagekräftiges Bild für den Projektraum hoch und wähle dabei
        nach Möglichkeit ein thematisch passendes Motiv.
      </SubTitle>

      <StyledLabel
        onMouseEnter={() => setUploadImageHover(true)}
        onMouseLeave={() => setUploadImageHover(false)}
        htmlFor="imageUploader"
      >
        {(!uploadedImage || uploadImageHover) && (
          <StyledIconWrapper>
            {loading ? (
              <CircularProgress size={50} thickness={2} />
            ) : (
              <img src={UploadImageIcon} alt="UploadImageIcon" width="50%" />
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

      <SubmitButton
        text={t("next")}
        zIndex="9"
        backgroundColor="white"
        textColor="#353535"
        transformX="none"
        marginLeft="0"
        position="relative"
        top={document.body.clientWidth > 768 ? "100px" : "70px"}
        handleButtonClick={onClickNext}
        // disabled={!formikCreateProjectStore.isValid}
        // keySubmitRef={keySubmitRef}
      />
    </Wrapper>
  );
};

export default CreateProjectPage3;
