import { useEffect, useState } from "react";

const sourceId = "multiple-points";

const useProjectroomsMarkers = () => {
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
            coordinates: [point.centerLong, point.centerLat],
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
          id: "projectrooms",
          source: sourceId,
          type: "symbol",
          layout: {
            "icon-allow-overlap": true,
            "icon-image": [
              "match",
              ["get", "organizationType"],
              "Vereine",
              "VereineMarker",
              "Initiativen",
              "InitiativenMarker",
              "Planungsbüros",
              "PlanungsbürosMarker",
              "Politik",
              "PolitikMarker",
              "Stadtverwaltung",
              "StadtverwaltungMarker",
              "Presse",
              "PresseMarker",
              "VereineMarker",
            ],
            "icon-size": [
              "interpolate",
              ["linear"],
              ["zoom"],
              // when zoom is 0, set each feature's circle radius to the value of its "rating" property
              0,
              0.01,

              10,
              0.2,

              13,
              0.3,
              // when zoom is 10, set each feature's circle radius to four times the value of its "rating" property
              20,
              0.3,
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

export default useProjectroomsMarkers;
