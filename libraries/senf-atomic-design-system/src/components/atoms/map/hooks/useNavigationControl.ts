import mapboxgl from "mapbox-gl";

const useNavigationControl = () => {
  return (map) => {
    // Add zoom and rotation controls to the map.
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
  };
};

export default useNavigationControl;
