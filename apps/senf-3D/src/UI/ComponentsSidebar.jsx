/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import {
  Box,
  LayerWhiteFirstDefault,
  Typography,
  Divider,
} from "senf-atomic-design-system";
import ModelsList from "./ModelsList";
import FormsList from "./FormsList";
import MarkersList from "./MarkersList";
import ModelsIcon from "../assets/interface-icons/Menu-Icon_1.png";
import FormsIcon from "../assets/interface-icons/Menu-Icon_2.png";
import SurfacesIcon from "../assets/interface-icons/Menu-Icon_3.png";

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;
  width: 440px;
  background-color: #fed957;
  z-index: 9;
  left: 0px;
  transition: 0.5s;
`;
const InnerWrapper = styled.div`
  overflow: scroll;
  height: calc(100vh - 150px);
  margin: 20px 20px;
`;

const Circle = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  ${(props) =>
    props.active ? LayerWhiteFirstDefault : LayerWhiteFirstDefault};
`;
const ComponentsSidebar = ({
  unityContext,
  componentsSidebarOpen,
  setComponentsSidebarOpen,
  startDrawingStreet,
  openInfoModal,
  openDrawContext,
  openSaveModal,
}) => {
  const [order, setOrder] = useState(1);

  const spawnObject = (value) => {
    console.log(value);
    unityContext.send("BuildingManager", "SpawnObject", value);

    setTimeout(() => {
      setComponentsSidebarOpen(false);
    }, 200);
  };

  return (
    <Wrapper
      componentsSidebarOpen={componentsSidebarOpen}
      openInfoModal={openInfoModal}
      openDrawContext={openDrawContext}
      openSaveModal={openSaveModal}
    >
      <Box width="auto" margin="20px" justifyContent="center" gap="20px">
        <Box flexDirection="column" alignItems="center">
          <Circle active={order === 1} onClick={() => setOrder(1)}>
            <img src={ModelsIcon} alt="circle" width="50px" />
          </Circle>
          <Typography variant="bodyBg">Modelle</Typography>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <Circle active={order === 2} onClick={() => setOrder(2)}>
            <img src={FormsIcon} alt="circle" width="50px" />
          </Circle>
          <Typography variant="bodyBg">Formen</Typography>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <Circle active={order === 3} onClick={() => setOrder(3)}>
            <img src={SurfacesIcon} alt="circle" width="50px" />
          </Circle>
          <Typography variant="bodyBg">Flächen</Typography>
        </Box>
      </Box>
      <Divider
        margin="20px 20px 2px 20px"
        width="calc(100% - 40px)"
        color="#f8f8f8"
      />
      <InnerWrapper>
        {order === 1 ? (
          <ModelsList spawnObject={spawnObject} />
        ) : order === 2 ? (
          <FormsList spawnObject={spawnObject} />
        ) : (
          <MarkersList
            setComponentsSidebarOpen={setComponentsSidebarOpen}
            unityContext={unityContext}
            spawnObject={spawnObject}
            startDrawingStreet={startDrawingStreet}
          />
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default ComponentsSidebar;
