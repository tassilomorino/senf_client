/** @format */

import React, { FC } from "react";
import styled from "styled-components";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Map from "../../atoms/map/Map";
import { PostIdeaMapProps } from "./PostIdeaMap.types";
import Pin from "../../../assets/illustrations/pin.png";

const Wrapper = styled.div<PostIdeaMapProps>``;

const PinWrapper = styled.div`
  position: fixed;
  left: 50%;
  margin-left: -50px;
  margin-top: -100px;
  top: 50%;
  pointer-events: none;
  z-index: 1;
`;

const PostIdeaMap: FC<PostIdeaMapProps> = ({ initialViewport }) => (
  <Wrapper>
    <Map initialViewport={initialViewport}>
      <PinWrapper>
        <img src={Pin} width="100" alt="ChatIcon" />
      </PinWrapper>
    </Map>
  </Wrapper>
);

export default PostIdeaMap;
