import { useState } from "react";

const useCoordinates = (centerLongitude, centerLatitude, initialZoom) => {
  const [lng, setLng] = useState(centerLongitude);
  const [lat, setLat] = useState(centerLatitude);
  const [zoom, setZoom] = useState(initialZoom);

  const subscribeMap = (map) => {
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });
  };

  return { lng, lat, zoom, subscribeMap };
};

export default useCoordinates;
