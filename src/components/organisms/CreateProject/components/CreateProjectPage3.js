/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MapDialog from "./MapDialog";

import DrawMap from "../../../../images/drawMap.jpg";
import { CustomButton } from "../../../atoms/CustomButtons/CustomButton";

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

const CreateProjectPage1 = ({ outsideClick }) => {
  const { t } = useTranslation();
  const [mapOpen, setMapOpen] = useState(false);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(null);

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

  const handleDelete = () => {};

  return (
    <React.Fragment>
      <MapDialog
        mapOpen={mapOpen}
        setMapOpen={setMapOpen}
        viewport={viewport}
        mapRef={mapRef}
        _onViewportChange={_onViewportChange}
      />

      <Wrapper>
        <Title>Ort festlegen</Title>
        <h3>
          Mit deinem individeullen Projektraum kannst du Anlass- oder
          Ortsbezogen Ideen sammeln.
        </h3>

        <DrawMapButton onClick={setMapOpen}>
          <StyledImg src={DrawMap} />
        </DrawMapButton>
        <h3>
          Gebiet <br /> einzeichnen
        </h3>

        <CustomButton
          text={t("delete")}
          backgroundColor="#353535"
          textColor="white"
          position="relative"
          top="10px"
          zIndex="0"
          handleButtonClick={handleDelete}
        />
      </Wrapper>
    </React.Fragment>
  );
};

export default CreateProjectPage1;
