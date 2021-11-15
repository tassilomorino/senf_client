/** @format */

import React, { PureComponent } from "react";
import styled from "styled-components";
import { Marker } from "@urbica/react-map-gl";
import ExpandButton from "../CustomButtons/ExpandButton";

const OpenIdeaButton = styled.div`
  position: absolute;
  width: ${(props) => 7 + props.likeCount / 4 + "px"};
  height: ${(props) => 7 + props.likeCount / 4 + "px"};
  min-width: unset;

  margin-left: ${(props) => -(7 + props.likeCount / 4) + "px"};
  margin-top: ${(props) => -(7 + props.likeCount / 4) + "px"};
  border-radius: 100%;
  border: 1px white solid;
  background-color: ${(props) => props.color};
  opacity: 1;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 9px 38px, rgba(0, 0, 0, 0.15) 0px 5px 5px;

  transform: scale(${(props) => props.zoomBreak});
  transition: 0.5s;
  z-index: 2;
  overflow: hidden;

  @media (min-width: 768px) {
    &:hover {
      filter: brightness(50%);
    }
  }
`;

export class Markers extends PureComponent {
  render() {
    console.log("Markers rerendering");

    const {
      dataFinalMap,
      fetchDataScream,
      setHoverScreamId,
      setHoverLat,
      setHoverLong,
      setHoverTitle,
      setHoverLikeCount,
      zoomBreak,
    } = this.props;
    return dataFinalMap.map(
      ({ screamId, long, lat, likeCount, color, title }) => (
        <Marker key={screamId} longitude={long} latitude={lat}>
          <OpenIdeaButton
            likeCount={likeCount}
            color={color}
            zoomBreak={zoomBreak}
            onMouseEnter={() => {
              setHoverScreamId(screamId);
              setHoverLat(lat);
              setHoverLong(long);
              setHoverTitle(title);
              setHoverLikeCount(likeCount);
            }}
            onMouseLeave={() =>
              setTimeout(() => {
                setHoverScreamId("");
                setHoverLat("");
                setHoverLong("");
                setHoverTitle("");
                setHoverLikeCount("");
              }, 10000)
            }
          >
            <ExpandButton handleButtonClick={() => fetchDataScream(screamId)} />
          </OpenIdeaButton>
        </Marker>
      )
    );
  }
}

export class MarkersMobile extends PureComponent {
  render() {
    console.log("Markers Moble rerendering");

    const { dataFinalMap, fetchDataScream, zoomBreak } = this.props;
    return dataFinalMap.map(({ screamId, long, lat, likeCount, color }) => (
      <Marker key={screamId} longitude={long} latitude={lat}>
        <OpenIdeaButton
          likeCount={likeCount}
          zoomBreak={zoomBreak}
          color={color}
        >
          <ExpandButton handleButtonClick={() => fetchDataScream(screamId)} />
        </OpenIdeaButton>
      </Marker>
    ));
  }
}
