import { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

export function geolocateControl(statefulMap) {
  const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    showUserLocation: true,
    showUserHeading: true,
  });

  statefulMap.addControl(geolocateControl);
  console.log("added");
  // get user location and assign it to userLocation variable
  geolocateControl.on("geolocate", (e) => {
    const lng = e.coords.longitude;
    const lat = e.coords.latitude;
    const userPosition = [lng, lat];

    if (userPosition) {
      console.log(userPosition);
      // run your add layer function
      // setUserLocation(userPosition);
      // createCircleLayer(userPosition, map, setRadius);
    }
  });

  setTimeout(() => {
    geolocateControl.trigger();
  }, 10);

  // only want to work with the map after it has fully loaded
  // if you try to add sources and layers before the map has loaded
  // things will not work properly

  // cleanup function to remove map on unmount
  return () => statefulMap.remove();

  // if (userLocation) {
  //   map.flyTo({
  //     center: userLocation,
  //     zoom: 14,
  //   });
  // }

  // return (map) => {
  //   //     navigator.geolocation.getCurrentPosition(position => {
  //   //   const userCoordinates = [position.coords.longitude, position.coords.latitude];
  //   //   map.addSource("user-coordinates", {
  //   //     type: "geojson",
  //   //     data: {
  //   //       type: "Feature",
  //   //       geometry: {
  //   //         type: "Point",
  //   //         coordinates: userCoordinates
  //   //       }
  //   //     }
  //   //   });
  //   //   map.addLayer({
  //   //     id: "user-coordinates",
  //   //     source: "user-coordinates",
  //   //     type: "circle"
  //   //   });
  //   //   map.flyTo({
  //   //     center: userCoordinates,
  //   //     zoom: 14
  //   //   });
  //   // });
  //   // Add zoom and rotation controls to the map.
  //   map.addControl(
  //     new mapboxgl.GeolocateControl({
  //       positionOptions: {
  //         enableHighAccuracy: true,
  //       },
  //       // When active the map will receive updates to the device's location as it changes.
  //       trackUserLocation: true,
  //       // Draw an arrow next to the location dot to indicate which direction the device is heading.
  //       showUserHeading: true,
  //     })
  //   );
  // };
}
