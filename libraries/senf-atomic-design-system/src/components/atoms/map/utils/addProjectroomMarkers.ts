export function addProjectroomMarkers(projectroomsData) {
  const geojsonProjectRooms = { type: "FeatureCollection", features: [] };
  if (projectroomsData) {
    for (const point of projectroomsData) {
      const properties = point;

      const feature = {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [point.centerLong, point.centerLat],
        },
        properties,
      };
      geojsonProjectRooms.features.push(feature);
    }
  }
}
