import { useEffect, useState } from "react";
import VereineMarker from "../../../../assets/markers/VereineMarker.png";
import InitiativenMarker from "../../../../assets/markers/InitiativenMarker.png";
import PlanungsbürosMarker from "../../../../assets/markers/PlanungsbürosMarker.png";
import PolitikMarker from "../../../../assets/markers/PolitikMarker.png";
import PresseMarker from "../../../../assets/markers/PresseMarker.png";
import StadtverwaltungMarker from "../../../../assets/markers/StadtverwaltungMarker.png";

const sourceId = "multiple-points";

const VereineMarkerImg = new Image(207, 247);
VereineMarkerImg.src = VereineMarker;

const InitiativenMarkerImg = new Image(207, 247);
InitiativenMarkerImg.src = InitiativenMarker;

const PlanungsbürosMarkerImg = new Image(207, 247);
PlanungsbürosMarkerImg.src = PlanungsbürosMarker;

const PolitikMarkerImg = new Image(207, 247);
PolitikMarkerImg.src = PolitikMarker;

const StadtverwaltungMarkerImg = new Image(207, 247);
StadtverwaltungMarkerImg.src = StadtverwaltungMarker;

const PresseMarkerImg = new Image(207, 247);
PresseMarkerImg.src = PresseMarker;

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
      map.addImage("VereineMarker", VereineMarkerImg);
      map.addImage("InitiativenMarker", InitiativenMarkerImg);
      map.addImage("PlanungsbürosMarker", PlanungsbürosMarkerImg);
      map.addImage("PolitikMarker", PolitikMarkerImg);
      map.addImage("PresseMarker", PresseMarkerImg);
      map.addImage("StadtverwaltungMarker", StadtverwaltungMarkerImg);

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
