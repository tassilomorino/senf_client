import Pin from "../../../../assets/illustrations/pin.png";

const PinImg = new Image(207, 247);
PinImg.src = Pin;
const sourceId = "pin";

const useSinglePoint = () => {
  let source = null;

  const setLayer = (map) => {
    // After the map style has loaded on the page,
    // add a source layer and default styling for a single point
    map.on("load", () => {
      source = map.getSource(sourceId);
      if (source) {
        return;
      }

      map.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer({
        id: "pin",
        type: "symbol",
        source: "pin", // reference the data source
        layout: {
          "icon-image": "pin", // reference the image
          "icon-size": 0.5,
          "icon-anchor": "bottom",
        },
      });

      source = map.getSource(sourceId);
    });
  };

  const setData = (data) => {
    if (source) {
      source.setData({
        type: "FeatureCollection",
        features: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [data.long, data.lat],
          },
          properties: data,
        },
      });
    }
  };

  return [setLayer, setData];
};

export default useSinglePoint;
