/** @format */

import React from "react";
import ReactMapGL, { Marker, Source, Layer } from "react-map-gl";
import Geocoder from "react-mapbox-gl-geocoder";

//Icons
import Pin from "../../images/pin3.png";

const PostScreamDesktopMap = ({
  geocode,
  _onMarkerDragEndDesktop,
  geoData,
  viewport,
  clicked,
  addressBarClicked,
  locationDecided,
  onSelected,
  address,
  loadingProjects,
}) => {
  const queryParams = {
    bbox: [6.7, 50.8, 7.2, 51],
  };
  const addressLine =
    address === "Ohne Ortsangabe" ? <>Adresse eingeben</> : address;

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
      width="calc(100vw - 600px)"
      height="100vh"
      style={{ position: "fixed", right: 0 }}
      onMouseUp={geocode}
      onViewportChange={_onMarkerDragEndDesktop}
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

      <div style={{ pointerEvents: "none" }}>
        <Marker
          longitude={viewport.longitude}
          latitude={viewport.latitude}
          offsetTop={-150}
          offsetLeft={-75}
        >
          <img src={Pin} width="150" alt="ChatIcon" />
        </Marker>
      </div>
    </ReactMapGL>
  );
};

export default PostScreamDesktopMap;
