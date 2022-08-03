/** @format */

import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";

import bbox from "@turf/bbox";
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
import { Bulb } from "../../../assets/icons";
import Button from "../buttons/Button";
import Box from "../box/Box";
import MapFilter from "./MapFilter";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Icon from "../icons/Icon";
import Pin from "../../../assets/icons/Pin";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1vcmlubyIsImEiOiJjazBzZHZjeWQwMWoyM2NtejlzcnMxd3FtIn0.I_Xcc1aJiN7hToGGjNy7ow";

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
}) => {
  const mapContainerRef = useRef();
  const isMobile = isMobileCustom();

  const [mapMoved, setMapMoved] = useState(false);

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

    map.on("dragend", () => {
      setMapMoved(true);
    });
    map.on("zoomend", () => {
      setMapMoved(true);
    });

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
    if (ideaData) {
      setPinData([{ ideaData }]);
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
    </React.Fragment>
  );
};

export default Map;
