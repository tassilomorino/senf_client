/** @format */

import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";

import bbox from "@turf/bbox";
import { useTranslation } from "react-i18next";
import { MapProps } from "./Map.types";
import { convertIdeasToGeoJson } from "./utils/convertIdeasToGeoJson";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";

import useInitialFly from "./hooks/useInitialFly";
import useNavigationControl from "./hooks/useNavigationControl";
import useHover from "./hooks/useHover";

// import useGeocoder from "./hooks/useGeocoder";
import useCoordinates from "./hooks/useCoordinates";
import useProjectroomsMarkers from "./hooks/useProjectroomsMarkers";
import useClickMarkers from "./hooks/useClickMarkers";
import usePolygon from "./hooks/usePolygon";
import useIdeasMarkers from "./hooks/useIdeasMarkers";
// import usePin from "./hooks/usePin";
// import useDraw from "./hooks/useDraw";
import Button from "../buttons/Button";
import Box from "../box/Box";
import MapFilter from "./MapFilter";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import IdeaPin from "../../../assets/icons/IdeaPin";
import theme from "../../../styles/theme";

import DrawMapbox from "./utils/DrawMapbox";
import useIdeaPin from "./hooks/useIdeaPin";
import { addImagesToMap } from "./utils/addImagesToMap";
import {
  hoverAndSelectMunicipalities,
  hoverMunicipalities,
  selectMunicipalities,
} from "./utils/selectMunicipalities";

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
  .mapboxgl-ctrl-geolocate {
    display: none;
  }

  .mapboxgl-ctrl-group {
    display: none;
    @media (min-width: 768px) {
      position: fixed;
      display: block;
      right: 10px;
      bottom: 10px;
      z-index: 1;
      width: 36px;
      border-radius: ${({ theme }) => theme.radii[1]}px;
      ${(props) => LayerWhiteFirstDefault}
    }
  }

  .mapboxgl-ctrl-zoom-in:before {
    content: "";
    position: absolute;
    left: 6px;
    top: 28px;
    height: 2px;
    width: 20px; /* or 100px */
    border-bottom: 2px solid
      ${({ theme }) => theme.colors.greyscale.greyscale20tra};
  }

  .mapboxgl-ctrl-zoom-out:before {
    content: "";
    position: absolute;
    left: 6px;
    top: 55px;
    height: 2px;
    width: 20px; /* or 100px */
    border-bottom: 2px solid
      ${({ theme }) => theme.colors.greyscale.greyscale20tra};
  }

  .mapboxgl-ctrl-zoom-in,
  .mapboxgl-ctrl-zoom-out,
  .mapboxgl-ctrl-compass {
    background-color: transparent;
    border: 0;
    width: 32px;
    border-radius: ${({ theme }) => theme.radii[1]}px;
  }
  .mapboxgl-ctrl-zoom-out {
    border-radius: 0px;
  }

  .mapboxgl-ctrl {
    display: none;

    @media (min-width: 768px) {
      display: block;
    }
  }
  .mapboxgl-ctrl-logo {
    display: none;
  }
`;

const Map: FC<MapProps> = ({
  children,
  mapType,
  navigation = true,
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
  setSwipedUp,
  statefulMap,
  setStatefulMap,
  drawn,
  handleSaveDrawn,
  setMode,
  selectedMunicipalities,
  setSelectedMunicipalities,
}) => {
  const { t } = useTranslation();
  const [statefulDrawMapbox, setStatefulDrawMapbox] = useState(null);
  const mapContainerRef = useRef();
  const isMobile = isMobileCustom();

  const [mapMoved, setMapMoved] = useState(false);
  const [container, setContainer] = useState(null);

  // const [selectedFeature, setSelectedFeature] = useState(null);

  const initialFly = useInitialFly();
  const navigationControl = useNavigationControl();

  const [geolocateTrigger, setGeolocateTrigger] = useState(false);

  const drawType = mapType?.drawType;

  const hover = useHover();
  const clickMarkers = useClickMarkers();

  const [drawFeatureID, setDrawFeatureID] = useState(null);

  // const [statefulMap, setMap] = useState(null);
  const [setProjectroomsMarkersLayer, setProjectroomsMarkersData] =
    useProjectroomsMarkers();

  const [setIdeasMarkersLayer, setIdeasMarkersData] = useIdeasMarkers();
  const [setPolygonLayer, setPolygonData] = usePolygon();

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
      id: Math.random() * 1000,
      // style: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
      style: "mapbox://styles/tmorino/ckz5jc88b000l14o3i4c931rn",
      center: [lng?.current, lat?.current],
      zoom: zoom?.current,
      pitch: initialMapViewport.pitch,
    });
    setStatefulMap(map);
    subscribeMap(map);
    addImagesToMap(map);

    if (navigation) {
      navigationControl(map);
    }

    if (ideasData || projectroomsData || projectroomData) {
      clickMarkers(map, handleClickIdeaMarker, handleClickProjectroomMarker);
      setIdeasMarkersLayer(map);
      setProjectroomsMarkersLayer(map);
      setPolygonLayer(map);

      if (!isMobile) {
        hover(map);
      }
    }

    if (setInitialMapBounds) {
      setInitialMapBounds(map.getBounds().toArray());
    }

    if (!statefulDrawMapbox) {
      const DrawMap = DrawMapbox;
      map.addControl(DrawMap);
      setStatefulDrawMapbox(DrawMap);
    }

    map.on("dragend", () => {
      setMapMoved(true);
    });

    setTimeout(() => {
      map.on("zoomend", () => {
        setMapMoved(true);
      });
    }, 5000);

    return () => {
      map?.remove();
      setStatefulMap(null);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (statefulMap && mapType === "selectMunicipalities") {
      hoverAndSelectMunicipalities(
        statefulMap,
        mapType,
        selectedMunicipalities,
        setSelectedMunicipalities
      );
    }
  }, [statefulMap]);

  useEffect(() => {
    if (statefulMap && statefulDrawMapbox && drawn) {
      statefulDrawMapbox.add(drawn);
    }
  }, [drawn, statefulDrawMapbox, statefulMap]);

  useEffect(() => {
    if (statefulMap && statefulDrawMapbox && drawType) {
      if (drawType === "lawn" || drawType === "area") {
        statefulDrawMapbox?.changeMode("draw_polygon");
      } else if (drawType === "bikeLane" || drawType === "crosswalk") {
        statefulDrawMapbox?.changeMode("draw_line_string");
      }

      statefulMap.on("click", (e) => {
        const drawFeatureAtPoint = statefulDrawMapbox.getFeatureIdsAt(e.point);

        const result = drawFeatureAtPoint.filter((element) => {
          return element !== undefined;
        });
        const drawFeatureID = result.length ? result[0] : "";
        if (drawFeatureID) {
          setDrawFeatureID(drawFeatureID);
          statefulDrawMapbox.setFeatureProperty(
            drawFeatureID,
            "drawType",
            drawType
          );
        }
      });
    }
  }, [statefulMap, statefulDrawMapbox, drawType]);

  useEffect(() => {
    if (statefulMap) {
      if (drawType === "lawn") {
        statefulDrawMapbox?.changeMode("draw_polygon");
      } else if (drawType === "bikeLane" || drawType === "crosswalk") {
        statefulDrawMapbox?.changeMode("draw_line_string");
      }
      statefulMap.on("draw.selectionchange", (e) => {
        const drawFeatureId = e?.features[0]?.id;
        if (drawFeatureId) {
          setDrawFeatureID(drawFeatureId);
        }
      });
    }
  }, [statefulMap, statefulDrawMapbox]);

  useEffect(() => {
    if (projectroomsData) {
      setProjectroomsMarkersData(projectroomsData);
    } else {
      setProjectroomsMarkersData([]);
    }
  }, [projectroomsData]);

  useEffect(() => {
    if (!mapFilterActive && statefulMap) {
      initialFly(statefulMap, initialMapViewport);
    }
  }, [mapFilterActive]);

  useEffect(() => {
    if (statefulMap && !openIdea && !openProjectRoom) {
      initialFly(statefulMap, initialMapViewport);
      setGeolocateTrigger(true);
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
    if (ideaData && ideaData.long && ideaData.lat && statefulMap) {
      useIdeaPin(statefulMap, container, ideaData, setIdeaMarkerColor);
    }
  }, [ideaData]);

  // useEffect(() => {
  //   if (statefulMap) {
  //     statefulMap?.addLayer({
  //       id: "polygonhhkj",
  //       source: "admin-2-boundary",
  //       type: "fill",
  //       paint: {
  //         "fill-color": "#fed957",
  //         "fill-opacity": 0.3,
  //       },
  //     });
  //   }
  // }, [statefulMap])

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
          width={isMobile ? "100vw" : "calc(100vw + 460px)"}
          position="fixed"
          height="100vh"
          top="0"
          justifyContent="center"
          alignItems="center"
          zIndex={99}
          pointerEvents="none">
          <IdeaPin
            color={theme.colors.primary.primary100}
            transform="scale(1.5)"
          />
        </Box>
      )}

      {drawFeatureID && (
        <Box
          position="fixed"
          bottom="10px"
          zIndex={999999999}
          left="50%"
          transform="translateX(-50%)"
          gap="8px">
          <Button
            text="Delete"
            onClick={() => {
              statefulDrawMapbox.delete(drawFeatureID);
              statefulDrawMapbox.changeMode("simple_select");
              handleSaveDrawn(statefulDrawMapbox.getAll());
              setMode(null);
              setSwipedUp(false);
              setDrawFeatureID(null);
            }}
          />
          <Button
            variant="white"
            text={t("save")}
            onClick={() => {
              statefulDrawMapbox.changeMode("simple_select");
              setMode(null);
              handleSaveDrawn(statefulDrawMapbox.getAll());
              setSwipedUp(false);
              setDrawFeatureID(null);
            }}
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
        }}>
        {children}
      </MapContainer>
      <MarkerPin
        visible={ideaData}
        ref={setContainer}>
        <IdeaPin
          transform="translate(0, -12)"
          color={ideaMarkerColor}
        />
      </MarkerPin>
    </React.Fragment>
  );
};

export default Map;
