/** @format */

import React, { useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import styled from "styled-components";
// Redux stuff
import { useDispatch } from "react-redux";

import { openScreamFunc } from "../../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";

import { isMobileCustom } from "../../../util/customDeviceDetect";

import NoLocationPopUp from "./NoLocationPopUp";
import MobileMapButtons from "./MobileMapButtons";
import ExpandButton from "../CustomButtons/ExpandButton";

//Icons
import Pin from "../../../images/pin3.png";
// import cologne_grid from "../../../images/cologne_grid.svg";

const OpenIdeaButton = styled.div`
  position: absolute;
  width: ${(props) => 7 + props.likeCount / 2 + "px"};
  height: ${(props) => 7 + props.likeCount / 2 + "px"};
  min-width: unset;

  margin-left: ${(props) => -((7 + props.likeCount) / 4) + "px"};
  margin-top: ${(props) => -(7 + props.likeCount) / 4 + "px"};
  border-radius: 100%;
  border: 1px white solid;
  background-color: ${(props) => props.color};
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 38px, rgba(0, 0, 0, 0.15) 0px 5px 5px;
`;

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-88%) translateX(-45%) rotate(0deg);
  transform-origin: bottom center;
  margin-top: ${(props) => -(7 + props.likeCount) / 4 + "px"};
`;

const MapMobile = ({
  dataFinal,
  viewport,

  _onViewportChange,
  handleShowResults,

  loadingProjects,
  geoData,
  setSwipePosition,
  setSwipeMovePosition,
}) => {
  const dispatch = useDispatch();

  const openScream = useSelector((state) => state.UI.openScream);
  const scream = useSelector((state) => state.data.scream);

  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchDataScream = (screamId) => {
    dispatch(openScreamFunc(screamId));
  };

  const data =
    !loadingProjects && geoData !== undefined && geoData !== ""
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [JSON.parse(geoData)],
          },
        }
      : null;

  let dataNoLocation = [];

  if (dataFinal !== undefined && dataFinal.length > 0) {
    dataFinal.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

  let dataFinalMap = [];
  const dataFinalMapArray = dataFinal;

  if (dataFinalMapArray !== undefined && dataNoLocation.length > 1) {
    dataFinalMapArray.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinalMapArray !== undefined && dataNoLocation.length < 2) {
    dataFinalMapArray.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  return (
    isMobileCustom && (
      <div
        style={{
          position: "fixed",
          zIndex: "9",
          width: "100vw",
          height: "100vh",
        }}
      >
        {/* {!mapLoaded && (
          <React.Fragment>
            <img
              src={cologne_grid}
              alt="Kiwi standing on oval"
              style={{ position: "absolute" }}
            />

            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "white",
              }}
            />
          </React.Fragment>
        )} */}
        <MapGL
          style={{
            width: "100%",
            height: "100%",
          }}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={9}
          {...viewport}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
          onLoad={() => setMapLoaded(true)}
        >
          <Source id="maine" type="geojson" data={data} />
          <Layer
            id="maine"
            type="fill"
            source="maine"
            paint={{
              "fill-color": "#fed957",
              "fill-opacity": 0.2,
            }}
          />

          {dataFinalMap.map((element) => (
            <Marker
              key={element.screamId}
              longitude={element.long}
              latitude={element.lat}
            >
              <OpenIdeaButton
                color={element.color}
                likeCount={element.likeCount}
                Thema={element.Thema}
                onClick={() => fetchDataScream(element.screamId)}
              >
                <ExpandButton
                  handleButtonClick={() => fetchDataScream(element.screamId)}
                />
              </OpenIdeaButton>
              <NoLocationPopUp
                dataNoLocation={dataNoLocation}
                setSwipePosition={setSwipePosition}
                setSwipeMovePosition={setSwipeMovePosition}
              />
            </Marker>
          ))}

          {openScream && scream.lat && (
            <Marker
              key={scream.screamId}
              longitude={scream.long}
              latitude={scream.lat}
            >
              <PinComponent
                src={Pin}
                likeCount={scream.likeCount}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 88%)",
                }}
                alt="ChatIcon"
              />
            </Marker>
          )}
        </MapGL>
      </div>
    )
  );
};

MapMobile.propTypes = {
  classes: PropTypes.object.isRequired,
  openScreamFunc: PropTypes.func.isRequired,
};

export default MapMobile;
