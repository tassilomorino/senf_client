import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import { useEffect, useMemo, useState } from "react";

const MarkerPin = styled.div`
  padding: 16px;
  background-color: red;
  color: white;
`;

export default function AddIdeaPin({ long, lat }) {
  const [container, setContainer] = useState(null);

  useEffect(() => {
    if (container && map) {
      const marker = new mapboxgl.Marker({
        color: "#FFFFFF",
        draggable: true,
        element: container,
      })
        .setLngLat([long, lat])
        .addTo(map);
    }
  }, [map, container]);

  return <MarkerPin ref={setContainer}>toto !!!</MarkerPin>;
}
