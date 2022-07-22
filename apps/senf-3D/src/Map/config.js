import { Map } from "mapbox-gl";

export const map = (window.map = new Map({
  accessToken:
    "pk.eyJ1IjoidG1vcmlubyIsImEiOiJjazBzZHZjeWQwMWoyM2NtejlzcnMxd3FtIn0.I_Xcc1aJiN7hToGGjNy7ow",
  container: "map",
  style: "mapbox://styles/tmorino/ckclpzylp0vgp1iqsrp4asxt6",
  center: [50.9413, 6.9583],
  zoom: 9,
  antialias: true,
}));
