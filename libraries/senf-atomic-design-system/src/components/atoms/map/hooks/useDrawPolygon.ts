import bbox from "@turf/bbox";
import { useCallback, useEffect } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const useDrawPolygon = () => {
  return (map, statefulDrawMapbox, setStatefulDrawMapbox) => {
    const DrawMapBox = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      styles: [
        // default themes provided by MB Draw

        {
          id: "gl-draw-polygon-fill-inactive",
          type: "fill",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "fill-color": "#3bb2d0",
            "fill-outline-color": "#3bb2d0",
            "fill-opacity": 0.4,
          },
        },
        {
          id: "gl-draw-polygon-fill-active",
          type: "fill",
          filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          paint: {
            "fill-color": "green",
            "fill-outline-color": "grey",
            "fill-opacity": 0.4,
          },
        },
        {
          id: "gl-draw-polygon-midpoint",
          type: "circle",
          filter: ["all", ["==", "$type", "Point"], ["==", "meta", "midpoint"]],
          paint: {
            "circle-radius": 5,
            "circle-color": "red",
          },
        },
        {
          id: "gl-draw-polygon-stroke-inactive",
          type: "line",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Polygon"],
            ["!=", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#3bb2d0",
            "line-width": 2,
          },
        },
        {
          id: "gl-draw-polygon-stroke-active",
          type: "line",
          filter: ["all", ["==", "active", "true"], ["==", "$type", "Polygon"]],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "purple",
            "line-dasharray": [0.2, 2],
            "line-width": 3,
          },
        },
        {
          id: "gl-draw-line-inactive",
          type: "line",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "LineString"],
            ["!=", "mode", "static"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "#fed957",
            "line-width": 5,
          },
        },
        {
          id: "gl-draw-line-active",
          type: "line",
          filter: [
            "all",
            ["==", "$type", "LineString"],
            ["==", "active", "true"],
          ],
          layout: {
            "line-cap": "round",
            "line-join": "round",
          },
          paint: {
            "line-color": "pink",
            "line-dasharray": [0.2, 2],
            "line-width": 3,
          },
        },
        {
          id: "gl-draw-polygon-and-line-vertex-stroke-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 10,
            "circle-color": "black",
          },
        },
        {
          id: "gl-draw-polygon-and-line-vertex-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-color": "purple",
          },
        },
        {
          id: "gl-draw-point-point-stroke-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 5,
            "circle-opacity": 1,
            "circle-color": "#fff",
          },
        },
        {
          id: "gl-draw-point-inactive",
          type: "circle",
          filter: [
            "all",
            ["==", "active", "false"],
            ["==", "$type", "Point"],
            ["==", "meta", "feature"],
            ["!=", "mode", "static"],
          ],
          paint: {
            "circle-radius": 3,
            "circle-color": "#3bb2d0",
          },
        },
        {
          id: "gl-draw-point-stroke-active",
          type: "circle",
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["==", "active", "true"],
            ["!=", "meta", "midpoint"],
          ],
          paint: {
            "circle-radius": 7,
            "circle-color": "orange",
          },
        },
        {
          id: "gl-draw-point-active",
          type: "circle",
          filter: [
            "all",
            ["==", "$type", "Point"],
            ["!=", "meta", "midpoint"],
            ["==", "active", "true"],
          ],
          paint: {
            "circle-radius": 12,
            "circle-color": "#fbb03b",
          },
        },
        // {
        //   id: "gl-draw-polygon-fill-static",
        //   type: "fill",
        //   filter: [
        //     "all",
        //     ["==", "mode", "static"],
        //     ["==", "$type", "Polygon"],
        //   ],
        //   paint: {
        //     "fill-color": "#404040",
        //     "fill-outline-color": "#404040",
        //     "fill-opacity": 1,
        //   },
        // },
        // {
        //   id: "gl-draw-polygon-stroke-static",
        //   type: "line",
        //   filter: [
        //     "all",
        //     ["==", "mode", "static"],
        //     ["==", "$type", "Polygon"],
        //   ],
        //   layout: {
        //     "line-cap": "round",
        //     "line-join": "round",
        //   },
        //   paint: {
        //     "line-color": "#404040",
        //     "line-width": 2,
        //   },
        // },
        // {
        //   id: "gl-draw-line-static",
        //   type: "line",
        //   filter: [
        //     "all",
        //     ["==", "mode", "static"],
        //     ["==", "$type", "LineString"],
        //   ],
        //   layout: {
        //     "line-cap": "round",
        //     "line-join": "round",
        //   },
        //   paint: {
        //     "line-color": "#404040",
        //     "line-width": 2,
        //   },
        // },
        // {
        //   id: "gl-draw-point-static",
        //   type: "circle",
        //   filter: ["all", ["==", "mode", "static"], ["==", "$type", "Point"]],
        //   paint: {
        //     "circle-radius": 5,
        //     "circle-color": "blue",
        //   },
        // },

        // end default themes provided by MB Draw
        // end default themes provided by MB Draw
        // end default themes provided by MB Draw
        // end default themes provided by MB Draw

        // new styles for toggling colors
        // new styles for toggling colors
        // new styles for toggling colors
        // new styles for toggling colors

        // {
        //   id: "gl-draw-polygon-color-picker",
        //   type: "fill",
        //   filter: [
        //     "all",
        //     ["==", "$type", "Polygon"],
        //     ["has", "user_portColor"],
        //   ],
        //   paint: {
        //     "fill-color": ["get", "user_portColor"],
        //     "fill-outline-color": ["get", "user_portColor"],
        //     "fill-opacity": 0.5,
        //   },
        // },
        // {
        //   id: "gl-draw-line-color-picker",
        //   type: "line",
        //   filter: [
        //     "all",
        //     ["==", "$type", "LineString"],
        //     ["has", "user_portColor"],
        //   ],
        //   paint: {
        //     "line-color": ["get", "user_portColor"],
        //     "line-width": 2,
        //   },
        // },
        // {
        //   id: "gl-draw-point-color-picker",
        //   type: "circle",
        //   filter: [
        //     "all",
        //     ["==", "$type", "Point"],
        //     ["has", "user_portColor"],
        //   ],
        //   paint: {
        //     "circle-radius": 3,
        //     "circle-color": ["get", "user_portColor"],
        //   },
        // },
      ],
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: "draw_polygon",
    });
    if (!statefulDrawMapbox) {
      map.addControl(DrawMapBox);
      setStatefulDrawMapbox(DrawMapBox);
    }
  };
};

export default useDrawPolygon;
