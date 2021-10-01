/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// Redux stuff
import { useDispatch } from "react-redux";

import { openScream } from "../../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";

import { isMobileCustom } from "../../../util/customDeviceDetect";

import setColorByTopic from "../../../data/setColorByTopic";
import NoLocationPopUp from "./NoLocationPopUp";
import MobileMapButtons from "./MobileMapButtons";

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
  background-color: ${(props) => setColorByTopic(props.Thema)};
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 38px, rgba(0, 0, 0, 0.15) 0px 5px 5px;
`;

const MapMobile = ({
  dataFinal,
  viewport,

  _onViewportChange,
  handleShowResults,

  loadingProjects,
  geoData,
}) => {
  const dispatch = useDispatch();

  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchDataScream = (screamId) => {
    dispatch(openScream(screamId));
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
                setColorByTopic={setColorByTopic}
                likeCount={element.likeCount}
                Thema={element.Thema}
                onClick={() => fetchDataScream(element.screamId)}
              >
                <button
                  onClick={() => fetchDataScream(element.screamId)}
                  className="buttonExpand ripple"
                />
              </OpenIdeaButton>
              <NoLocationPopUp dataNoLocation={dataNoLocation} />
            </Marker>
          ))}

          <MobileMapButtons
            number={dataFinal.length}
            handleShowResults={handleShowResults}
          />
        </MapGL>
      </div>
    )
  );
};

MapMobile.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  openScream: PropTypes.func.isRequired,
};

export default MapMobile;
