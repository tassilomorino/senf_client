/** @format */

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { openScreamFunc } from "../../../redux/actions/screamActions";

//MAPSTUF
import MapGL, { Source, Layer, Marker } from "@urbica/react-map-gl";
import NoLocationPopUp from "./NoLocationPopUp";
import { setMapViewport } from "../../../redux/actions/mapActions";

//Icons
import Pin from "../../../images/pin3.png";
import { MarkersMobile } from "./Markers";
import { PatternBackground } from "./styles/sharedStyles";
import { useParams } from "react-router";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-90%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  margin-top: ${(props) =>
    -((7 + props.likeCount / 4) * props.zoomBreak) / 1.5 + "px"};
  margin-left: ${(props) =>
    -((7 + props.likeCount / 4) * props.zoomBreak) / 8 + "px"};
  z-index: 0;
`;

const MapMobile = ({
  dataFinal,
  viewport,
  openProject,
  _onViewportChange,
  zoomBreak,
  loadingProjects,
  geoData,
}) => {
  console.log("MapMobile rerendering");

  const dispatch = useDispatch();
  const { screamId } = useParams();

  const openScream = useSelector((state) => state.UI.openScream);
  const scream = useSelector((state) => state.data.scream);

  const [mapLoaded, setMapLoaded] = useState(false);

  const fetchDataScream = (screamId) => {
    dispatch(openScreamFunc(screamId));
  };

  const handlleMapLoaded = () => {
    setMapLoaded(true);
    if (!screamId && !openProject) {
      setTimeout(() => {
        const viewport = {
          latitude: 50.93864020643174,
          longitude: 6.958725744885521,
          zoom: isMobileCustom ? 9.5 : 11.5,
          transitionDuration: 4000,
          pitch: 30,
          bearing: 0,
        };
        dispatch(setMapViewport(viewport));
      }, 1000);
    }
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
      <Wrapper>
        {!mapLoaded && <PatternBackground />}
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
          onLoad={handlleMapLoaded}
        >
          {openProject &&
            !loadingProjects &&
            geoData !== undefined &&
            geoData !== "" && (
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

          <MarkersMobile
            dataFinalMap={dataFinalMap}
            fetchDataScream={fetchDataScream}
            zoomBreak={zoomBreak}
          />

          {openScream && scream.lat && (
            <Marker
              key={scream.screamId}
              longitude={scream.long}
              latitude={scream.lat}
            >
              <PinComponent
                src={Pin}
                likeCount={scream.likeCount}
                zoomBreak={zoomBreak}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 88%, 0 88%)",
                }}
                alt="ChatIcon"
              />
            </Marker>
          )}
          <NoLocationPopUp dataNoLocation={dataNoLocation} />
        </MapGL>
      </Wrapper>
    )
  );
};

export default MapMobile;
