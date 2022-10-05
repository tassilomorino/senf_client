import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Button,
  Box,
  RangeSlider,
  Typography,
  LayerWhiteFirstDefault,
  isMobileCustom,
} from "senf-atomic-design-system";
import { setModelsToLocalStorage } from "../util/setData";

const Wrapper = styled.div`
  height: auto;
  padding: 10px;
  border-radius: 18px 18px 0px 0px;
  width: 100vw;
  bottom: 0px;
  position: fixed;
  z-index: 3;

  ${(props) => LayerWhiteFirstDefault};

  @media (min-width: 768px) {
    width: 230px;
    height: auto;
    right: 10px;
    top: 10px;
    border-radius: 18px;
    bottom: initial;
  }
`;

const ContextPanel = ({ openContextPanel, setOpenContextPanel }) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const isMobile = isMobileCustom();

  const handleSetRotation = (value) => {
    setRotation(value);
    window.tb.map.selectedObject.setRotation({ x: 0, y: 0, z: value });
  };
  const handleSetScale = (value) => {
    setScale(value);
    window.tb.map.selectedObject.fixedZoom = 10;
    window.tb.map.selectedObject.setObjectScale(1000 - value * 1);
    window.tb.map.repaint = true;
    console.log(window.tb.map.selectedObject);
  };

  const handleSetModel = () => {
    console.log(window.map.tb.world.children);
    setModelsToLocalStorage(window.map.tb.world.children);
    window.tb.map.selectedObject.selected = false;
    window.tb.map.selectedObject = null;
    setOpenContextPanel(false);
  };
  const handleDeleteModel = () => {
    window.tb.remove(window.tb.map.selectedObject);
    setModelsToLocalStorage(window.map.tb.world.children);
  };
  return (
    openContextPanel && (
      <Wrapper>
        <Box
          zIndex={99}
          justifyContent="center"
          gap="10px"
          flexDirection="column"
          alignItems="center"
        >
          <Box
            width={isMobile ? "90%" : "200px"}
            flexDirection={isMobile ? "row" : "column"}
            gap="10px"
            alignItems={isMobile && "center"}
            marginBlock={isMobile && "8px"}
          >
            <Typography
              variant="h3"
              textAlign="center"
            >
              Rotation
            </Typography>
            <RangeSlider
              rangeValue={rotation}
              setRangeValue={handleSetRotation}
              rangeMin={0}
              rangeMax={360}
              leftTick={isMobile ? null : "0%"}
              rightTick={isMobile ? null : "360%"}
            />
          </Box>

          {/* <Box width="200px" flexDirection="column" gap="10px">
                    <Typography variant="h3" textAlign="center">Scale</Typography>
                    <RangeSlider
                        rangeValue={scale}
                        setRangeValue={handleSetScale}
                        rangeMin={1}
                        rangeMax={1000}
                        leftTick="0"
                        rightTick="100" />
                </Box> */}

          <Box gap="5px">
            <Button
              variant="secondary"
              onClick={handleDeleteModel}
              text="Delete"
            />
            <Button
              variant="primary"
              onClick={handleSetModel}
              text="Set Object"
            />
          </Box>
        </Box>
      </Wrapper>
    )
  );
};

export default ContextPanel;
