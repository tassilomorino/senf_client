/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import {
  Plus,
  Check,
  Icon,
  Box,
  Button,
  RoundedButton,
  Map,
} from "senf-atomic-design-system";
import { db } from "../../../firebase";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

// import { createProjectSaveData } from "../../../../redux/actions/formDataActions";
import { StyledH2 } from "../../../styles/GlobalStyle";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const MapWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: grey;
  position: fixed;
  z-index: 99999999999;
  /* visibility: ${(props) => (props.mapOpen ? "visible" : "hidden")}; */
  /* -webkit-clip-path: inset(10px round 80px 20px 30px 10px); */
  /* clip-path: inset(10px round 20px 20px 20px 20px); */
  /* clip-path: polygon(500px 500px); */
  /* clip: rect(10px, 290px, 190px, 10px); */
  clip-path: ${(props) =>
    props.mapOpen ? "inset(0px round 20px 20px 20px 20px)" : "url(#svgPath1)"};
  overflow: hidden;
`;
const OpenButton = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: ${(props) => (props.mapOpen ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background-color: rgba(255, 255, 255, 0.4);

  @media (min-width: 768px) {
    background-color: rgba(255, 255, 255, 0);
    display: ${(props) => (props.mapOpen ? "none" : "block")};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    display: ${(props) => (props.mapOpen ? "none" : "flex")};
  }
`;

const Title = styled.div`
  margin-left: 50%;
  transform: translateX(-50%);
  color: #353535;
  align-self: center;
  position: fixed;
  top: ${(props) => (props.isMobileCustom ? "10px" : "40px")};
  background-color: rgb(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  white-space: nowrap;
  padding: 14px;
  z-index: 1;
`;

const MapDialog = ({ mapOpen, setMapOpen, drawnPolygon, setDrawnPolygon }) => {
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const [initialMapBounds, setInitialMapBounds] = useState(null);

  const [statefulMap, setStatefulMap] = useState(null);

  // const escFunction = useCallback((event) => {
  //   if (event.keyCode === 27 && !data) {
  //     // Do whatever when esc is pressed

  //     handleDelete();
  //     setMode("simple_select");
  //     setPolygon(false);
  //     setTimeout(() => {
  //       setMode("draw_polygon");
  //     }, 1009);
  //   }
  // }, []);

  // useEffect(() => {
  //   document.addEventListener("keydown", escFunction, false);

  //   return () => {
  //     document.removeEventListener("keydown", escFunction, false);
  //   };
  // }, []);

  const handleClose = () => {
    setMapOpen(false);
  };

  const handleSaveDrawnPolygon = async (polygon) => {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId") &&
      polygon
    ) {
      setDrawnPolygon(polygon)
      // UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        geoData: JSON.stringify(polygon),
      };
      const ref = doc(
        db,
        `organizations/${localStorage.getItem(
          "createProjectRoomOrganizationId"
        )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
      );
      await updateDoc(ref, updateProject).then(() => {
        setMapOpen(false);
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
        const ref = doc(
          db,
          "organizations",
          localStorage.getItem("createProjectRoomOrganizationId"),
          "projectRooms",
          localStorage.getItem("createProjectRoomId")
        );
        const docSnapshot = await getDoc(ref);

        if (!docSnapshot.exists()) {
          console.log("No such document!");
        } else {
          const data = docSnapshot.data();
          if (data.geoData) {
            setDrawnPolygon(JSON.parse(data.geoData));
          }
        }
      }
    }
    fetchData();
  }, []);

  return ReactDOM.createPortal(
    <MapWrapper mapOpen={mapOpen} id="drawMapWindow">
      <OpenButton mapOpen={mapOpen} onClick={() => setMapOpen(true)}>
        {" "}
        <Icon icon={<Plus transform="scale(2)" />} />
      </OpenButton>
      <svg width="calc(100% - 400px)" height="60%" viewBox="0 0 100% 244">
        <clipPath id="svgPath1">
          <rect
            width="400"
            height="300"
            x="50%"
            y="50%"
            rx="18"
            fill="#D9D9D9"
          />
        </clipPath>
      </svg>
      <Box
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        zIndex={999}
        top="0"
      >
        <RoundedButton
          icon={<Plus transform="rotate(45)" />}
          onClick={handleClose}
        />
      </Box>

      <Title isMobileCustom={isMobileCustom}>
        <StyledH2 fontWeight="900" textAlign="center">
          Zeichne das Gebiet ein
        </StyledH2>
      </Title>

      <Map
        mapType="draw"
        initialMapViewport={initialMapViewport}
        statefulMap={statefulMap}
        setStatefulMap={setStatefulMap}
        setInitialMapBounds={setInitialMapBounds}
        drawnPolygon={drawnPolygon}
        setDrawnPolygon={setDrawnPolygon}
        drawMapOpen={mapOpen}
        handleSaveDrawnPolygon={handleSaveDrawnPolygon}
      ></Map>
    </MapWrapper>,
    document.getElementById("portal-root")
  );
};

export default MapDialog;
