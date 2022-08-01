import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoidG1vcmlubyIsImEiOiJjazBzZHZjeWQwMWoyM2NtejlzcnMxd3FtIn0.I_Xcc1aJiN7hToGGjNy7ow";

const useGeocoder = () => {
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    placeholder: "Suchen",
    language: "de",
    mapboxgl,
    // countries: "de",
    // bbox: [-84.996, 19.803, -74.048, 23.352],
    types: "region,postcode,district,place,locality,neighborhood,address,poi",
  });

  // const [setPointLayer, setPointData] = useSinglePoint();

  return (map) => {
    map.addControl(geocoder);

    // setPointLayer(map);

    // // Listen for the `result` event from the Geocoder // `result` event is triggered when a user makes a selection
    // //  Add a marker at the result's coordinates
    // geocoder.on("result", (e) => {
    //   setPointData(e.result.geometry);
    // });
  };
};

export default useGeocoder;
