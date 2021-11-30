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
import Weblink from "../../../molecules/Modals/Post_Edit_ModalComponents/Weblink";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import UploadImageIcon from "../../../../images/icons/uploadImage.png";
import { CircularProgress } from "@material-ui/core";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
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

const ButttonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const CreateProjectPage1 = ({ onClickNext }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );
  const organization = useSelector((state) => state.user.organization);
  const underscoreProjectName = createProjectFormData?.projectRoom_name
    .split(" ")
    .join("_");
  const fileName = organization + ":_" + underscoreProjectName;

  const [weblinkOpen, setWeblinkOpen] = useState(false);
  const [weblink, setWeblink] = useState(null);
  const [weblinkTitle, setWeblinkTitle] = useState(null);

  const [contactOpen, setContactOpen] = useState(false);
  const [contact, setContact] = useState(null);
  const [contactTitle, setContactTitle] = useState(null);

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    setWeblink(null);
    setWeblinkTitle(null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

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
      <Title>
        {" "}
        "
        {createProjectFormData &&
          createProjectFormData.projectRoom_name &&
          createProjectFormData.projectRoom_name}
        " aufwerten
      </Title>

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

      <h3> Lade ein Bild hoch</h3>
      <ButttonsWrapper>
        <CustomIconButton
          name="Weblink"
          position="relative"
          iconWidth="80%"
          backgroundColor={
            weblink !== null && weblinkTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setWeblinkOpen(true)}
        />

        <CustomIconButton
          name="Contact"
          position="relative"
          marginLeft="20px"
          iconWidth="80%"
          zIndex={0}
          backgroundColor={
            contact !== null && contactTitle !== null ? "#fed957" : "white"
          }
          handleButtonClick={() => setContactOpen(true)}
        />
      </ButttonsWrapper>

      <h3> Füge Kontaktdaten hinzu!</h3>

      {weblinkOpen && (
        <Weblink
          handleCloseWeblink={handleCloseWeblink}
          handleSaveWeblink={handleSaveWeblink}
          weblinkTitle={weblinkTitle}
          weblink={weblink}
          setWeblinkTitle={setWeblinkTitle}
          setWeblink={setWeblink}
          setWeblinkOpen={setWeblinkOpen}
        />
      )}

      <SubmitButton
        text={t("next")}
        zIndex="9"
        backgroundColor="white"
        textColor="#353535"
        position="relative"
        top={document.body.clientWidth > 768 ? "100px" : "70px"}
        left="0"
        handleButtonClick={onClickNext}
        // disabled={!formikCreateProjectStore.isValid}
        // keySubmitRef={keySubmitRef}
      />
    </Wrapper>
  );
};

export default CreateProjectPage1;
