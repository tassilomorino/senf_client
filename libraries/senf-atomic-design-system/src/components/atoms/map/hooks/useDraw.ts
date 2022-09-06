import bbox from "@turf/bbox";
import { useCallback, useEffect } from "react";
import MapboxDraw from "@mapbox/mapbox-gl-draw";

const useDraw = () => {
  return (map, statefulDrawMapbox, setStatefulDrawMapbox, setDrawFeatureID) => {
    let drawFeatureID = "";
    let newDrawFeature = false;

    // if (!statefulDrawMapbox) {
    //   map.addControl(DrawMapBox);
    //   setStatefulDrawMapbox(DrawMapBox);
    // }

    // change colors
    // function changeColor(color) {
    //   if (drawFeatureID !== "" && typeof DrawMapBox === "object") {
    //     // add whatever colors you want here...
    //     if (color === "black") {
    //       DrawMapBox.setFeatureProperty(drawFeatureID, "portColor", "green");
    //     } else if (color === "red") {
    //       DrawMapBox.setFeatureProperty(drawFeatureID, "portColor", "red");
    //     } else if (color === "green") {
    //       DrawMapBox.setFeatureProperty(drawFeatureID, "portColor", "green");
    //     }

    //     const feat = DrawMapBox.get(drawFeatureID);
    //     DrawMapBox.add(feat);
    //   }
    // }
    // changeColor("green");

    // callback for draw.update and draw.selectionchange
    // const setDrawFeature = function (e) {
    //   alert("Hey");

    //   if (e.features.length && e.features[0].type === "Feature") {
    //     const feat = e.features[0];
    //     drawFeatureID = feat.id;
    //   }
    // };

    /* Event Handlers for Draw Tools */

    // map.on("draw.create", (e) => {
    //   newDrawFeature = true;
    //   const drawFeatureID = e.features[0].id;

    //   console.log(e);

    //   // DrawMapBox.setFeatureProperty(drawFeatureID, "portColor", "red");
    //   // DrawMapBox.set(drawFeatureID, "portColor", "red");
    //   // const feat = DrawMapBox.get(drawFeatureID);
    //   // DrawMapBox.add(feat);
    // });
    // map.on("draw.update", (e) => {
    //   console.log(e);
    // });

    map.on("click", (e) => {
      if (!newDrawFeature) {
        const drawFeatureAtPoint = statefulDrawMapbox.getFeatureIdsAt(e.point);

        // if another drawFeature is not found - reset drawFeatureID
        drawFeatureID = drawFeatureAtPoint.length ? drawFeatureAtPoint[0] : "";

        if (drawFeatureID) {
          setDrawFeatureID(drawFeatureID);
        }
      }

      newDrawFeature = false;
    });

    // map.on("draw.create", (e) => {
    //   newDrawFeature = true;
    //   const drawFeatureID = e.features[0].id;

    //   console.log(e);

    //   // DrawMapBox.setFeatureProperty(drawFeatureID, "portColor", "red");
    //   // DrawMapBox.set(drawFeatureID, "portColor", "red");
    //   // const feat = DrawMapBox.get(drawFeatureID);
    //   // DrawMapBox.add(feat);
    // });
  };
};

export default useDraw;
