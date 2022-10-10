import bbox from "@turf/bbox";

export function showProjectroomPolygon(statefulMap, geoData, setPolygonData) {
  if (geoData) {
    setPolygonData(JSON.parse(geoData));

    const [minLng, minLat, maxLng, maxLat] = bbox(JSON.parse(geoData));

    setTimeout(() => {
      statefulMap.fitBounds([
        [minLng, minLat], // southwestern corner of the bounds
        [maxLng, maxLat], // northeastern corner of the bounds
      ]);
    }, 300);
  } else {
    setPolygonData(null);
  }
}
