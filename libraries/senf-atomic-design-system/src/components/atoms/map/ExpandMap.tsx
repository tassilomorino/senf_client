/** @format */
import React, { useState, useEffect, FC, useRef } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { Fullscreen, Plus } from "../../../assets/icons";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import { useModals } from "../../molecules/modalStack/ModalProvider";
import Box from "../box/Box";
import Button from "../buttons/Button";
import Icon from "../icons/Icon";
import Map from "./Map";

const MapWrapper = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 18px;
  top: 0;
  left: 0;
  position: relative;
  z-index: 9;
  /* visibility: ${(props) => (props.mapOpen ? "visible" : "hidden")}; */
  /* -webkit-clip-path: inset(10px round 80px 20px 30px 10px); */
  /* clip-path: inset(10px round 20px 20px 20px 20px); */
  /* clip-path: polygon(500px 500px); */
  /* clip: rect(10px, 290px, 190px, 10px); */
  /* clip-path: ${({ mapExpanded }) =>
    mapExpanded ? "inset(0px round 20px 20px 20px 20px)" : "url(#svgPath1)"}; */
  overflow: hidden;
`;
const OpenButton = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  display: ${({ mapExpanded }) => (mapExpanded ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  background-color: rgba(255, 255, 255, 0.4);
  opacity: 0;

  @media (min-width: 768px) {
    background-color: rgba(255, 255, 255, 0);
    display: ${({ mapExpanded }) => (mapExpanded ? "none" : "flex")};
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    display: ${({ mapExpanded }) => (mapExpanded ? "none" : "flex")};
    opacity: 1;
  }
`;

const ExpandMap: FC = ({
  width = "600px",
  height = "300px",
  initialMapViewport,
  initialMapBounds,
  setInitialMapBounds,
  statefulMap,
  setStatefulMap,
  mapType,
  setDrawnPolygon,
  drawnPolygon,
  handleSaveDrawnPolygon,
  headerComponent,
  selectedMunicipalities,
  setSelectedMunicipalities,
}) => {
  const [mapExpanded, setMapExpanded] = useState(false);
  const isMobile = isMobileCustom();
  const { openModal, closeModal } = useModals();

  // const handleClose = () => {
  //     setMapExpanded(false);
  // };
  // const handleOpen = () => {
  //     setMapExpanded(true);
  //     statefulMap.resize();
  // }

  return (
    <MapWrapper
      id="drawMapWindow"
      width={width}
      height={height}
    >
      <OpenButton
        onClick={() => {
          setMapExpanded(true);
          openModal(
            <MapWrapper
              id="drawMapWindow"
              width={"100vw"}
              height={"1000px"}
            >
              {/* <Box
                    position="absolute"
                    margin={document.body.clientWidth > 768 ? "20px" : "10px"}
                    zIndex={999}
                    top="0"
                >
                    <Button
                        icon={<Plus transform="rotate(45deg)" />}
                        onClick={() => closeModal()}
                    />
                </Box> */}
              {headerComponent}
              <Map
                mapType={mapType}
                initialMapViewport={initialMapViewport}
                statefulMap={statefulMap}
                setStatefulMap={setStatefulMap}
                setInitialMapBounds={setInitialMapBounds}
                drawnPolygon={drawnPolygon}
                setDrawnPolygon={setDrawnPolygon}
                drawMapOpen={true}
                handleSaveDrawnPolygon={handleSaveDrawnPolygon}
                selectedMunicipalities={selectedMunicipalities}
                setSelectedMunicipalities={setSelectedMunicipalities}
              />
            </MapWrapper>,
            {
              size: "full",
              beforeClose: () => setMapExpanded(false),
            }
          );
        }}
      >
        <Icon icon={<Fullscreen transform="scale(2)" />} />
      </OpenButton>

      <Map
        mapType={mapType}
        navigation={false}
        initialMapViewport={initialMapViewport}
        statefulMap={statefulMap}
        setStatefulMap={setStatefulMap}
        setInitialMapBounds={setInitialMapBounds}
        drawnPolygon={drawnPolygon}
        setDrawnPolygon={setDrawnPolygon}
        handleSaveDrawnPolygon={handleSaveDrawnPolygon}
        selectedMunicipalities={selectedMunicipalities}
        setSelectedMunicipalities={setSelectedMunicipalities}
      />
    </MapWrapper>
  );
};

export default ExpandMap;
