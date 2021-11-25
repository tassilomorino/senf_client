/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import MapGL from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: grey;
`;

const CreateProjectPage1 = ({ outsideClick }) => {
  const { t } = useTranslation();

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState(null);

  useEffect(() => {
    const viewport = {
      zoom: mapViewport.zoom,
      latitude: mapViewport.latitude,
      longitude: mapViewport.longitude,
      transitionDuration: 1000,
    };
    setViewport(viewport);
  }, []);

  const _onViewportChange = (viewport) => {
    setViewport(viewport);
  };

  const [_, setFeatures] = useState([]);

  console.log(_);

  return (
    <div>
      <Title>Ort festlegen</Title>
      <h3>
        Mit deinem individeullen Projektraum kannst du Anlass- oder Ortsbezogen
        Ideen sammeln.
      </h3>

      <MapWrapper>
        {viewport && (
          <MapGL
            ref={mapRef}
            mapStyle="mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6"
            accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
            minZoom={7}
            latitude={viewport.latitude}
            longitude={viewport.longitude}
            pitch={viewport.pitch}
            bearing={viewport.bearing}
            zoom={viewport.zoom}
            style={{ height: "100%", width: "100%" }}
            onViewportChange={_onViewportChange}
            viewportChangeMethod={"easeTo"}
            viewportChangeOptions={{
              duration: 2700,
            }}
          >
            <Draw
              onDrawCreate={({ features }) => setFeatures({ features })}
              onDrawUpdate={({ features }) => setFeatures({ features })}
              mode="draw_polygon"
            />
          </MapGL>
        )}
        <div>
          {_.features && JSON.stringify(_.features[0].geometry.coordinates)}
        </div>
      </MapWrapper>
    </div>
  );
};

export default CreateProjectPage1;
