export interface Context {
  [key: string]: {
    id: string;
    name: string;
  };
}
export interface Geometry {
  coordinates: number[];
  type: string;
}
export interface Properties {
  [key: string]: string;
}
export interface Feature {
  address: string;
  center: number[];
  context: Context[];
  geometry: Geometry;
  id: string;
  place_name: string;
  place_name_de: string;
  place_type: string[];
  properties: Properties;
  relevance: number;
  text: string;
  text_de: string;
  type: string;
}

export const transformReverseGeocoder = (feature: Feature) => {
  const mapboxTerms = feature?.context.reduce(
    (prev, acc) => ({
      ...prev,
      [acc.id.split(".")[0]]: {
        id: acc.id.split(".")[1],
        name: acc.text,
      },
    }),
    {}
  );
  Object.defineProperty(
    mapboxTerms,
    "municipality",
    Object.getOwnPropertyDescriptor(mapboxTerms, "place") || {}
  );
  delete mapboxTerms.place;
  return mapboxTerms;
};
