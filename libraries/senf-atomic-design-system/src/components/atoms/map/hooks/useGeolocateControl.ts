import mapboxgl from "mapbox-gl";

const useGeolocateControl = () => {
  return (map) => {
    //     navigator.geolocation.getCurrentPosition(position => {
    //   const userCoordinates = [position.coords.longitude, position.coords.latitude];
    //   map.addSource("user-coordinates", {
    //     type: "geojson",
    //     data: {
    //       type: "Feature",
    //       geometry: {
    //         type: "Point",
    //         coordinates: userCoordinates
    //       }
    //     }
    //   });
    //   map.addLayer({
    //     id: "user-coordinates",
    //     source: "user-coordinates",
    //     type: "circle"
    //   });
    //   map.flyTo({
    //     center: userCoordinates,
    //     zoom: 14
    //   });
    // });
    // Add zoom and rotation controls to the map.
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );
  };
};

export default useGeolocateControl;
