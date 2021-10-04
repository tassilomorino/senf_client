/** @format */

import React from "react";
import { isMobileCustom } from "../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../module/CustomButtons/CustomButton";
import ScreamShare from "../modals/ScreamShare";
import Tabs from "../module/Tabs/Tabs";
import { AccountTabData } from "../../data/AccountTabData";

const FixedWrapper = styled.div`
  position: fixed;
  width: 95%;

  height: 80px;
  z-index: 99;
  background-color: white;
  top: 10px;
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);
`;

const FlexWrapper = styled.div`
  position: relative;
  width: 97.5%;
  height: 50px;
  z-index: 99;
  top: 0px;
  left: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  font-size: 18px;
  font-family: PlayfairDisplay-Bold;
  color: #353535;
  text-align: center;
  width: 60%;
  margin-left: 20%;
  margin-top: 15px;
  margin-bottom: 20px;
`;

const ProjectHeader = ({
  handle,
  loading,
  order,
  handleClose,
  handleClick,
}) => {
  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return isMobileCustom ? (
    <FixedWrapper>
      <FlexWrapper>
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          top="13px"
          shadow={false}
          handleButtonClick={handleClose}
        />

        <TitleWrapper data-cy="hey-user">
          {truncateString("Hey " + handle, 18)}
        </TitleWrapper>
        <div />
      </FlexWrapper>

      <Tabs
        loading={loading}
        handleClick={handleClick}
        order={order}
        tabLabels={AccountTabData.map((item) => item.text)}
        marginTop={"0px"}
        marginBottom={"0px"}
        lineColor={"#cecece"}
      ></Tabs>
    </FixedWrapper>
  ) : (
    <React.Fragment>
      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        marginLeft="10px"
        top="20px"
        handleButtonClick={handleClose}
      />

      <TitleWrapper>{handle}</TitleWrapper>

      <Tabs
        loading={loading}
        handleClick={handleClick}
        order={order}
        tabLabels={AccountTabData.map((item) => item.text)}
        marginTop={"0px"}
        marginBottom={"0px"}
        lineColor={"white"}
      ></Tabs>
    </React.Fragment>
  );
};

export default ProjectHeader;
