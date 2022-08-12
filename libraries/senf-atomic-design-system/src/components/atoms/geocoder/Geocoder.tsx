/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { GeocoderProps } from "./Geocoder.types";
import "mapbox-gl/dist/mapbox-gl.css";
import Input from "../inputs/Input";

const Wrapper = styled.div<GeocoderProps>`
margin-left: 1000px;
  width: 100%;

  .mapboxgl-ctrl-geocoder--input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
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

  .mapboxgl-ctrl-geocoder--icon-loading {
    display: none;
  }
`;

const Geocoder: FC<GeocoderProps> = ({ placeholder, address }) => {
  const [statefulGeocoder, setStatefulGeocoder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const queryParams = {
    bbox: [6.7, 50.8, 7.2, 51],
  };
  const geocoderRef = React.useRef<MapboxGeocoder>(null);
  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZGF0dHdvb2QxOTg2IiwiYSI6ImNraTI5cnAwcDByZHUycnBleWphMHR1dDcifQ.u7pG_sZ7Su685A11r6-uuw";

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      // types: "country,region,place,postcode,locality,neighborhood",
      placeholder: address || "Suche nach Orten",
      queryParams,
      limit: 3,
      hideOnSelect: true,
      language: "de",
      transitionDuration: 1000,
      bbox: [6.7, 50.8, 7.2, 51],
    });
    setStatefulGeocoder(geocoder)
  }, []);

  useEffect(() => {
    if (statefulGeocoder) {
      if (geocoderRef.current) {
        statefulGeocoder.addTo(geocoderRef.current);
      }
      // Get the geocoder results container.
      const results = document.getElementById("result");

      // Add geocoder result to container.
      statefulGeocoder.on("result", (e) => {
        // console.log(e.result.center)
        results.innerText = JSON.stringify(e.result.place_name, null, 2);
        const long = e.result.center[0]
        const lat = e.result.center[1]

      });



      // Clear results container when search is cleared.
      // geocoder.on("clear", () => {
      //   results.innerText = "";
      // });

      return () => {
        geocoderRef.current = null;
      };
    }
  }, [statefulGeocoder])


  useEffect(() => {

    if (address && statefulGeocoder) {
      setSearchTerm(address)

      console.log(statefulGeocoder)

      statefulGeocoder.clear();
      setTimeout(() => {
        statefulGeocoder.placeholder = "hi"

      }, 1000);
    }
  }, [address, statefulGeocoder])



  return (
    <Wrapper>
      <Input type="search" value={searchTerm} setSearchTerm={setSearchTerm} />
      <div value="hii" ref={geocoderRef}></div>
      <pre id="result"></pre>
    </Wrapper>
  );
};

export default Geocoder;
