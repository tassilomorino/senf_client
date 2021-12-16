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
import { Title, SubTitle, ButtonsWrapper } from "./styles/sharedStyles";
import CreateProjectTitle from "./CreateProjectTitle";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

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

const CreateProjectPage4 = ({ onClickNext, onClickPrev }) => {
  const { t } = useTranslation();

  const [mapOpen, setMapOpen] = useState(false);
  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(null);
  const [data, setData] = useState(null);

  const _onViewportChange = (viewport) => {
    setViewport(viewport);
  };

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createProjectRoomOrganizationId"))
          .collection("projectRooms")
          .doc(localStorage.getItem("createProjectRoomId"))
          .get();

        if (!ref.exists) {
          console.log("No such document!");
        } else {
          const data = ref.data();

          if (data.geoData) {
            setData(JSON.parse(data.geoData));
          }
          if (data.centerLong) {
            setViewport({
              latitude: data.centerLat,
              longitude: data.centerLong,
              zoom: data.zoom,
              pitch: 0,
            });
          } else {
            const viewport = {
              zoom: mapViewport.zoom,
              latitude: mapViewport.latitude,
              longitude: mapViewport.longitude,
              transitionDuration: 1000,
            };
            setViewport(viewport);
          }
        }
      }
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <MapDialog
        mapOpen={mapOpen}
        setMapOpen={setMapOpen}
        viewport={viewport}
        mapRef={mapRef}
        _onViewportChange={_onViewportChange}
        data={data}
        setData={setData}
        setViewport={setViewport}
      />

      <Wrapper>
        <CreateProjectTitle />
        <Title>Gebiet festlegen</Title>
        <SubTitle>
          Mit deinem individeullen Projektraum kannst du ortsbezogen Ideen
          sammeln. Zeichne das Gebiet ein!
        </SubTitle>

        <DrawMapButton onClick={setMapOpen}>
          {data ? (
            <MapPreview
              mapOpen={mapOpen}
              setMapOpen={setMapOpen}
              viewport={viewport}
              mapRef={mapRef}
              _onViewportChange={_onViewportChange}
              data={data}
              setData={setData}
            />
          ) : (
            <StyledImg src={DrawMapImage} />
          )}
        </DrawMapButton>

        <ButtonsWrapper>
          <SubmitButton
            text={t("next")}
            zIndex="9"
            backgroundColor="white"
            textColor="#353535"
            top={document.body.clientWidth > 768 ? "100px" : "70px"}
            left="0"
            handleButtonClick={onClickNext}
            disabled={!data}
            //   keySubmitRef={keySubmitRef}
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
    </React.Fragment>
  );
};

export default CreateProjectPage4;
