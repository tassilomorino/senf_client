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
  Typography
} from "senf-atomic-design-system";

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
        <Icon icon={<Bulb transform="scale(1.2)" />} />

        {screams.length === 0 ? (
          <Loader />
        ) : (
          <Typography variant="buttonBg" textAlign="center">
            {screams.length} {screams.length === 1 ? t("idea") : t("ideas")}
          </Typography>
        )}
      </Indicator>

      <Indicator>
        <Icon icon={<FlameActive transform="scale(1.2)" />} />

        {likesLength === null ? (
          <Loader />
        ) : (
          <Typography variant="buttonBg" textAlign="center"> {likesLength} Votes</Typography>
        )}
      </Indicator>

      <Indicator>
        <Icon icon={<CommentActive transform="scale(1.2)" />} />

        {commentslength === null ? (
          <Loader />
        ) : (
          <Typography variant="buttonBg" textAlign="center">
            {commentslength}{" "}
            {commentslength === 1 ? t("comment") : t("comments")}
          </Typography>
        )}
      </Indicator>
    </Wrapper>
  );
};

export default Keyindicators;
