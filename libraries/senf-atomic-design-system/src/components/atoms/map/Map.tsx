/** @format */

import React, { FC, useEffect, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "mapbox-gl/dist/mapbox-gl.css";

import VereineMarker from "../../../assets/markers/VereineMarker.png";
import InitiativenMarker from "../../../assets/markers/InitiativenMarker.png";
import PlanungsbürosMarker from "../../../assets/markers/PlanungsbürosMarker.png";
import PolitikMarker from "../../../assets/markers/PolitikMarker.png";
import PresseMarker from "../../../assets/markers/PresseMarker.png";
import StadtverwaltungMarker from "../../../assets/markers/StadtverwaltungMarker.png";

import { MapProps } from "./Map.types";
import {
  convertIdeasToGeoJson,
  convertProjectroomsToGeoJson,
} from "./mapHelpers";
import { LayerWhiteFirstDefault } from "../layerStyles/LayerStyles";

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

  .mapboxgl-popup-content {
    font-family: nunito;
    font-size: 14px;
    padding: 8px;
    pointer-events: auto;

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

const Map: FC<MapProps> = ({
  children,
  initialViewport,
  polygon,
  ideasData,
  projectroomsData,
  handleClickIdeaMarker,
  handleClickProjectroomMarker,
}) => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(initialViewport.lng);
  const [lat, setLat] = useState(initialViewport.lat);
  const [zoom, setZoom] = useState(initialViewport.zoom);

  const polygonGeoJson = useMemo(() => {
    if (polygon) {
      const jsonData = JSON.parse(polygon);
      return jsonData;
    }
  }, [polygon]);

  const IdeasGeoJson = useMemo(() => {
    return convertIdeasToGeoJson(ideasData);
  }, [ideasData]);

  const ProjectroomsGeoJson = useMemo(() => {
    return convertProjectroomsToGeoJson(projectroomsData);
  }, [projectroomsData]);

  // Initialize map when component mounts
  useEffect(() => {
    const map = (window.map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
      center: [lng, lat],
      zoom,
      pitch: 30,
    }));

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl,

        placeholder: "Search for a location",
      })
    );

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    if (polygonGeoJson) {
      map.on("load", () => {
        map.addLayer({
          id: "polygon",
          type: "fill",
          source: {
            type: "geojson",
            data: polygonGeoJson,
          },

          paint: {
            "fill-color": "#fed957",
            "fill-opacity": 0.3,
          },
        });
      });
    }

    if (IdeasGeoJson) {
      map.on("load", () => {
        map.addLayer({
          id: "ideas",
          type: "circle",
          source: {
            type: "geojson",
            data: IdeasGeoJson,
          },
          paint: {
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
              // when zoom is 20, set each feature's circle radius to four times the value of its "rating" property
              20,
              3,
            ],
          },
        });
      });
    }

    if (ProjectroomsGeoJson) {
      const VereineMarkerImg = new Image(207, 247);
      VereineMarkerImg.src = VereineMarker;

      const InitiativenMarkerImg = new Image(207, 247);
      InitiativenMarkerImg.src = InitiativenMarker;

      const PlanungsbürosMarkerImg = new Image(207, 247);
      PlanungsbürosMarkerImg.src = PlanungsbürosMarker;

      const PolitikMarkerImg = new Image(207, 247);
      PolitikMarkerImg.src = PolitikMarker;

      const StadtverwaltungMarkerImg = new Image(207, 247);
      StadtverwaltungMarkerImg.src = StadtverwaltungMarker;

      const PresseMarkerImg = new Image(207, 247);
      PresseMarkerImg.src = PresseMarker;

      map.on("load", () => {
        map.addImage("VereineMarker", VereineMarkerImg);
        map.addImage("InitiativenMarker", InitiativenMarkerImg);
        map.addImage("PlanungsbürosMarker", PlanungsbürosMarkerImg);
        map.addImage("PolitikMarker", PolitikMarkerImg);
        map.addImage("PresseMarker", PresseMarkerImg);
        map.addImage("StadtverwaltungMarker", StadtverwaltungMarkerImg);

        map.addSource("point", {
          type: "geojson",
          data: ProjectroomsGeoJson,
        });

        console.log(ProjectroomsGeoJson);

        // Add a layer to use the image to represent the data.
        map.addLayer({
          id: "projectrooms",
          type: "symbol",
          source: "point", // reference the data source
          layout: {
            "icon-allow-overlap": true,
            "icon-image": [
              "match",
              ["get", "organizationType"],
              "Vereine",
              "VereineMarker",
              "Initiativen",
              "InitiativenMarker",
              "Planungsbüros",
              "PlanungsbürosMarker",
              "Politik",
              "PolitikMarker",
              "Stadtverwaltung",
              "StadtverwaltungMarker",
              "Presse",
              "PresseMarker",
              "VereineMarker",
            ],
            "icon-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              // when zoom is 0, set each feature's circle radius to the value of its "rating" property
              0,
              0.01,

              10,
              0.2,

              13,
              0.3,
              // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
              20,
              0.3,
            ],
          },
        });
      });
    }

    const popupOffsets = {
      bottom: [0, 16],
    };

    const projectroomsPopup = new mapboxgl.Popup({
      offset: popupOffsets,
      closeButton: false,
    });

    const ideasPopup = new mapboxgl.Popup({
      closeButton: false,
    });

    map.on("mousemove", (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["ideas", "projectrooms"],
      });

      if (!features.length) {
        ideasPopup.remove();
        projectroomsPopup.remove();

        return;
      }

      const feature = features[0];

      if (feature.properties.screamId) {
        ideasPopup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.title)
          .addTo(map);
      } else {
        projectroomsPopup
          .setLngLat(feature.geometry.coordinates)
          .setHTML(feature.properties.title)
          .addTo(map);
      }

      map.getCanvas().style.cursor = features.length ? "pointer" : "";
    });

    map.on("click", (event) => {
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["ideas", "projectrooms"],
      });

      const feature = features[0];

      if (feature.properties.screamId) {
        handleClickIdeaMarker(feature.properties.screamId);
      } else {
        handleClickProjectroomMarker(feature.properties.projectRoomId);
      }

      alert(feature.properties.title);
    });

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <MapContainer ref={mapContainerRef}>{children}</MapContainer>;
};

export default Map;
