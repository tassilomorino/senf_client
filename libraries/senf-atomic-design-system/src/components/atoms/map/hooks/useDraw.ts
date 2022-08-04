// import bbox from "@turf/bbox";
// import { useCallback, useEffect } from "react";
// import mapboxgl from "mapbox-gl";

// const useDraw = () => {
//   //  const escFunction = useCallback((event) => {
//   //   if (
//   //     event.keyCode === 27
//   //     // && !data
//   //   ) {
//   //     // Do whatever when esc is pressed
//   //     console.log("pressed");
//   //   }
//   // }, []);
//   // useEffect(() => {
//   //   document.addEventListener("keydown", escFunction, false);

//   //   return () => {
//   //     document.removeEventListener("keydown", escFunction, false);
//   //   };
//   // }, []);
//   return (map, DrawMapBox, drawnPolygon, setDrawnPolygon) => {
//     if (drawnPolygon) {
//       map.on("load", () => {
//         DrawMapBox.add(drawnPolygon);
//         DrawMapBox.changeMode("simple_select");

//         const [minLng, minLat, maxLng, maxLat] = bbox(drawnPolygon);

//         setTimeout(() => {
//           map.fitBounds([
//             [minLng - 0.1, minLat - 0.1], // southwestern corner of the bounds
//             [maxLng + 0.1, maxLat + 0.1], // northeastern corner of the bounds
//           ]);
//         }, 300);
//       });
//     }

//     // map.on("draw.modechange", () => {
//     //   DrawMapBox.combineFeatures();

//     //   const features = DrawMapBox.getAll();

//     //   setDrawnPolygon(features);

//     //   // const [minLng, minLat, maxLng, maxLat] = bbox(features);

//     //   // setTimeout(() => {
//     //   //   map.fitBounds([
//     //   //     [minLng, minLat], // southwestern corner of the bounds
//     //   //     [maxLng, maxLat], // northeastern corner of the bounds
//     //   //   ]);
//     //   // }, 300);
//     // });

//     map.addControl(DrawMapBox);
//   };
// };

// export default useDraw;
