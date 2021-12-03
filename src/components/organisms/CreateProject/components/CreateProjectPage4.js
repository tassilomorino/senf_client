/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MapDialog from "./MapDialog";

import DrawMapImage from "../../../../images/drawMap.jpg";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";
import { createProjectSaveData } from "../../../../redux/actions/formDataActions";
import MapPreview from "./MapPreview";
import { Title, SubTitle } from "./styles/sharedStyles";
import CreateProjectTitle from "./CreateProjectTitle";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DrawMapButton = styled.label`
  width: 150px;
  height: 150px;
  border-radius: 20px;
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImg = styled.img`
  flex-shrink: 0;
  width: 200px;
  object-fit: cover;
`;

const CreateProjectPage4 = ({ onClickNext }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [mapOpen, setMapOpen] = useState(false);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(null);
  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );
  useEffect(() => {
    const viewport = {
      zoom: mapViewport.zoom,
      latitude: mapViewport.latitude,
      longitude: mapViewport.longitude,
      transitionDuration: 1000,
    };
    setViewport(viewport);
  }, []);

  const _onViewportChange = (viewport) => {
    setViewport(viewport);
  };

  const handleDelete = (data, createProjectFormData) => {
    if (data) {
      var createProjectData = {
        ...createProjectFormData,
        geoData: null,
      };

      dispatch(createProjectSaveData(createProjectData));

      setTimeout(() => {
        setMapOpen(true);
      }, 1000);
    }
  };

  return (
    <React.Fragment>
      <MapDialog
        mapOpen={mapOpen}
        setMapOpen={setMapOpen}
        viewport={viewport}
        mapRef={mapRef}
        _onViewportChange={_onViewportChange}
        handleDelete={handleDelete}
      />

      <Wrapper>
        <CreateProjectTitle />
        <Title>Ort festlegen</Title>
        <SubTitle>
          Mit deinem individeullen Projektraum kannst du ortsbezogen Ideen
          sammeln. Zeichne das Gebiet ein!
        </SubTitle>

        <DrawMapButton onClick={setMapOpen}>
          {createProjectFormData && createProjectFormData.geoData ? (
            <MapPreview
              mapOpen={mapOpen}
              setMapOpen={setMapOpen}
              viewport={viewport}
              mapRef={mapRef}
              _onViewportChange={_onViewportChange}
              handleDelete={handleDelete}
            />
          ) : (
            <StyledImg src={DrawMapImage} />
          )}
        </DrawMapButton>

        <SubmitButton
          text={t("next")}
          zIndex="9"
          backgroundColor="white"
          textColor="#353535"
          transformX="none"
          marginLeft="0"
          position="relative"
          top={document.body.clientWidth > 768 ? "100px" : "30px"}
          left="0"
          handleButtonClick={onClickNext}
          // disabled={!formikCreateProjectStore.isValid}
          // keySubmitRef={keySubmitRef}
        />
      </Wrapper>
    </React.Fragment>
  );
};

export default CreateProjectPage4;
