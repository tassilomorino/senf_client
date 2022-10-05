import { useEffect, useState } from "react";

const sourceId = "ideas";

const useIdeasMarkers = () => {
  const [source, setSource] = useState(null);
  const [points, setPoints] = useState(null);

  useEffect(() => {
    if (source && points) {
      source.setData(
        points
        //   {
        //   type: "FeatureCollection",
        //   features: points.map((point) => ({
        //     type: "Feature",
        //     geometry: {
        //       type: "Point",
        //       coordinates: [point.long, point.lat],
        //     },
        //     properties: point,
        //   })),
        // }
      );
    }
  }, [source, points]);

  const setLayer = (map) => {
    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on("load", () => {
      // map.addLayer({
      //   id: "admin-2-boundary",
      //   source: "composite",
      //   "source-layer": "admin",
      //   type: "line",
      //   paint: {
      //     visibility: "visible",
      //     "line-color": "pink",
      //   },
      // });
      // const x = map.getLayer("admin-2-boundary");
      // x.paint["line-color"] = "red";
      // map.setPaintProperty("admin-2-boundary", "line-color", "green");
      // map.setPaintProperty("admin-2-boundary", "visibility", "visibles");

      // map.setPaintProperty("gemeindegrenzen-2020-cf3scd", "fill-color", [
      //   "match",
      //   ["get", "GEN"],
      //   "Köln",
      //   "rgba(0, 0, 0, 0)",
      //   "rgba(0, 0, 0,0.5)",
      // ]);

      // "fill-color": "#3bb2d0",
      //       "fill-outline-color": "#3bb2d0",
      //       "fill-opacity": 0.4,
      const { layers } = map.getStyle();

      // map.addSource("mapbox-terrain", {
      //   type: "vector",
      //   // Use any Mapbox-hosted tileset using its tileset id.
      //   // Learn more about where to find a tileset id:
      //   // https://docs.mapbox.com/help/glossary/tileset-id/
      //   url: "mapbox://tmorino.1guvy3s9",
      // });
      // map.addLayer({
      //   id: "gemeindegrenzen-2020-cf3scd",
      //   type: "line",
      //   source: "gemeindegrenzen-2020-cf3scd",
      //   "source-layer": "contour",
      //   layout: {
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "#ff69b4",
      //     "line-width": 1,
      //   },
      // });

      // map.addSource("contours", {
      //   type: "vector",
      //   url: "mapbox://mapbox.mapbox-terrain-v2",
      // });
      // map.addLayer({
      //   id: "contours",
      //   type: "line",
      //   source: "contours",
      //   "source-layer": "contour",
      //   layout: {
      //     // Make the layer visible by default.
      //     visibility: "visible",
      //     "line-join": "round",
      //     "line-cap": "round",
      //   },
      //   paint: {
      //     "line-color": "#877b59",
      //     "line-width": 1,
      //   },
      // });
      // map.addLayer({
      //   id: "rivers",
      //   source: "mapbox://mapbox.mapbox-streets-v8",
      //   sourceLayer: "waterway",
      //   type: "line",
      //   paint: {
      //     "line-color": "pink",
      //   },
      // });

      // map.getSource("admin-2-boundary").setData({});
      // const x = map.querySourceFeatures("composite", {
      //   sourceLayer: "admin-2-boundary",
      // });
      // console.log(x);
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
