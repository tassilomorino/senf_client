/** @format */

import React from "react";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Tabs from "../../atoms/Tabs/Tabs";
import { AccountTabData } from "../../../data/AccountTabData";
import { useSelector } from "react-redux";

const FixedWrapper = styled.div`
  z-index: 999;
  position: fixed;
  width: 95%;

  height: 80px;
  z-index: 99;
  background-color: white;
  top: 10px;
  left: 2.5%;
  border-radius: 20px 20px;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2);

  @media (min-width: 768px) {
    left: 210px;
    width: 380px;
  }
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

const ProjectHeader = ({ loading, order, handleClose, handleClick }) => {
  const handle = useSelector((state) => state.user.handle);

  function truncateString(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  return (
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
  );
};

export default ProjectHeader;
