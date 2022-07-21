import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { Threebox } from "threebox-plugin";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1vcmlubyIsImEiOiJjazBzZHZjeWQwMWoyM2NtejlzcnMxd3FtIn0.I_Xcc1aJiN7hToGGjNy7ow";

const Map = () => {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(148.9819);
  const [lat, setLat] = useState(-35.3981);
  const [zoom, setZoom] = useState(18);

  // Initialize map when component mounts
  useEffect(() => {
    const map = (window.map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
      center: [lng, lat],
      zoom: zoom,
      pitch: 60,
      bearing: -13,
      scale: 1
    }));
    window.tb = new Threebox(map, map.getCanvas().getContext("webgl"), {
      defaultLights: true,
      enableSelectingObjects: true,
      enableDraggingObjects: true,
      enableRotatingObjects: true,
      enableTooltips: true,
      enableHelpTooltips: true,
    });
    window.tb.altitudeStep = 1;
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};

export default Map;
