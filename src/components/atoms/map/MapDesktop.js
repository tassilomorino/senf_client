/** @format */

import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { openScreamFunc } from "../../../redux/actions/screamActions";
import { setMapViewport } from "../../../redux/actions/mapActions";
//MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";

//Icons
import Pin from "../../../images/pin3.png";

//Map Stuff
import MapGL, {
  Source,
  Layer,
  Marker,
  NavigationControl,
} from "@urbica/react-map-gl";

import NoLocationPopUp from "./NoLocationPopUp";
import { DesktopMapButtons } from "./DesktopMapButtons";
import ExpandButton from "../CustomButtons/ExpandButton";

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

const styles = {
  root: {
    backgroundColor: "lightgrey",
  },
  title: {
    position: "absolute",
    width: "200px",
    display: "block",
    fontSize: "14px",
    lineHeight: "16px",
    fontFamily: "Futura PT W01-Bold",
    textShadow: "2px 2px 18px #FFFFFF",
    opacity: 1,
    transition: "0.2s",
    PointerEvents: "none",
  },
};

const MapDesktop = ({
  loadingProjects,
  classes,
  dataFinal,
  geoData,
  openProject,
}) => {
  const { t } = useTranslation();
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);
  const loading = useSelector((state) => state.UI.loading);

  const scream = useSelector((state) => state.data.scream);

  const dispatch = useDispatch();

  const [hoverScreamId, setHoverScreamId] = useState("");
  const [hoverLat, setHoverLat] = useState("");
  const [hoverLong, setHoverLong] = useState("");
  const [hoverTitle, setHoverTitle] = useState("");
  const [hoverLikeCount, setHoverLikeCount] = useState("");

  const viewport = useSelector((state) => state.data.mapViewport);

  const _onViewportChange = (viewport) => {
    dispatch(setMapViewport(viewport));
  };

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

  if (dataFinal !== undefined && dataNoLocation.length > 1) {
    dataFinal.forEach((element) => {
      if (element.lat !== 50.93864020643174) {
        dataFinalMap.push(element);
      }
    });
  }
  if (dataFinal !== undefined && dataNoLocation.length < 2) {
    dataFinal.forEach((element) => {
      dataFinalMap.push(element);
    });
  }

  return (
    !isMobileCustom && (
      <div className="mapWrapper">
        <MapGL
          style={
            openInfoPage
              ? {
                  position: "fixed",
                  width: "100%",
                  height: "100%",
                  transform: "scale(1)",
                  left: 0,
                }
              : {
                  position: "fixed",
                  width: "calc(100% - 600px)",
                  left: "600px",
                  height: "100%",
                  transform: "scale(1)",
                }
          }
          mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
          accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          minZoom={8}
          latitude={viewport.latitude}
          longitude={viewport.longitude}
          pitch={viewport.pitch}
          bearing={viewport.bearing}
          zoom={viewport.zoom}
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: 2700,
          }}
        >
          <NavigationControl showCompass showZoom position="top-right" />
          {openProject && (
            <React.Fragment>
              <Source id="maine" type="geojson" data={data} />
              <Layer
                id="maine"
                type="fill"
                source="maine"
                paint={{
                  "fill-color": "#fed957",
                  "fill-opacity": 0.3,
                }}
              />
            </React.Fragment>
          )}
          <DesktopMapButtons viewport={viewport} />

          <div style={{ zIndex: 90 }}>
            {dataFinalMap.map(
              ({ screamId, long, lat, likeCount, color, title }) => (
                <Marker key={screamId} longitude={long} latitude={lat}>
                  <OpenIdeaButton
                    likeCount={likeCount}
                    color={color}
                    onClick={() => fetchDataScream(screamId)}
                    onMouseEnter={() => {
                      setHoverScreamId(screamId);
                      setHoverLat(lat);
                      setHoverLong(long);
                      setHoverTitle(title);
                      setHoverLikeCount(likeCount);
                    }}
                    onMouseLeave={() =>
                      setTimeout(() => {
                        setHoverScreamId("");
                        setHoverLat("");
                        setHoverLong("");
                        setHoverTitle("");
                        setHoverLikeCount("");
                      }, 10000)
                    }
                  >
                    <ExpandButton
                      handleButtonClick={() => fetchDataScream(screamId)}
                    />
                  </OpenIdeaButton>
                </Marker>
              )
            )}

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

            <Marker
              key={hoverScreamId}
              longitude={hoverLong}
              latitude={hoverLat}
            >
              <div
                style={{
                  position: "absolute",
                  width: 7 + hoverLikeCount / 2 + "px",
                  marginLeft: -((7 + hoverLikeCount) / 4) + "px",
                  height: 7 + hoverLikeCount / 2 + "px",
                  marginTop: -(7 + hoverLikeCount) / 4 + "px",
                  borderRadius: "100%",
                  border: "1px white solid",
                  backgroundColor: "rgb(0,0,0,0.2)",
                  zIndex: 0,

                  opacity: "1",
                  pointerEvents: "none",
                }}
              >
                <div
                  className={classes.title}
                  style={{
                    marginLeft: +(20 + hoverLikeCount) / 2 + "px",
                    marginTop: +(5 + hoverLikeCount) / 4 + "px",
                    transform: "translateY(-50%)",
                  }}
                >
                  {hoverTitle}
                </div>
              </div>
            </Marker>
          </div>

          <NoLocationPopUp dataNoLocation={dataNoLocation}></NoLocationPopUp>
        </MapGL>
      </div>
    )
  );
};

export default withStyles(styles)(MapDesktop);
