import mapboxgl from "mapbox-gl";
import { isMobileCustom } from "../../../../hooks/customDeviceDetect";

const useInitialFly = () => {
  const isMobile = isMobileCustom();
  return (map) => {
    setTimeout(() => {
      const longitude =
        typeof Storage !== "undefined" && localStorage.getItem("longitude")
          ? Number(localStorage.getItem("longitude"))
          : 6.95;
      const latitude =
        typeof Storage !== "undefined" && localStorage.getItem("latitude")
          ? Number(localStorage.getItem("latitude"))
          : isMobile
          ? 50.96
          : 50.93;

      map.flyTo({
        center: [longitude, latitude],
        zoom: isMobile ? 9.3 : 10.5,
        duration: 2700,
        pitch: 30,
      });
    }, 500);
  };
};

export default useInitialFly;
