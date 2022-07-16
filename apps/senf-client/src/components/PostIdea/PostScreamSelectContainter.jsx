/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Box, Button } from "senf-atomic-design-system";
import { isMobileCustom } from "../../util/customDeviceDetect";
import CustomSelect from "../atoms/Selects/CustomSelect";
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
    width: 370px;
    margin-left: 80px;
    top: 20px;
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
  handleLocationDecidedNoLocation,
  projectSelected,
  address,
  handleDropdownProject,
}) => {
  const { t } = useTranslation();

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
      <ProjectSelectWrapper>
        <StyledH3> {t("to")} </StyledH3>

        <CustomSelect
          name={"project"}
          value={projectSelected}
          initialValue={t("all_ideas")}
          options={OptionsProjects()}
          handleDropdown={handleDropdownProject}
        />
      </ProjectSelectWrapper>
      {/* <FlexWrapper> */}
      {/* <img src={LocationIcon} width="20px" style={{ paddingRight: "5px" }} /> */}
      {/* <StyledH4 style={{ width: "130px" }}>
          {address ? truncateString(address, 30) : t("Ort festlegen")}
        </StyledH4> */}
      <Box margin="10px 0px 10px 0px" justifyContent="center">
        <Button
          onClick={handleLocationDecided}
          text={t("confirmLocation")}
          disabled={!address}
        />
      </Box>
    </Wrapper>
  );
};

export default PostScreamSelectContainter;
