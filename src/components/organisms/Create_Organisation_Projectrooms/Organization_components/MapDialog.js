/** @format */

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDOM from "react-dom";
import MapGL, { FullscreenControl, Source, Layer } from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";

import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import styled from "styled-components";
import {
  CustomButton,
  CustomIconButton,
} from "../../../atoms/CustomButtons/CustomButton";
import { useTranslation } from "react-i18next";
import { createProjectSaveData } from "../../../../redux/actions/formDataActions";
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  background-color: grey;
  position: fixed;
  z-index: 9999;
  visibility: ${(props) => (props.mapOpen ? "visible" : "hidden")};
`;

const ButtonsContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 70px;
  width: 120px;
  height: 50px;
  margin-left: calc(50% - 60px);
`;
const MapDialog = ({
  mapOpen,
  setMapOpen,
  viewport,
  mapRef,
  _onViewportChange,
  _,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);

  const drawRef = useRef(null);
  const [toolMode, setMode] = useState(null);
  const [isSetPolygon, setPolygon] = useState(false);

  useEffect(() => {
    if (data) {
      setMode("simple_select");
    } else {
      setMode("draw_polygon");
    }
  }, [data]);

  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );

  // const [data, setData] = useState({
  //   type: "FeatureCollection",
  //   features: [
  //     {
  //       type: "Feature",
  //       properties: {},
  //       geometry: {
  //         coordinates: [
  //           [
  //             [6.917877780906963, 51.00002258185481],
  //             [6.8876765468714325, 50.93041942584361],
  //             [6.998165087951804, 50.947310396591604],
  //             [6.998145888768761, 50.985689147947454],
  //             [6.978078861803311, 50.98927250642429],
  //             [6.958011834837862, 50.99285586490113],
  //             [6.917877780906963, 51.00002258185481],
  //           ],
  //         ],
  //         type: "Polygon",
  //       },
  //     },
  //   ],
  // });

  useEffect(() => {
    if (createProjectFormData && createProjectFormData.geoData) {
      setData(createProjectFormData.geoData);
    }
  }, []);

  const handleSet = () => {
    setMode("simple_select");

    setTimeout(() => {
      setMode("draw_polygon");
      setMode("simple_select");
      setPolygon(true);
    }, 100);
  };

  const handleClose = () => {
    var createProjectData = {
      ...createProjectFormData,
      geoData: data,
    };

    dispatch(createProjectSaveData(createProjectData));
  };
  const handleSave = () => {
    var createProjectData = {
      ...createProjectFormData,
      geoData: data,
    };

    dispatch(createProjectSaveData(createProjectData));
  };

  const handleDelete = (data) => {
    setData(null);
    drawRef.current._draw.deleteAll();
  };

  return ReactDOM.createPortal(
    <MapWrapper mapOpen={mapOpen}>
      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        left="0"
        handleButtonClick={handleClose}
      />

      {viewport && (
        <MapGL
          id="map"
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
          displayControlsDefault={false}
        >
          {/* <FullscreenControl
            position="top-right"
            style={{ backgroundColor: "green" }}
          /> */}

          {/* <Source
            id="maine"
            type="geojson"
            url="mapbox://mapbox.enterprise-boundaries-a0-v2"
          />
          <Layer
            id="maine"
            type="fill"
            source="maine"
            paint={{
              "fill-color": "#fed957",
              "fill-opacity": 0.3,
            }}
          /> */}
          <Draw
            ref={drawRef}
            data={data}
            onChange={(data) => {
              setData(data);
              console.log(data);
            }}
            mode={toolMode}
          />
          <ButtonsContainer>
            {data && (
              <CustomIconButton
                name="Trash"
                iconWidth="80%"
                position="relative"
                backgroundColor="white"
                handleButtonClick={() =>
                  handleDelete(data, createProjectFormData)
                }
              />
            )}

            <CustomIconButton
              name="Check"
              iconWidth="80%"
              position="relative"
              backgroundColor="white"
              handleButtonClick={handleSet}
            />
          </ButtonsContainer>

          <SubmitButton
            text={t("save")}
            backgroundColor="#353535"
            textColor="white"
            position="fixed"
            bottom="10px"
            zIndex="0"
            handleButtonClick={handleSave}
            disabled={!(data && isSetPolygon)}
          />
        </MapGL>
      )}
    </MapWrapper>,
    document.getElementById("portal-root")
  );
};

export default MapDialog;
