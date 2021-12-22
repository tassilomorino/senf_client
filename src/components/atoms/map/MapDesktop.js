/** @format */

import React, { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { openScreamFunc } from "../../../redux/actions/screamActions";
import {
  setMapLoaded,
  setMapViewport,
} from "../../../redux/actions/mapActions";
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
  Image,
} from "@urbica/react-map-gl";
import { LinearInterpolator, WebMercatorViewport } from "react-map-gl";
import bbox from "@turf/bbox";

import NoLocationPopUp from "./NoLocationPopUp";
import { DesktopMapButtons } from "./DesktopMapButtons";
import { PatternBackground } from "./styles/sharedStyles";
import { useParams } from "react-router";

import Bubble1 from "../../../images/bubbles/bubble1.png";
import Bubble2 from "../../../images/bubbles/bubble2.png";
import Bubble3 from "../../../images/bubbles/bubble3.png";
import Bubble4 from "../../../images/bubbles/bubble4.png";
import Bubble5 from "../../../images/bubbles/bubble5.png";
import Bubble6 from "../../../images/bubbles/bubble6.png";
import Bubble7 from "../../../images/bubbles/bubble7.png";

import { openProjectRoomFunc } from "../../../redux/actions/projectActions";

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-95%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  z-index: -1;
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
  openProjectRoom,
  _onViewportChange,
  zoomBreak,
  mapRef,
  projects,
  order,
}) => {
  const openInfoPage = useSelector((state) => state.UI.openInfoPage);
  const openScream = useSelector((state) => state.UI.openScream);

  const scream = useSelector((state) => state.data.scream);

  const dispatch = useDispatch();
  const [hoverScreamId, setHoverScreamId] = useState("");
  const [hoverLat, setHoverLat] = useState("");
  const [hoverLong, setHoverLong] = useState("");
  const [hoverTitle, setHoverTitle] = useState("");
  const [hoverLikeCount, setHoverLikeCount] = useState("");

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const initialMapViewport = useSelector(
    (state) => state.data.initialMapViewport
  );
  const mapLoaded = useSelector((state) => state.data.mapLoaded);
  const [projectRoomBounds, setProjectRoomBounds] = useState(null);

  const { screamId } = useParams();

  const handlleMapLoaded = () => {
    dispatch(setMapLoaded());

    if (
      !screamId &&
      !openProjectRoom &&
      initialMapViewport !== null &&
      mapLoaded
    ) {
      setTimeout(() => {
        dispatch(setMapViewport(initialMapViewport));
      }, 1000);

      setTimeout(() => {
        // mapRef.fitBounds([
        //   [32.958984, -5.353521], // southwestern corner of the bounds
        //   [43.50585, 5.615985], // northeastern corner of the bounds
        // ]);
        // dispatch(
        //   setMapViewport({
        //     ...mapViewport,
        //     bounds: [
        //       [6.3, 50.7],
        //       [6.8, 50.9],
        //     ],
        //   })
        // );
      }, 2000);
    }
  };
  useEffect(() => {
    if (!initialMapViewport) return;
    setTimeout(() => {
      dispatch(setMapViewport(initialMapViewport));
    }, 1000);
  }, [initialMapViewport]);

  useEffect(() => {
    if (!loadingProjects && geoData !== undefined && geoData !== "") {
      const feature = JSON.parse(geoData);

      if (geoData && feature && mapViewport) {
        // calculate the bounding box of the feature
        const [minLng, minLat, maxLng, maxLat] = bbox(feature);

        const size = maxLat - minLat + maxLng - minLng;
        const newZoom =
          size < 0.05 ? 15.5 : size < 0.1 ? 13.5 : size < 0.2 ? 12.5 : 10.5;

        const newViewport = {
          latitude: (minLat + maxLat) / 2,
          longitude: (minLng + maxLng) / 2,
          zoom: newZoom,
          duration: 2700,
          pitch: 30,
        };
        console.log(mapViewport, newViewport);
        dispatch(setMapViewport(newViewport));
      }
    }
  }, [geoData]);

  const data =
    !loadingProjects &&
    geoData !== undefined &&
    geoData !== "" &&
    JSON.parse(geoData);
  // const data =
  //   !loadingProjects && geoData !== undefined && geoData !== ""
  //     ? {
  //         type: "Feature",
  //         geometry: {
  //           type: "Polygon",
  //           coordinates: [JSON.parse(geoData)],
  //         },
  //       }
  //     : null;

  let dataNoLocation = [];
  let dataFinalMap = [];
  let geojsonIdeas = { type: "FeatureCollection", features: [] };
  let geojsonProjectRooms = { type: "FeatureCollection", features: [] };

  if (dataFinal !== undefined && dataFinal.length > 0) {
    dataFinal.forEach((element) => {
      if (element.lat === 50.93864020643174) {
        dataNoLocation.push(element);
      }
    });
  }

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

  for (let point of dataFinalMap) {
    let properties = point;
    properties.circleRadius = 5 + point.likeCount / 7;
    properties.circleBlurRadius = 14 + point.likeCount / 7;

    delete properties.longitude;
    delete properties.latitude;

    const unique =
      dataFinalMap.filter((item) => item.long === point.long).length === 1;

    if (unique) {
      let feature = {
        type: "Feature",
        geometry: { type: "Point", coordinates: [point.long, point.lat] },
        properties: properties,
      };
      geojsonIdeas.features.push(feature);
    } else {
      function generateHash(string) {
        var hash = 0;
        if (string.length == 0) return hash;
        for (let i = 0; i < string.length; i++) {
          var charCode = string.charCodeAt(i);
          hash = (hash << 7) - hash + charCode;
          hash = hash & hash;
        }
        return hash;
      }

      function reversedNum(num) {
        return (
          parseFloat(num.toString().split("").reverse().join("")) *
          Math.sign(num)
        );
      }
      const hash = generateHash(point.screamId);

      point.long = point.long + hash / 100000000000000;
      point.lat = point.lat + reversedNum(hash) / 100000000000000;

      let feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.long, point.lat],
        },
        properties: properties,
      };
      geojsonIdeas.features.push(feature);
    }
  }

  for (let point of projects) {
    let properties = point;

    let feature = {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [point.centerLong, point.centerLat],
      },
      properties: properties,
    };
    geojsonProjectRooms.features.push(feature);
  }
  const onHoverIdea = (event) => {
    if (event.features.length > 0) {
      setHoverScreamId(event.features[0].properties.screamId);
      setHoverLat(event.features[0].properties.lat);
      setHoverLong(event.features[0].properties.long);
      setHoverTitle(event.features[0].properties.title);
      setHoverLikeCount(event.features[0].properties.likeCount);
    }
  };

  const onLeaveIdea = (event) => {
    setHoverScreamId("");
    setHoverLat("");
    setHoverLong("");
    setHoverTitle("");
    setHoverLikeCount("");
  };

  const onClickIdea = (event) => {
    if (event.features.length > 0) {
      dispatch(openScreamFunc(event.features[0].properties.screamId));
    }
  };

  const onHoverProjectRoom = (event) => {
    // if (event.features.length > 0) {
    //   setHoverScreamId(event.features[0].properties.screamId);
    //   setHoverLat(event.features[0].properties.lat);
    //   setHoverLong(event.features[0].properties.long);
    //   setHoverTitle(event.features[0].properties.title);
    //   setHoverLikeCount(event.features[0].properties.likeCount);
    // }
  };

  const onLeaveProjectRoom = (event) => {
    // setHoverScreamId("");
    // setHoverLat("");
    // setHoverLong("");
    // setHoverTitle("");
    // setHoverLikeCount("");
  };

  const onClickProjectRoom = (event) => {
    if (event.features.length > 0) {
      dispatch(openProjectRoomFunc(event.features[0].properties.projectId));
    }
  };

  return (
    !isMobileCustom &&
    mapViewport && (
      <div className="mapWrapper">
        {!mapLoaded && <PatternBackground />}

        <MapGL
          ref={mapRef}
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
          minZoom={7}
          latitude={mapViewport.latitude}
          longitude={mapViewport.longitude}
          pitch={mapViewport.pitch}
          bearing={mapViewport.bearing}
          zoom={mapViewport.zoom}
          // maxBounds={
          //   openProject &&
          //   !loadingProjects &&
          //   geoData !== undefined &&
          //   geoData !== ""
          //     ? projectRoomBounds
          //     : null
          // }
          // bounds={
          //   openProject &&
          //   !loadingProjects &&
          //   geoData !== undefined &&
          //   geoData !== ""
          //     ? projectRoomBounds
          //     : null
          // }
          // bounds={
          //   openProject &&
          //   !loadingProjects &&
          //   geoData !== undefined &&
          //   geoData !== "" && [
          //     [6.5, 50.8],
          //     [6.8, 50.9],
          //   ]
          // }
          onViewportChange={_onViewportChange}
          viewportChangeMethod={"easeTo"}
          viewportChangeOptions={{
            duration: mapViewport.duration,
          }}
          onLoad={handlleMapLoaded}
        >
          <NavigationControl showCompass showZoom position="top-right" />
          {openProjectRoom &&
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
          <DesktopMapButtons viewport={mapViewport} mapRef={mapRef} />

          <Image id="Bubble1" image={Bubble1} />
          <Image id="Bubble2" image={Bubble2} />
          <Image id="Bubble3" image={Bubble3} />
          <Image id="Bubble4" image={Bubble4} />
          <Image id="Bubble5" image={Bubble5} />
          <Image id="Bubble6" image={Bubble6} />
          <Image id="Bubble7" image={Bubble7} />

          <Source id="geojsonIdeas" type="geojson" data={geojsonIdeas} />
          <Source
            id="geojsonProjectRooms"
            type="geojson"
            data={geojsonProjectRooms}
          />
          {order === 1 || openScream || openProjectRoom ? (
            <React.Fragment>
              <Layer
                id="geojsonIdeasblur"
                source="geojsonIdeas"
                type="circle"
                paint={{
                  "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    ["*", 0, ["get", "circleBlurRadius"]],

                    10,
                    ["*", 0, ["get", "circleBlurRadius"]],

                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property

                    14,
                    ["*", 4, ["get", "circleRadius"]],
                    20,
                    ["*", 0, ["get", "circleRadius"]],
                  ],
                  "circle-color": "#000",

                  "circle-blur": 1,
                  "circle-opacity": 0.15,
                }}
              />
              <Layer
                id="geojsonIdeas"
                source="geojsonIdeas"
                type="circle"
                onHover={onHoverIdea}
                onLeave={onLeaveIdea}
                onClick={onClickIdea}
                paint={{
                  // "circle-radius": {
                  //   base: ["get", "likeCount"],
                  //   stops: [
                  //     [12, 3],
                  //     [22, 180],
                  //   ],
                  // },
                  "circle-radius": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    ["*", 0.1, ["get", "circleRadius"]],

                    10,
                    ["*", 0.4, ["get", "circleRadius"]],

                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                    14,
                    ["*", 1.5, ["get", "circleRadius"]],
                    20,
                    ["*", 1.2, ["get", "circleRadius"]],
                  ],
                  "circle-color": ["get", "color"],
                  // "circle-color": [
                  //   "match",
                  //   ["get", "Thema"],
                  //   "Rad",
                  //   "blue",
                  //   "Umwelt und Grün",
                  //   "#223b53",
                  //   "Verkehr",
                  //   "#e55e5e",
                  //   "Asian",
                  //   "#3bb2d0",
                  //   /* other */ "#ccc",
                  // ],
                  "circle-stroke-color": "#fff",
                  "circle-stroke-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                    0,
                    0.1,

                    10,
                    0.4,

                    // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                    20,
                    3,
                  ],
                }}
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
                      clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 82%)",
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
                    width: (7 + hoverLikeCount / 4) * zoomBreak + "px",
                    marginLeft: -(7 + hoverLikeCount / 4) * zoomBreak + "px",
                    height: (7 + hoverLikeCount / 4) * zoomBreak + "px",
                    marginTop: -(7 + hoverLikeCount / 4) * zoomBreak + "px",
                    borderRadius: "100%",
                    // border: "1px white solid",
                    // backgroundColor: "rgb(0,0,0,0.2)",

                    opacity: "1",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    className={classes.title}
                    style={{
                      marginLeft: +(18 + hoverLikeCount / 4) * zoomBreak + "px",
                      marginTop: +(5 + hoverLikeCount / 6) * zoomBreak + "px",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {hoverTitle}
                  </div>
                </div>
              </Marker>

              <NoLocationPopUp
                dataNoLocation={dataNoLocation}
              ></NoLocationPopUp>
            </React.Fragment>
          ) : (
            <Layer
              id="geojsonProjectRooms"
              source="geojsonProjectRooms"
              type="symbol"
              onHover={onHoverProjectRoom}
              onLeave={onLeaveProjectRoom}
              onClick={onClickProjectRoom}
              layout={{
                // "icon-image": "projectRoomIcon2",
                // "icon-image": `projectRoomIcon${Math.floor(Math.random() * 2)}`,

                "icon-image": [
                  "match",
                  ["get", "organizationType"],
                  "Vereine",
                  "Bubble1",
                  "Inititiven",
                  "Bubble2",
                  "Planungsbüros",
                  "Bubble3",
                  "Politik",
                  "Bubble4",
                  "Stadtverwaltung",
                  "Bubble5",
                  "Presse",
                  "Bubble6",
                  "Bubble7",
                ],
                "icon-size": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  // when zoom is 0, set each feature's circle radius to the value of its "rating" property
                  0,
                  0.01,

                  10,
                  0.05,

                  // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
                  20,
                  0.4,
                ],
                "icon-anchor": "bottom",
              }}
            />
          )}
        </MapGL>
      </div>
    )
  );
};

export default withStyles(styles)(MapDesktop);
