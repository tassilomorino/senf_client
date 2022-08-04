import { useEffect, useState } from "react";
import Pin from "../../../../assets/illustrations/pin.png";

const PinImg = new Image(207, 247);
PinImg.src = Pin;
const sourceId = "pin";

const usePin = () => {
  const [source, setSource] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (source && points) {
      console.log(points[0]?.ideaData?.lat);

      source.setData({
        type: "FeatureCollection",
        features: points.map((point) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.ideaData.long, point.ideaData.lat],
          },
          properties: point,
        })),
      });
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
      map.addImage("Pin", PinImg);

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
          id: "pin",
          source: sourceId,
          type: "symbol",
          layout: {
            "icon-image": "Pin", // reference the image
            "icon-size": 0.5,
            "icon-anchor": "bottom",
          },
          // type: "circle",

          // paint: {
          //   "circle-radius": 13,
          //   "circle-color": "#fed957",
          //   "circle-stroke-color": "#fff",
          //   "circle-stroke-width": 2,
          // },
        });

        s = map.getSource(sourceId);
      }

      setSource(s);
    });
  };

  return [setLayer, setPoints];
};

export default usePin;

// useEffect(() => {
//   const PinImg = new Image(207, 247);
//   PinImg.src = Pin;

//   if (ideaData?.screamId) {
//     map.on("load", () => {
//       map.addImage("pin", PinImg);

//       map.addSource("pin", {
//         type: "geojson",
//         data: {
//           type: "FeatureCollection",
//           features: [
//             {
//               type: "Feature",
//               geometry: {
//                 type: "Point",
//                 coordinates: [ideaData.latitude, ideaData.longitude],
//               },
//             },
//           ],
//         },
//       });
//       map.addLayer({
//         id: "points",
//         type: "symbol",
//         source: "pin", // reference the data source
//         layout: {
//           "icon-image": "pin", // reference the image
//           "icon-size": 0.5,
//           "icon-anchor": "bottom",
//         },
//       });
//     });
//   }
// }, [ideaData]);
