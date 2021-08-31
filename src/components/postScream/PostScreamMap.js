/** @format */

import React from "react";
import { isMobileOnly } from "react-device-detect";
import ReactMapGL, {
  Marker,
  Source,
  Layer,
  GeolocateControl,
} from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

import { useTranslation } from "react-i18next";

//Icons
import Pin from "../../images/pin3.png";
import Geolocate from "../../images/icons/geolocate.png";

const geolocateStyle = {
  position: "fixed",
  zIndex: "9999",
  top: "2.5%",
  right: "2.5%",
  margin: "auto",
  height: "50px",
  width: "50px",
  borderRadius: "15px",
  boxShadow: "0 8px 30px -12px rgba(0,0,0,0.5)",
  backgroundColor: "#fed957",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const geolocateStyle_hide = {
  display: "none",
};

const geolocateIcon = {
  position: "fixed",
  zIndex: "9999",
  top: "2.5%",
  right: "2.5%",
  margin: "auto",
  height: "50px",
  width: "50px",
  borderRadius: "15px",
  boxShadow: "0 8px 30px -12px rgba(0,0,0,0.5)",
  backgroundColor: "#fed957",
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  pointerEvents: "none",
};

const geolocateIcon_hide = {
  display: "none",
};

const PostScreamMap = ({
  MapHeight,
  geocode,
  _onMarkerDragEnd,
  geoData,
  viewport,
  clicked,
  addressBarClicked,
  locationDecided,
  onSelected,
  address,
  loadingProjects,
}) => {
  const { t } = useTranslation();

  const queryParams = {
    bbox: [6.7, 50.8, 7.2, 51],
  };
  const addressLine =
    address === "Ohne Ortsangabe" ? <>{t("input_address")}</> : address;

  // const MyInput = (props) => (
  //   <input {...props} placeholder="" id="geocoder" />
  // );

  const data =
    !loadingProjects && geoData !== ""
      ? {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [JSON.parse(geoData)],
          },
        }
      : {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: [],
          },
        };

  return (
    <ReactMapGL
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle="mapbox://styles/tmorino/ck0seyzlv0lbh1clfwepe0x0x?optimize=true"
      {...viewport}
      maxZoom={18}
      minZoom={11}
      width={isMobileOnly ? "100vw" : "calc(100vw - 600px)"}
      height={isMobileOnly ? MapHeight : "100vh"}
      style={{ position: "fixed", right: 0 }}
      onTouchEnd={() => geocode(viewport)}
      onMouseUp={() => geocode(viewport)}
      onViewportChange={_onMarkerDragEnd}
    >
      <Source id="geodata" type="geojson" data={data} />
      <Layer
        id="geodata"
        type="fill"
        source="geodata"
        paint={{
          "fill-color": "#fed957",
          "fill-opacity": 0.3,
        }}
      />
      <div
        onClick={addressBarClicked}
        style={
          locationDecided === false ? { display: "block" } : { display: "none" }
        }
      >
        <Geocoder
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          onSelected={onSelected}
          viewport={viewport}
          hideOnSelect={true}
          limit={3}
          queryParams={queryParams}
          id="geocoder"
          transitionDuration={1000}
        ></Geocoder>
        <div
          className="pinLocationHeader"
          style={clicked === false ? { zIndex: 9999 } : { zIndex: 0 }}
        >
          {addressLine}
        </div>
      </div>
      {isMobileOnly && (
        <React.Fragment>
          <GeolocateControl
            style={
              locationDecided === false ? geolocateStyle : geolocateStyle_hide
            }
            positionOptions={{ enableHighAccuracy: true }}
            showUserLocation={false}
          ></GeolocateControl>
          <img
            src={Geolocate}
            style={
              locationDecided === false ? geolocateIcon : geolocateIcon_hide
            }
            width="20"
            alt="Geolocate"
          />
        </React.Fragment>
      )}

      <div style={{ pointerEvents: "none" }}>
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          offsetTop={-100}
          offsetLeft={-50}
        >
          <img src={Pin} width="100" alt="ChatIcon" />
        </Marker>
      </div>
    </ReactMapGL>
  );
};

export default PostScreamMap;
