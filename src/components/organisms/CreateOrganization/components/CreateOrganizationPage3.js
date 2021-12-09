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
import { ButtonsWrapper, SubTitle, Title } from "./styles/sharedStyles";

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

const CreateOrganizationPage3 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );

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
        `organizationsData/${localStorage.getItem(
          "createOrganizationId"
        )}/logo/logo`
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
    const storageRef = firebase.storage().ref();
    storageRef
      .child(
        `organizationsData/${localStorage.getItem(
          "createOrganizationId"
        )}/logo/logo`
      )
      .getDownloadURL()
      .then(onResolve, onReject);

    function onResolve(foundURL) {
      setUploadedImage(foundURL);
    }

    function onReject(error) {
      console.log(error.code);
    }
  }, [uploadedImage]);

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
      <ButtonsWrapper>
        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          transformX="none"
          marginLeft="0"
          handleButtonClick={onClickNext}
          // disabled={!formikCreateProjectStore.isValid}
          // keySubmitRef={keySubmitRef}
        />
        <SubmitButton
          text={t("back")}
          zIndex="9"
          backgroundColor="transparent"
          shadow={false}
          textColor="#353535"
          left="0"
          handleButtonClick={onClickPrev}
          //   keySubmitRef={keySubmitRef}
        />
      </ButtonsWrapper>
    </Wrapper>
  );
};

export default CreateOrganizationPage3;
