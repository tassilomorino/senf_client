/** @format */

import React from "react";

// Icons
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Icon,
  Loader,
  Bulb,
  CommentActive,
  FlameActive,
} from "senf-atomic-design-system";
import lamploader from "../../images/lamp.png";
import ChatBorder from "../../images/icons/chat.png";
import HandFull from "../../images/icons/handsFull.png";
import { StyledH2, StyledH3 } from "../../styles/GlobalStyle";

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  padding-top: 40px;
  margin-left: 2.5%;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: center;
`;
const Indicator = styled.div`
  height: 50px;
  display: flex;
  position: relative;
  text-align: center;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: column;
  justify-content: flex-end;
`;

const Keyindicators = ({ screams, likesLength, commentslength }) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Indicator>
        <Icon icon={<Bulb />} />

        {screams.length === 0 ? (
          <Loader />
        ) : (
          <StyledH3 textAlign="center">
            {screams.length} {screams.length === 1 ? t("idea") : t("ideas")}
          </StyledH3>
        )}
      </Indicator>

      <Indicator>
        <Icon icon={<FlameActive />} />

        {likesLength === null ? (
          <Loader />
        ) : (
          <StyledH3 textAlign="center"> {likesLength} Votes</StyledH3>
        )}
      </Indicator>

      <Indicator>
        <Icon icon={<CommentActive />} />

        {commentslength === null ? (
          <Loader />
        ) : (
          <StyledH3 textAlign="center">
            {commentslength}{" "}
            {commentslength === 1 ? t("comment") : t("comments")}
          </StyledH3>
        )}
      </Indicator>
    </Wrapper>
  );
};

export default Keyindicators;
