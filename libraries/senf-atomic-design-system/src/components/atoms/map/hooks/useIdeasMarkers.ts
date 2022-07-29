import { useEffect, useState } from "react";

const sourceId = "ideas";

const useIdeasMarkers = () => {
  const [source, setSource] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (source && points) {
      source.setData({
        type: "FeatureCollection",
        features: points.map((point) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.long, point.lat],
          },
          properties: point,
        })),
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
          id: "ideas",
          source: sourceId,
          type: "circle",

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

        s = map.getSource(sourceId);
      }

      setSource(s);
    });
  };

  return [setLayer, setPoints];
};

export default useIdeasMarkers;
