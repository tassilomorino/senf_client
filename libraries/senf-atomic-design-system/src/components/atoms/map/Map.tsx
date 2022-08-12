/** @format */

import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

import bbox from "@turf/bbox";
import { useTranslation } from "react-i18next";
import { MapProps } from "./Map.types";
import { convertIdeasToGeoJson } from "./utils/convertIdeasToGeoJson";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";
import { addProjectroomMarkers } from "./utils/addProjectroomMarkers";

import useInitialFly from "./hooks/useInitialFly";
import useNavigationControl from "./hooks/useNavigationControl";
import useGeolocateControl from "./hooks/useGeolocateControl";
import useHover from "./hooks/useHover";

import useGeocoder from "./hooks/useGeocoder";
import useCoordinates from "./hooks/useCoordinates";
import useProjectroomsMarkers from "./hooks/useProjectroomsMarkers";
import useClickMarkers from "./hooks/useClickMarkers";
import usePolygon from "./hooks/usePolygon";
import useIdeasMarkers from "./hooks/useIdeasMarkers";
import usePin from "./hooks/usePin";
import useFly from "./hooks/useFly";
// import useDraw from "./hooks/useDraw";

import { Bulb } from "../../../assets/icons";
import Button from "../buttons/Button";
import Box from "../box/Box";
import MapFilter from "./MapFilter";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Icon from "../icons/Icon";
import Pin from "../../../assets/icons/Pin";
import Loader from "../animations/Loader";
import AddIdeaPin from "./hooks/AddIdeaPin"
import IdeaPin from "../../../assets/icons/IdeaPin";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1vcmlubyIsImEiOiJjazBzZHZjeWQwMWoyM2NtejlzcnMxd3FtIn0.I_Xcc1aJiN7hToGGjNy7ow";

const MarkerPin = styled.div`
  transform: translateY(-100%);
  display: ${({ visible }) => (visible ? "block" : "none")};
  pointer-events: none;

`;

const MapContainer = styled.div<MapProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: -100px;
  width: 100vw;
  height: calc(100vh + 100px);
  @media (min-width: 768px) {
    width: calc(100vw + 460px);
    height: 100vh;
    top: 0;
  }

  /* .mapboxgl-marker-anchor-center {
    display: none;
  } */
  .mapboxgl-ctrl-geocoder--input {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0 0.6rem 0 1.9rem;
    font-size: ${({ theme }) => theme.fontSizes[2]}rem;
    min-height: 50px;
    color: rgb(51, 51, 51) !important;
    background-color: ${({ theme }) => theme.colors.white.white100tra};
    border-radius: ${({ theme }) => theme.radii[1]}px;
    -webkit-border-radius: ${({ theme }) => theme.radii[1]}px;
    -moz-border-radius: ${({ theme }) => theme.radii[1]}px;
    border: 0;
    ${({ focus }) =>
    focus &&
    css`
        outline: 3px solid ${({ theme }) => theme.colors.primary.primary120} !important;
        outline-offset: -3px;
      `}

    input {
      max-height: 50px !important;
    }
  }
  .mapboxgl-ctrl-geocoder--icon-search {
    position: absolute;
    top: 17px;
    left: 10px;
    transform: scale(1.2);
    z-index: 1;
  }
  .mapboxgl-ctrl-geocoder--button {
    position: absolute;
    top: 10px;
    right: 10px;

    height: 30px !important;
    width: 30px !important;
    padding: 0 !important;
    border: 0 !important;

    border-radius: ${({ theme }) => theme.radii[0]}px;
    background-color: ${({ theme }) => theme.colors.greyscale.greyscale20tra};
    &:hover {
      background-color: ${({ theme }) => theme.colors.greyscale.greyscale40tra};
    }
  }
  .mapboxgl-ctrl-geocoder--icon-close {
    height: 16px !important;
    width: 16px !important;
  }

  .mapboxgl-popup {
    pointer-events: none !important;
    user-select: none !important;
  }
  .mapboxgl-popup-content {
    font-family: nunito;
    font-size: 14px;
    font-weight: 700;
    padding: 8px;
    pointer-events: none !important;
    user-select: none !important;

    ${(props) => LayerWhiteFirstDefault}
    border-radius:8px;
  }

  /* .mapboxgl-popup-tip {
    width: 0;
    height: 0;
    border: 10px solid transparent;
    z-index: 1;
  }
  .mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip {
    align-self: center;
    border-bottom: none;
    border-top-color: #fff;
  } */

  .mapboxgl-ctrl-geolocate {
    width: 50px;
    height: 50px;
    border-radius: 8px !important;
    ${(props) => LayerWhiteFirstDefault}
  }
/* 
  .marker {
  background-image: url("https://media.giphy.com/media/Bfa45K0r6cCIw/giphy.gif");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
} */
`;

const PinComponent = styled.img`
  position: absolute;
  width: 100px;
  transform: translateY(-95%) translateX(-50%) rotate(0deg);
  transform-origin: bottom center;

  z-index: -1;
`;

const Map: FC<MapProps> = ({
  children,
  mapType,
  openIdea,
  openProjectRoom,
  initialMapViewport,
  mapFilterActive,
  ideasData,
  projectroomsData,
  ideaData,
  handleClickIdeaMarker,
  handleClickProjectroomMarker,
  projectroomData,
  handleSetMapBounds,
  setInitialMapBounds,
  handleSetInitialMapBoundsAndViewport,
  postIdeaOpen,
  statefulMap,
  setStatefulMap,
  drawnPolygon,
  setDrawnPolygon,
  handleSaveDrawnPolygon,
}) => {
  const { t } = useTranslation();
  const [statefulDrawMapbox, setStatefulDrawMapbox] = useState(null);
  const mapContainerRef = useRef();
  const isMobile = isMobileCustom();

  const [mapMoved, setMapMoved] = useState(false);
  const [container, setContainer] = useState(null);

  const initialFly = useInitialFly();
  const navigationControl = useNavigationControl();
  const geolocateControl = useGeolocateControl();

  const hover = useHover();
  const clickMarkers = useClickMarkers();

  const geocoder = useGeocoder();
  // const [statefulMap, setMap] = useState(null);
  const [setProjectroomsMarkersLayer, setProjectroomsMarkersData] =
    useProjectroomsMarkers();

  const [setIdeasMarkersLayer, setIdeasMarkersData] = useIdeasMarkers();
  const [setPolygonLayer, setPolygonData] = usePolygon();
  const [setPinLayer, setPinData] = usePin();

  const [ideaMarkerColor, setIdeaMarkerColor] = useState(null);

  const { lng, lat, zoom, subscribeMap } = useCoordinates(
    initialMapViewport.longitude,
    initialMapViewport.latitude,
    initialMapViewport.zoom
  );

  const IdeasGeoJson = useMemo(() => {
    return convertIdeasToGeoJson(ideasData);
  }, [ideasData]);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
      center: [lng, lat],
      zoom,
      pitch: initialMapViewport.pitch,
    });


    setStatefulMap(map);
    subscribeMap(map);
    navigationControl(map);

    hover(map);
    clickMarkers(map, handleClickIdeaMarker, handleClickProjectroomMarker);
    // geocoder(map);
    // geolocateControl(map);
    setIdeasMarkersLayer(map);
    setProjectroomsMarkersLayer(map);
    setPolygonLayer(map);
    setPinLayer(map);
    setInitialMapBounds(map.getBounds().toArray());

    if (mapType === "draw") {
      const DrawMapBox = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
          polygon: true,
          trash: true,
        },

        styles: [
          // default themes provided by MB Draw

          {
            id: "gl-draw-polygon-fill-inactive",
            type: "fill",
            filter: [
              "all",
              ["==", "active", "false"],
              ["==", "$type", "Polygon"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "fill-color": "#3bb2d0",
              "fill-outline-color": "#3bb2d0",
              "fill-opacity": 0.4,
            },
          },
          {
            id: "gl-draw-polygon-fill-active",
            type: "fill",
            filter: [
              "all",
              ["==", "active", "true"],
              ["==", "$type", "Polygon"],
            ],
            paint: {
              "fill-color": "green",
              "fill-outline-color": "grey",
              "fill-opacity": 0.4,
            },
          },
          {
            id: "gl-draw-polygon-midpoint",
            type: "circle",
            filter: [
              "all",
              ["==", "$type", "Point"],
              ["==", "meta", "midpoint"],
            ],
            paint: {
              "circle-radius": 5,
              "circle-color": "red",
            },
          },
          {
            id: "gl-draw-polygon-stroke-inactive",
            type: "line",
            filter: [
              "all",
              ["==", "active", "false"],
              ["==", "$type", "Polygon"],
              ["!=", "mode", "static"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#3bb2d0",
              "line-width": 2,
            },
          },
          {
            id: "gl-draw-polygon-stroke-active",
            type: "line",
            filter: [
              "all",
              ["==", "active", "true"],
              ["==", "$type", "Polygon"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "purple",
              "line-dasharray": [0.2, 2],
              "line-width": 3,
            },
          },
          {
            id: "gl-draw-line-inactive",
            type: "line",
            filter: [
              "all",
              ["==", "active", "false"],
              ["==", "$type", "LineString"],
              ["!=", "mode", "static"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#fed957",
              "line-width": 5,
            },
          },
          {
            id: "gl-draw-line-active",
            type: "line",
            filter: [
              "all",
              ["==", "$type", "LineString"],
              ["==", "active", "true"],
            ],
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "pink",
              "line-dasharray": [0.2, 2],
              "line-width": 3,
            },
          },
          {
            id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
            type: "circle",
            filter: [
              "all",
              ["==", "meta", "vertex"],
              ["==", "$type", "Point"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 10,
              "circle-color": "black",
            },
          },
          {
            id: "gl-draw-polygon-and-line-vertex-inactive",
            type: "circle",
            filter: [
              "all",
              ["==", "meta", "vertex"],
              ["==", "$type", "Point"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 5,
              "circle-color": "purple",
            },
          },
          {
            id: "gl-draw-point-point-stroke-inactive",
            type: "circle",
            filter: [
              "all",
              ["==", "active", "false"],
              ["==", "$type", "Point"],
              ["==", "meta", "feature"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 5,
              "circle-opacity": 1,
              "circle-color": "#fff",
            },
          },
          {
            id: "gl-draw-point-inactive",
            type: "circle",
            filter: [
              "all",
              ["==", "active", "false"],
              ["==", "$type", "Point"],
              ["==", "meta", "feature"],
              ["!=", "mode", "static"],
            ],
            paint: {
              "circle-radius": 3,
              "circle-color": "#3bb2d0",
            },
          },
          {
            id: "gl-draw-point-stroke-active",
            type: "circle",
            filter: [
              "all",
              ["==", "$type", "Point"],
              ["==", "active", "true"],
              ["!=", "meta", "midpoint"],
            ],
            paint: {
              "circle-radius": 7,
              "circle-color": "orange",
            },
          },
          {
            id: "gl-draw-point-active",
            type: "circle",
            filter: [
              "all",
              ["==", "$type", "Point"],
              ["!=", "meta", "midpoint"],
              ["==", "active", "true"],
            ],
            paint: {
              "circle-radius": 12,
              "circle-color": "#fbb03b",
            },
          },
          // {
          //   id: "gl-draw-polygon-fill-static",
          //   type: "fill",
          //   filter: [
          //     "all",
          //     ["==", "mode", "static"],
          //     ["==", "$type", "Polygon"],
          //   ],
          //   paint: {
          //     "fill-color": "#404040",
          //     "fill-outline-color": "#404040",
          //     "fill-opacity": 1,
          //   },
          // },
          // {
          //   id: "gl-draw-polygon-stroke-static",
          //   type: "line",
          //   filter: [
          //     "all",
          //     ["==", "mode", "static"],
          //     ["==", "$type", "Polygon"],
          //   ],
          //   layout: {
          //     "line-cap": "round",
          //     "line-join": "round",
          //   },
          //   paint: {
          //     "line-color": "#404040",
          //     "line-width": 2,
          //   },
          // },
          // {
          //   id: "gl-draw-line-static",
          //   type: "line",
          //   filter: [
          //     "all",
          //     ["==", "mode", "static"],
          //     ["==", "$type", "LineString"],
          //   ],
          //   layout: {
          //     "line-cap": "round",
          //     "line-join": "round",
          //   },
          //   paint: {
          //     "line-color": "#404040",
          //     "line-width": 2,
          //   },
          // },
          // {
          //   id: "gl-draw-point-static",
          //   type: "circle",
          //   filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
          //   paint: {
          //     "circle-radius": 5,
          //     "circle-color": "blue",
          //   },
          // },

          // end default themes provided by MB Draw
          // end default themes provided by MB Draw
          // end default themes provided by MB Draw
          // end default themes provided by MB Draw

          // new styles for toggling colors
          // new styles for toggling colors
          // new styles for toggling colors
          // new styles for toggling colors

          // {
          //   id: "gl-draw-polygon-color-picker",
          //   type: "fill",
          //   filter: [
          //     "all",
          //     ["==", "$type", "Polygon"],
          //     ["has", "user_portColor"],
          //   ],
          //   paint: {
          //     "fill-color": ["get", "user_portColor"],
          //     "fill-outline-color": ["get", "user_portColor"],
          //     "fill-opacity": 0.5,
          //   },
          // },
          // {
          //   id: "gl-draw-line-color-picker",
          //   type: "line",
          //   filter: [
          //     "all",
          //     ["==", "$type", "LineString"],
          //     ["has", "user_portColor"],
          //   ],
          //   paint: {
          //     "line-color": ["get", "user_portColor"],
          //     "line-width": 2,
          //   },
          // },
          // {
          //   id: "gl-draw-point-color-picker",
          //   type: "circle",
          //   filter: [
          //     "all",
          //     ["==", "$type", "Point"],
          //     ["has", "user_portColor"],
          //   ],
          //   paint: {
          //     "circle-radius": 3,
          //     "circle-color": ["get", "user_portColor"],
          //   },
          // },
        ],
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: "draw_polygon",
      });
      map.addControl(DrawMapBox);

      setStatefulDrawMapbox(DrawMapBox);
    }

    map.on("dragend", () => {
      setMapMoved(true);
    });

    setTimeout(() => {
      map.on("zoomend", () => {
        setMapMoved(true);
      });
    }, 5000);



    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (statefulMap && mapType === "draw" && drawnPolygon) {
      statefulDrawMapbox.add(drawnPolygon);
      statefulDrawMapbox.changeMode("simple_select");

      const [minLng, minLat, maxLng, maxLat] = bbox(drawnPolygon);

      setTimeout(() => {
        statefulMap.fitBounds([
          [minLng - 0.2, minLat - 0.2], // southwestern corner of the bounds
          [maxLng + 0.2, maxLat + 0.2], // northeastern corner of the bounds
        ]);
      }, 300);
    }
  }, [drawnPolygon, statefulMap]);

  useEffect(() => {
    if (projectroomsData) {
      setProjectroomsMarkersData(projectroomsData);
    } else {
      setProjectroomsMarkersData([]);
    }
  }, [projectroomsData]);

  useEffect(() => {
    if (!mapFilterActive && statefulMap) {
      initialFly(statefulMap);
    }
  }, [mapFilterActive]);

  useEffect(() => {
    if (statefulMap && !openIdea && !openProjectRoom) {
      initialFly(statefulMap);
    }
  }, [statefulMap, openProjectRoom]);

  useEffect(() => {
    if (projectroomData?.geoData) {
      setPolygonData(JSON.parse(projectroomData.geoData));

      const [minLng, minLat, maxLng, maxLat] = bbox(
        JSON.parse(projectroomData.geoData)
      );

      setTimeout(() => {
        statefulMap.fitBounds([
          [minLng, minLat], // southwestern corner of the bounds
          [maxLng, maxLat], // northeastern corner of the bounds
        ]);
      }, 300);
    } else {
      setPolygonData(null);
    }
  }, [projectroomData]);

  useEffect(() => {
    if (IdeasGeoJson) {
      setIdeasMarkersData(IdeasGeoJson);
    } else {
      setIdeasMarkersData([]);
    }
  }, [IdeasGeoJson]);

  useEffect(() => {
    if (ideaData && ideaData.long && ideaData.lat) {
      const mapboxMarker = new mapboxgl.Marker({ element: container })
      mapboxMarker
        .setLngLat([ideaData.long, ideaData.lat])
        .addTo(statefulMap);

      setIdeaMarkerColor(ideaData.color);

      statefulMap.setFilter('ideas', ['!=', 'screamId', ideaData.screamId]);




      // const el = document.createElement('div');
      // el.className = 'marker';
      // el.append(<Loader />)
      // el.innerHTML += `<div class="marker-inner"><Loader/></div>`;

      // new mapboxgl.Marker(el).setLngLat([ideaData.long, ideaData.lat]).addTo(statefulMap);
      // setPinData([{ ideaData }]);
      setTimeout(() => {
        statefulMap.flyTo({
          center: [ideaData.long, ideaData.lat],
          zoom: 16.5,
          duration: 2700,
          pitch: 30,
        });

        // statefulMap.fitBounds([
        //   [ideaData.long - 0.001, ideaData.lat - 0.0015], // southwestern corner of the bounds
        //   [ideaData.long + 0.0003, ideaData.lat + 0.0015], // northeastern corner of the bounds
        // ]);
      }, 300);
    } else {
      // if (marker) {
      //   marker.remove();

      // }
      setPinData(null);
    }
  }, [ideaData]);

  // useEffect(() => {
  //   // FLY TO IDEA
  //   if (statefulMap && ideaData && openScream) {
  //     setTimeout(() => {
  //       statefulMap.fitBounds([
  //         [ideaData.long - 0.001, ideaData.lat - 0.0015], // southwestern corner of the bounds
  //         [ideaData.long + 0.0003, ideaData.lat + 0.0015], // northeastern corner of the bounds
  //       ]);
  //     }, 300);
  //   }
  // }, [statefulMap, ideaData, openScream]);

  // const handleClickGeolocate = () => {
  //   // geolocateControl(statefulMap);

  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const userCoordinates = [
  //       position.coords.longitude,
  //       position.coords.latitude,
  //     ];

  //     statefulMap.addSource("user-coordinates", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         geometry: {
  //           type: "Point",
  //           coordinates: userCoordinates,
  //         },
  //       },
  //     });
  //     statefulMap.addLayer({
  //       id: "user-coordinates",
  //       source: "user-coordinates",
  //       type: "circle",
  //       paint: {
  //         "circle-radius": 7,
  //         "circle-color": "#4f86ec",
  //         "circle-stroke-color": "#fff",
  //         "circle-stroke-width": 2,
  //       },
  //     });
  //     statefulMap.flyTo({
  //       center: userCoordinates,
  //       zoom: 16,
  //     });
  //   });
  // };

  return (
    <React.Fragment>
      {!postIdeaOpen && ideasData && (
        <MapFilter
          statefulMap={statefulMap}
          openMapFilter={mapMoved}
          handleSetMapBounds={(bounds) => {
            setMapMoved(false);
            handleSetMapBounds(bounds);
          }}
        />
      )}
      {postIdeaOpen && (
        <Box
          width={isMobile ? "100%" : "calc(100vw + 460px)"}
          height="100vh"
          justifyContent="center"
          alignItems="center"
          zIndex={1}
          pointerEvents="none"
        >
          <Icon icon={<Pin transform="scale(3)" />} />{" "}
        </Box>
      )}

      {mapType === "draw" && statefulDrawMapbox && (
        <Box
          position="fixed"
          bottom="10px"
          zIndex={999999999}
          left="50%"
          transform="translateX(-50%)"
          gap="8px"
        >
          <Button
            text="Delete"
            onClick={() => {
              statefulDrawMapbox.deleteAll();
              statefulDrawMapbox.changeMode("draw_polygon");
            }}
          />
          <Button
            variant="white"
            text={t("save")}
            // loading={}
            onClick={() => {
              statefulDrawMapbox.changeMode("simple_select");
              handleSaveDrawnPolygon(statefulDrawMapbox.getAll());


            }}
          // disabled={!drawnPolygon}
          />
        </Box>
      )}
      <MapContainer
        ref={mapContainerRef}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {/* <Box position="fixed" top="400px" right="10px" zIndex={999}>
        <Button icon={<Bulb />} onClsick={handleClickGeolocate} />
      </Box> */}

        {children}


      </MapContainer>
      <MarkerPin visible={ideaData} ref={setContainer}><IdeaPin transform="translateY(-12px)" color={ideaMarkerColor} /></MarkerPin>


    </React.Fragment>
  );
};

export default Map;
