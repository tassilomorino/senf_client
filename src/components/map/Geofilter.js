/** @format */

import React, { useState } from "react";
import PropTypes from "prop-types";

// Redux stuff
import { useSelector, useDispatch } from "react-redux";

import { openScream } from "../../redux/actions/screamActions";
import { setResetMapBounds } from "../../redux/actions/mapActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";

import { isMobileCustom } from "../../util/customDeviceDetect";

//COOKIES
import TopicFilter from "../layout/TopicFilter";
import {
  CustomButton,
  CustomIconButton,
} from "../module/CustomButtons/CustomButton";
import { Trans } from "react-i18next";
import setColorByTopic from "../../data/setColorByTopic";
import NoLocationPopUp from "./NoLocationPopUp";

const Geofilter = ({
  viewport,
  _onViewportChange,
  dataFinal,

  handleCloseGeofilter,
  handleResetGeofilter,

  loadingProjects,
  geoData,
  handleTopicSelector,
  topicsSelected,
}) => {
  const dispatch = useDispatch();

  const { screams } = useSelector((state) => state.data);
  const { mapBounds } = useSelector((state) => state.data);

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

  const number = dataFinal.length;

  return isMobileCustom ? (
    <div>
      <div
        style={{
          position: "relative",
          zIndex: "9",
          width: "100vw",
          height: "calc(100vh  - 100px)",
        }}
      >
        <MapGL
          style={{
            width: "100%",
            height: "100%",
          }}
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={9}
          {...viewport}
          zoom={viewport.zoom}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
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
              <div
                style={{
                  position: "absolute",
                  width: 7 + element.likeCount / 2 + "px",
                  marginLeft: -((7 + element.likeCount) / 4) + "px",
                  height: 7 + element.likeCount / 2 + "px",
                  marginTop: -(7 + element.likeCount) / 4 + "px",
                  borderRadius: "100%",
                  border: "1px white solid",
                  backgroundColor: setColorByTopic(element.Thema),
                  opacity: "1",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: "0",
                    left: 0,
                    borderRadius: "100%",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => fetchDataScream(element.screamId)}
                    className="buttonExpand ripple"
                  ></button>
                </div>
              </div>
              <NoLocationPopUp
                dataNoLocation={dataNoLocation}
              ></NoLocationPopUp>
            </Marker>
          ))}

          <TopicFilter
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>

          <React.Fragment>
            <CustomButton
              text={
                <Trans i18nKey="show_number_ideas" number={number}>
                  Show {{ number }} ideas
                </Trans>
              }
              backgroundColor="white"
              textColor="#353535"
              position="fixed"
              bottom="50px"
              marginLeft="calc(50% - 20px)"
              handleButtonClick={handleCloseGeofilter}
              animation={true}
            />

            <div
              style={
                (mapBounds.latitude1 < 50.95) |
                (mapBounds.latitude2 > 50.82) |
                (mapBounds.longitude2 > 6.812) |
                (mapBounds.longitude3 < 7.07)
                  ? { opacity: 1 }
                  : { opacity: 0.7, pointerEvents: "none" }
              }
            >
              <CustomIconButton
                name="CircularArrow"
                margin="0px"
                position="fixed"
                bottom="50px"
                marginLeft="calc(50% + 80px)"
                handleButtonClick={handleResetGeofilter}
                animation={true}
              />
            </div>
          </React.Fragment>
        </MapGL>
      </div>
    </div>
  ) : null;
};

Geofilter.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  openScream: PropTypes.func.isRequired,
};

export default Geofilter;
