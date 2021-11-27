/** @format */

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MapGL, { Source, Layer } from "@urbica/react-map-gl";
import Draw from "@urbica/react-map-gl-draw";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import styled from "styled-components";
import {
  CustomButton,
  CustomIconButton,
} from "../../../atoms/CustomButtons/CustomButton";
import { useTranslation } from "react-i18next";
import {
  retrievedData,
  startedCreatingProject,
} from "../functions/CreateProjectFunctions";

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  background-color: grey;
  position: fixed;
  z-index: 9999;
  visibility: ${(props) => (props.mapOpen ? "visible" : "hidden")};
`;
const MapDialog = ({
  mapOpen,
  setMapOpen,
  viewport,
  mapRef,
  _onViewportChange,
  _,
  setFeatures,
}) => {
  const { t } = useTranslation();

  const [data, setData] = useState(null);

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
    if (startedCreatingProject) {
      console.log(retrievedData);
    }
    if (startedCreatingProject && retrievedData.geoData) {
      setData(retrievedData.geoData);
    }
  }, []);

  const handleSave = (e) => {
    // var keyboardEvent = document.createEvent("KeyboardEvent");
    // var initMethod =
    //   typeof keyboardEvent.initKeyboardEvent !== "undefined"
    //     ? "initKeyboardEvent"
    //     : "initKeyEvent";

    // keyboardEvent[initMethod](
    //   "keydown", // event type: keydown, keyup, keypress
    //   true, // bubbles
    //   true, // cancelable
    //   window, // view: should be window
    //   false, // ctrlKey
    //   false, // altKey
    //   false, // shiftKey
    //   false, // metaKey
    //   13, // keyCode: unsigned long - the virtual key code, else 0
    //   0 // charCode: unsigned long - the Unicode character associated with the depressed key, else 0
    // );
    // document.dispatchEvent(keyboardEvent);

    // if (e.key == "Enter") {
    //   alert("enter key pressed");
    // }

    if (data && retrievedData) {
      var createProjectData = {
        projectRoom_name: retrievedData.projectRoom_name,
        projectRoom_description: retrievedData.projectRoom_description,
        geoData: data,
      };

      localStorage.setItem(
        "createProjectData",
        JSON.stringify(createProjectData)
      );
      console.log(JSON.stringify(createProjectData));
    }
  };

  return ReactDOM.createPortal(
    <MapWrapper mapOpen={mapOpen}>
      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        left="0"
        handleButtonClick={() => setMapOpen(false)}
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
        >
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
            data={data}
            onChange={(data) => {
              setData(data);
              console.log(data);
            }}
            // onDrawCreate={({ features }) => {
            //   setFeatures({ features });
            //   console.log(features);
            // }}
            // onDrawUpdate={({ features }) => {
            //   setFeatures({ features });
            //   console.log(features);
            // }}
            // onDrawCreate={({ features, data }) => {
            //   setFeatures({ features });
            //   setData(data);
            //   console.log("CREATE", "data", data, "features", features);
            // }}
            // onDrawUpdate={({ features, data }) => {
            //   setFeatures({ features });
            //   setData(data);
            //   console.log("data", data, "features", features);
            // }}
            mode="draw_polygon"
          />

          <CustomButton
            text={t("save")}
            backgroundColor="#353535"
            textColor="white"
            position="relative"
            bottom="10px"
            zIndex="0"
            handleButtonClick={handleSave}
          />
        </MapGL>
      )}
    </MapWrapper>,
    document.getElementById("portal-root")
  );
};

export default MapDialog;
