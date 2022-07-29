/** @format */

import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";

import { MapProps } from "./Map.types";
import {
  convertIdeasToGeoJson,
  convertProjectroomsToGeoJson,
} from "./utils/mapHelpers";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";
import { addProjectroomMarkers } from "./utils/addProjectroomMarkers";

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

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1vcmlubyIsImEiOiJjazBzZHZjeWQwMWoyM2NtejlzcnMxd3FtIn0.I_Xcc1aJiN7hToGGjNy7ow";

const MapContainer = styled.div<MapProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .mapboxgl-marker-anchor-center {
    display: none;
  }
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
  initialMapViewport,
  polygon,
  ideasData,
  projectroomsData,
  ideaData,
  handleClickIdeaMarker,
  handleClickProjectroomMarker,
}) => {
  const mapContainerRef = useRef();

  const navigationControl = useNavigationControl();
  const geolocateControl = useGeolocateControl();

  const hover = useHover();
  const clickMarkers = useClickMarkers();

  const geocoder = useGeocoder();
  const [setProjectroomsMarkersLayer, setProjectroomsMarkersData] =
    useProjectroomsMarkers();

  const [setIdeasMarkersLayer, setIdeasMarkersData] = useIdeasMarkers();
  const [setPolygonLayer, setPolygonData] = usePolygon();
  const [setPinLayer, setPinData] = usePin();

  const { lng, lat, zoom, subscribeMap } = useCoordinates(
    initialMapViewport.longitude,
    initialMapViewport.latitude,
    initialMapViewport.zoom
  );

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
      center: [lng, lat],
      zoom,
      pitch: 30,
    });

    subscribeMap(map);
    navigationControl(map);
    geolocateControl(map);
    hover(map);
    clickMarkers(map, handleClickIdeaMarker, handleClickProjectroomMarker);
    geocoder(map);

    setIdeasMarkersLayer(map);

    setProjectroomsMarkersLayer(map);
    setPolygonLayer(map);
    setPinLayer(map);

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (projectroomsData) {
      setProjectroomsMarkersData(projectroomsData);
    } else {
      setProjectroomsMarkersData([]);
    }
  }, [projectroomsData]);

  useEffect(() => {
    if (polygon) {
      setPolygonData(JSON.parse(polygon));
    } else {
      setPolygonData(null);
    }
  }, [polygon]);

  useEffect(() => {
    if (ideasData) {
      setIdeasMarkersData(ideasData);
    } else {
      setIdeasMarkersData([]);
    }
  }, [ideasData]);

  useEffect(() => {
    if (ideaData) {
      console.log("map.tsx", ideaData);
      setPinData([{ ideaData }]);
    } else {
      setPinData(null);
    }
  }, [ideaData]);

  return <MapContainer ref={mapContainerRef}>{children}</MapContainer>;
};

export default Map;
