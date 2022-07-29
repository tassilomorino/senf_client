export function convertIdeasToGeoJson(ideasData) {
  const jsonData = { type: "FeatureCollection", features: [] };

  if (ideasData) {
    for (const point of ideasData) {
      const properties = point;
      properties.circleRadius = 5 + point.likeCount / 7;

      const unique =
        ideasData.filter((item) => item.long === point.long).length === 1;

      if (unique) {
        const feature = {
          type: "Feature",
          geometry: { type: "Point", coordinates: [point.long, point.lat] },
          properties,
        };
        jsonData.features.push(feature);
      } else {
        function generateHash(string) {
          let hash = 0;
          if (string.length == 0) return hash;
          for (let i = 0; i < string.length; i++) {
            const charCode = string.charCodeAt(i);
            hash = (hash << 7) - hash + charCode;
            hash &= hash;
          }
          return hash;
        }

        function reversedNum(num) {
          return (
            parseFloat(num.toString().split("").reverse().join("")) *
            Math.sign(num)
          );
        }
        const hash = generateHash(point.screamId);
        point.long += hash / 100000000000000;
        point.lat += reversedNum(hash) / 100000000000000;

        const feature = {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [point.long, point.lat],
          },
          properties,
        };
        jsonData.features.push(feature);
      }
    }
  }
  return jsonData;
}

export function convertProjectroomsToGeoJson(projectroomsData) {
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
  return geojsonProjectRooms;
}
