import { useEffect, useState } from "react";

const sourceId = "polygon";

const usePolygon = () => {
  const [source, setSource] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (source && points) {
      source.setData(points);
    } else if (source && !points) {
      source.setData({
        type: "FeatureCollection",
        features: [],
      });
    }
  }, [source, points]);

  const setLayer = (map) => {
    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on("load", () => {
      let s = map.getSource(sourceId);
      if (!s) {
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });

        map.addLayer({
          id: "polygon",
          source: sourceId,
          type: "fill",
          paint: {
            "fill-color": "#fed957",
            "fill-opacity": 0.3,
          },
        });

        s = map.getSource(sourceId);
      }

      setSource(s);
    });
  };

  return [setLayer, setPoints];
};

export default usePolygon;
