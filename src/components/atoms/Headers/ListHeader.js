/** @format */

import React from "react";
import lightbulbImg from "../../../images/lamp.png";
import SortingSelect from "../Selects/SortingSelect";
import styled, { keyframes } from "styled-components";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { useTranslation } from "react-i18next";

const enterAnimation = keyframes`
       0% {
  opacity: 0;
  transform: translateY(10%) ;
}
20% {
  opacity: 0;
  transform: translateY(10%);
}

100% {
  opacity: 1;
  transform: translateY(0%) ; 
}
    `;

const Wrapper = styled.div`
  font-family: PlayfairDisplay-Regular;
  font-size: 24px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 10px 2.5% 20px 2.5%;
  margin-top: ${(props) => props.marginTop && props.marginTop};
  animation: ${enterAnimation} 0.7s;
`;
const Bar = styled.div`
  position: absolute;
  width: 80px;
  height: 4px;
  border-radius: 10px;
  margin-left: calc(47.5% - 40px);
  background-color: white;
  top: 10px;
`;
const IdeaHeader = styled.div`
  z-index: 2;
  margin-top: -20px;
  font-size: 24pt;

  @media screen and (max-width: 330px) {
    margin-top: -20px;
    font-size: 21pt;
    margin-left: -5px;
  }
`;
const Lightbulb = styled.img`
  width: 50px;
  transform: translateY(10px) rotate(30deg);
`;

const ListHeader = ({ loading, dataFinal, handleDropdown, marginTop }) => {
  const { t } = useTranslation();
  return (
    !loading && (
      <Wrapper marginTop={marginTop}>
        {isMobileCustom && <Bar />}
        <IdeaHeader>
          <Lightbulb src={lightbulbImg} alt={"lightbulb"} />
          {dataFinal?.length} {dataFinal?.length === 1 ? t("idea") : t("ideas")}
        </IdeaHeader>
        <SortingSelect handleDropdown={handleDropdown} />{" "}
      </Wrapper>
    )
  );
};

export default ListHeader;
