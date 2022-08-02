/* eslint-disable react/display-name */
/** @format */

import React, { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import bbox from "@turf/bbox";
import Button from "../buttons/Button";
import { MapProps } from "./Map.types";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const Wrapper = styled.div<MapProps>`
  z-index: 1;
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  width: 100vw;
  position: fixed;
  top: calc((var(--vh, 1vh) * 100) - 150px);
  display: flex;
  justify-content: center;
  pointer-events: none;

  transform: ${({ openMapFilter }) =>
    openMapFilter ? "scale(1)" : "scale(0.5)"};
  opacity: ${({ openMapFilter }) => (openMapFilter ? "1" : "0")};
  pointer-events: ${({ openMapFilter }) => (openMapFilter ? "all" : "none")};
  transition: 0.2s;
  user-select: none;
  @media (min-width: 768px) {
    justify-content: center;
    position: absolute;
    left: 470px;
    top: 18px;
    width: calc(100vw - 470px);
  }
`;

const MapFilter: FC<MapProps> = ({
  openMapFilter,
  statefulMap,
  handleSetMapBounds,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [waitTime, setWaitTime] = useState(null);

  const handleClick = () => {
    handleSetMapBounds(statefulMap.getBounds().toArray());
    setWaitTime(true);
    setTimeout(() => {
      setWaitTime(null);
    }, 3000);
  };

  return (
    <Wrapper openMapFilter={openMapFilter && !waitTime}>
      <Button
        text={t("Ideen im Bereich anzeigen")}
        onClick={handleClick}
        variant="white"
        size={isMobile ? "small" : "big"}
      />
    </Wrapper>
  );
};

export default MapFilter;
