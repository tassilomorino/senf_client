/** @format */

import React from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { openProjectFunc } from "../../../redux/actions/projectActions";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import AddIcon from "../../../images/icons/plus_grey.png";
import { useTranslation } from "react-i18next";

import styled from "styled-components";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";

const Wrapper = styled.div`
  margin-bottom: 50px;

  animation: OrganizationCardAnimation 0.8s;

  @keyframes OrganizationCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;

const Covers = styled.div`
  width: 100%;
  height: 100%;
  z-index: 9;
  float: left;
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  background-color: white;
  margin: 0;
  padding: 0;
`;

const StyledImg = styled.img`
  flex-shrink: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
`;

const Title = styled.div`
  font-size: 18px;
  top: 10px;
  margin-left: 10px;
  text-align: center;
  font-family: Futura PT W01-Bold;
  color: #353535;
  position: relative;
`;

export const OrganizationCard = (props) => {
  const {
    organization: { title, owner, imgUrl, organizationId },
  } = props;
  const dispatch = useDispatch();
  const pushOrganizationId = () => {
    localStorage.setItem("createOrganizationId", organizationId);
    dispatch(stateCreateOrganizationsFunc(true));
  };

  return (
    <Wrapper>
      <Covers>
        <CustomIconButton
          name="Menu"
          iconWidth="70%"
          handleButtonClick={() => pushOrganizationId()}
          position="absolute"
          left="calc(100% - 54px)"
          margin="2px"
        />
        <ExpandButton handleButtonClick={() => console.log("hi")} />
        <StyledImg src={imgUrl} width="100%" alt="profile" />
      </Covers>

      <Title>{title}</Title>
    </Wrapper>

    // <ProjectCardDesign>
    //   {/* <ExpandButton handleButtonClick={() => pushScreamId(project)} /> */}

    //   <RightWrapper>
    //     <Owner> {owner} </Owner>
    //     <Title>{title}</Title>
    //     {/*
    //     {endDate ? (
    //       <Date>
    //         {" "}
    //         {startDate} – {endDate}{" "}
    //       </Date>
    //     ) : (
    //       <Date>{startDate} </Date>
    //     )} */}
    //   </RightWrapper>
    // </ProjectCardDesign>
  );
};
