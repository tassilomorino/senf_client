/** @format */

import React from "react";
import PropTypes from "prop-types";

// Redux stuff
import { useSelector, useDispatch } from "react-redux";

import { openScream } from "../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";

import { isMobileCustom } from "../../util/customDeviceDetect";

//COOKIES
import TopicFilter from "../layout/TopicFilter";
import { CustomButton, CustomIconButton } from "../module/Buttons/CustomButton";
import { Trans } from "react-i18next";
import setColorByTopic from "../../data/setColorByTopic";

const Geofilter = ({
  classes,
  viewport,
  latitude1,
  latitude2,
  longitude2,
  longitude3,
  _onViewportChange,
  dataFinal,

  handleOpenGeofilter,
  handleCloseGeofilter,
  handleResetGeofilter,
  openGeofilter,
  showGeofilterResults,

  dataNoLocationHandle,
  selectedId,
  handleNoLocation,

  loadingProjects,
  geoData,
  handleTopicSelector,
  topicsSelected,
}) => {
  const dispatch = useDispatch();
  const { screams } = useSelector((state) => state.data);

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
  const dataArrayNoLocation = dataFinal;

  if (dataArrayNoLocation !== undefined && dataArrayNoLocation.length > 0) {
    dataArrayNoLocation.forEach((element) => {
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
  const noLocationNumber = dataNoLocation.length;

  const doubleNoLocation =
    dataNoLocation.length > 1 ? (
      <Marker
        key={"123456"}
        longitude={6.958725744885521}
        latitude={50.93864020643174}
      >
        <div
          style={{
            zIndex: 9999,
            position: "absolute",
            width: "20px",
            marginLeft: "-10px",
            height: "20px",
            marginTop: "-10px",
            borderRadius: "100%",
            border: "1px white solid",
            backgroundColor: "#414345",
            opacity: "1",
          }}
          onClick={dataNoLocationHandle}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              textAlign: "center",
              color: "white",
              marginTop: "0px",
            }}
          >
            {dataNoLocation.length}
          </div>
        </div>
      </Marker>
    ) : null;

  const doubleNoLocationPopUp =
    openGeofilter && selectedId !== "" ? (
      <Marker
        key={selectedId}
        longitude={6.958725744885521}
        latitude={50.93864020643174}
      >
        <div
          style={{
            position: "absolute",
            marginLeft: "-10px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              padding: "5px",
              backgroundColor: "white",
              marginTop: "5px",
              width: "60vw",
              marginLeft: "-30vw",

              height: "auto",
              borderRadius: "15px",
              zIndex: "9999",
              textAlign: "center",
              boxShadow: "none",
            }}
          >
            <p
              style={{
                fontFamily: "Futura PT W01-Bold",
                fontSize: "12pt",
                paddingRight: "2px",
                paddingLeft: "2px",
              }}
            >
              Ohne Ortsangabe
            </p>

            <CustomButton
              text={
                <Trans
                  i18nKey="show_noLocationNumber_ideas"
                  noLocationNumber={noLocationNumber}
                >
                  Show {{ noLocationNumber }} ideas
                </Trans>
              }
              backgroundColor="#353535"
              textColor="white"
              position="relative"
              bottom="10px"
              handleButtonClick={handleNoLocation}
            />
          </div>
        </div>
      </Marker>
    ) : null;

  return isMobileCustom ? (
    <div>
      {!openGeofilter && (
        <div
          onClick={handleOpenGeofilter}
          style={{
            display: "block",
            position: "absolute",
            top: "0px",
            marginTop: "0px",
            left: "calc(97.5vw - 137px)",
            zIndex: 10,
            width: "137px",
            height: "137px",
            borderRadius: "20px",
            backgroundColor: "rgb(0,0,0,0)",
          }}
        ></div>
      )}

      <div
        style={
          openGeofilter
            ? {
                position: "fixed",
                width: "100vw",
                height: "100vh",
                top: "0",
                left: "0",
                zIndex: "999",
                borderRadius: "0",
                transform: "scale(1)",
              }
            : {
                position: "relative",

                zIndex: "9",
                width: "100vw",
                height: "calc(100vh  - 100px)",
                transform: "scale(1)",
                overflow: "hidden",
              }
        }
      >
        <MapGL
          style={
            openGeofilter
              ? {
                  position: "fixed",
                  width: "calc(100% + 1px)",
                  height: "calc(100% + 1px)",
                  transform: "scale(1)",
                  zIndex: 999999,
                }
              : {
                  width: "calc(100% - 0)",
                  height: "calc(100% - 1px)",
                  transform: "scale(1)",
                }
          }
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={9}
          {...viewport}
          zoom={openGeofilter ? viewport.zoom : viewport.zoom - 2.5}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
        >
          {openGeofilter && (
            <CustomIconButton
              name="ArrowLeft"
              position="fixed"
              margin="10px"
              handleButtonClick={handleCloseGeofilter}
            />
          )}

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
              <div style={{ zIndex: 99 }}>
                {doubleNoLocation}
                {doubleNoLocationPopUp}
              </div>
            </Marker>
          ))}

          <TopicFilter
            handleTopicSelector={handleTopicSelector}
            topicsSelected={topicsSelected}
          ></TopicFilter>

          {openGeofilter && (
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
                  (latitude1 < 50.95) |
                  (latitude2 > 50.82) |
                  (longitude2 > 6.812) |
                  (longitude3 < 7.07)
                    ? {}
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
          )}
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
