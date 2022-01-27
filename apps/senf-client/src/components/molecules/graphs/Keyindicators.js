/** @format */

import React from "react";

//Icons
import CircularProgress from "@material-ui/core/CircularProgress";
import lamploader from "../../../images/lamp.png";
import ChatBorder from "../../../images/icons/chat.png";
import HandFull from "../../../images/icons/handsFull.png";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { StyledH2, StyledH3 } from "../../../styles/GlobalStyle";

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
        <img
          src={lamploader}
          width="35px"
          style={{
            transform: "rotate(35deg) translateY(-1px)",
            paddingBottom: "10px",
          }}
          alt="lamploader"
        />
        {screams.length === 0 ? (
          <CircularProgress size={12} thickness={2} />
        ) : (
          <StyledH3 textAlign="center">
            {screams.length} {screams.length === 1 ? t("idea") : t("ideas")}
          </StyledH3>
        )}
      </Indicator>

      <Indicator>
        <img
          src={HandFull}
          width="25px"
          alt="lamploader"
          style={{ paddingBottom: "10px" }}
        />
        {!likesLength ? (
          <CircularProgress size={12} thickness={2} />
        ) : (
          <StyledH3 textAlign="center"> {likesLength} Votes</StyledH3>
        )}
      </Indicator>

      <Indicator>
        <img
          src={ChatBorder}
          width="25px"
          alt="lamploader"
          style={{ paddingBottom: "10px" }}
        />{" "}
        {!commentslength ? (
          <CircularProgress size={12} thickness={2} />
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
