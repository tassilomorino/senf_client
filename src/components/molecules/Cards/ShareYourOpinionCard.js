/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import LoginRegistration from "../../atoms/Auth/LoginRegistration";
import { CustomButton } from "../../atoms/CustomButtons/CustomButton";

const Card = styled.div`
  display: flex;
  background-color: white;
  margin-left: auto;
  margin-right: auto;
  width: 95%;
  border-radius: 20px;
  min-height: auto;
  position: relative;
`;

const InnerWrapper = styled.div`
  width: 95%;
  margin-top: 15px;
  text-align: center;
  margin-left: 2.5%;
  padding-bottom: 15px;

  font-family: Futura PT W01-Bold;
  font-size: 14pt;
  color: #414345;
`;

const ShareYourOpinionCard = () => {
  const { t } = useTranslation();
  const authenticated = useSelector((state) => state.user.authenticated);
  return (
    <Card>
      <InnerWrapper>
        <span>
          {t("dialogScream_what_do_you_think")} <br />
          {t("dialogScream_opinion")}
        </span>

        {!authenticated && (
          <CustomButton
            text="Melde dich an"
            backgroundColor="#353535"
            textColor="white"
            position="relative"
            top="10px"
            zIndex="0"
          >
            <LoginRegistration />
          </CustomButton>
        )}
      </InnerWrapper>
    </Card>
  );
};

export default ShareYourOpinionCard;
