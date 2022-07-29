import mapboxgl from "mapbox-gl";

const useGeolocateControl = () => {
  return (map) => {
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
