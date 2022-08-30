/** @format */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Arrow,
  Box,
  Button,
  ContentDropdown,
  ContentDropdownItem,
  TertiaryButton,
} from "senf-atomic-design-system";
import { isMobileCustom } from "../../util/customDeviceDetect";
import { OptionsProjects } from "../../data/OptionsProjects";
import { StyledH3, StyledH4 } from "../../styles/GlobalStyle";

const Wrapper = styled.div`
  height: 130px;
  width: 95%;
  margin-left: 2.5%;
  background-color: #f8f8f8;
  border-radius: 20px;
  box-shadow: 0 8px 30px -12px rgba(0, 0, 0, 0.5);

  @media (min-width: 768px) {
    position: fixed;
    width: 400px;
    margin-left: 80px;
    top: 80px;
    z-index: 5;
    animation: enteranimation 0.5s;
  }
`;
const HideDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  position: absolute;
  z-index: 99999;
  opacity: 0.6;
  border-radius: 19px;
  display: ${(props) => (props.show ? "block" : "none")};
`;
const ProjectSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
  margin-left: 5%;
  margin-right: 5%;
  position: relative;
  top: 0;
  border-bottom: 1px solid #353535;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const PostScreamSelectContainter = ({
  classes,
  locationDecided,
  handleLocationDecided,
  projectSelected,
  address,
  handleDropdownProject,
}) => {
  const { t } = useTranslation();
  const [projectroomDropdownOpen, setProjectroomDropdownOpen] = useState(false);

  return (
    <Wrapper
      style={
        !isMobileCustom && locationDecided
          ? { zIndex: 1 }
          : !isMobileCustom && !locationDecided
            ? { zIndex: 5 }
            : isMobileCustom && locationDecided
              ? {
                position: "fixed",
                bottom: "calc(90vh - 50px)",
                display: "none",
                zIndex: 999,
              }
              : {
                position: "fixed",
                bottom: "20px",
                display: "block",
                zIndex: 999,
              }
      }
    >
      {!isMobileCustom && (
        <HideDiv onClick={handleLocationDecided} show={!!locationDecided} />
      )}

      <Box margin="0px 0px 10px 0px" justifyContent="center">
        <Button
          fillWidth="max"
          onClick={handleLocationDecided}
          text={t("confirmLocation")}
          disabled={!address}
        />
      </Box>

      <ProjectSelectWrapper>
        <StyledH3> {t("to")} </StyledH3>

        <ContentDropdown
          open={projectroomDropdownOpen}
          setOpen={setProjectroomDropdownOpen}
          OpenButton={
            <TertiaryButton
              onClick={() =>
                setProjectroomDropdownOpen(!projectroomDropdownOpen)
              }
              text={
                OptionsProjects().find(
                  (optionsProjects) => projectSelected === optionsProjects.value
                ).label || t("all_ideas")
              }
              iconRight={<Arrow transform="rotate(90deg)" />}
              variant="semibold"
            />
          }
          Content={
            <Box gap="5px" flexDirection="column">
              {Object.values(OptionsProjects()).map(({ value, label }) => (
                <Box gap="5px">
                  <ContentDropdownItem
                    type="check"
                    text={label}
                    checked={projectSelected === value}
                    onClick={() => handleDropdownProject(value)}
                  />
                </Box>
              ))}
            </Box>
          }
        />
      </ProjectSelectWrapper>
      {/* <FlexWrapper> */}
      {/* <img src={LocationIcon} width="20px" style={{ paddingRight: "5px" }} /> */}
      {/* <StyledH4 style={{ width: "130px" }}>
          {address ? truncateString(address, 30) : t("Ort festlegen")}
        </StyledH4> */}
    </Wrapper>
  );
};

export default PostScreamSelectContainter;
