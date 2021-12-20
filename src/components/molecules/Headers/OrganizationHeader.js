/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Tabs from "../../atoms/Tabs/Tabs";
import { OrganizationTabData } from "../../../data/OrganizationTabData";
import {
  FixedWrapper,
  FlexWrapper,
  TitleWrapper,
  ImgWrapper,
  StyledImg,
} from "./styles/sharedStyles";

const OrganizationHeader = ({
  imgUrl,
  title,
  loading,
  calendar,
  order,
  handleClose,
  handleClick,
  path,
  organization,
}) => {
  const { openScream } = useSelector((state) => state.UI);
  const [amount, setAmount] = useState(18);

  useEffect(() => {
    const amount = document.getElementById("wrapper").offsetWidth / 17;
    setAmount(amount);
  }, []);

  return (
    <React.Fragment>
      <FixedWrapper moveUp={openScream} id="wrapper">
        <FlexWrapper>
          <CustomIconButton
            name="ArrowLeft"
            top="10px"
            shadow={false}
            handleButtonClick={handleClose}
          />

          <TitleWrapper>{title}</TitleWrapper>

          <ImgWrapper>
            <StyledImg src={imgUrl} width="100%" alt="project-thumbnail" />
          </ImgWrapper>
        </FlexWrapper>
        {/* <div style={{ position: "absolute", top: "20px", right: "10px" }}>
          <CustomIconButton
            name="Share"
            margin="0px"
            left="calc(100% - 50px)"
            position="relative"
            handleButtonClick={handleShare}
          />
        </div> */}

        {/* <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        <ShareModal screamId={project} title={title} path={path} />
      </div> */}

        <Tabs
          loading={loading}
          handleClick={handleClick}
          order={order}
          tabLabels={
            calendar
              ? OrganizationTabData.map((item) => item.text)
              : OrganizationTabData.map((item) => item.text).slice(0, 2)
          }
          marginTop={"0px"}
          marginBottom={"0px"}
          lineColor={"#cecece"}
        ></Tabs>
      </FixedWrapper>
    </React.Fragment>
  );
};

export default OrganizationHeader;
