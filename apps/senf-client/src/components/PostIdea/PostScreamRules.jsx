/** @format */

import React, { useState, Fragment } from "react";
import { Trans, useTranslation } from "react-i18next";

import styled from "styled-components";
import { Button, Box, Typography, Modal } from "senf-atomic-design-system";

const Wrapper = styled.div`
  padding: 20px;
  height: 400px;
`;

const PostScreamRules = () => {
  const { t } = useTranslation();
  const handleSetUnderstoodRules = () => {
    // handlemodal("pop")
    // setIntoAccout? setInto Localstorage? setCookies? (accepted_rules:true)
  }
  return (

    <React.Fragment>
      <Box margin="10px" justifyContent="center">
        <Typography variant="h1" fontWeight="900" textAlign="center">
          {t("rules_title")}
        </Typography>
      </Box>
      <Box margin="30px 10px 10px 10px" flexDirection="column" gap="10px">
        <Typography variant="h3" textAlign="center">
          {t("rules_section1header")}
        </Typography>

        <Typography variant="bodyBg" textAlign="center">
          <Trans i18nKey="rules_section1text">
            Ideen, Wünsche und Anregungen sind hier erwünscht. Für
            Beschwerden, informier dich bitte
            <a
              className="Terms"
              href="https://www.stadt-koeln.de/service/onlinedienste/anregungen-beschwerden/index.html"
              rel="noopener noreferrer"
              target="_blank"
            >
              hier
            </a>{" "}
            .
          </Trans>
        </Typography>
      </Box>

      <Box margin="10px" flexDirection="column" gap="10px">
        <Typography variant="h3" textAlign="center">
          {t("rules_section2header")}
        </Typography>

        <Typography variant="bodyBg" textAlign="center">
          {t("rules_section2text")}
        </Typography>
      </Box>
      <Box justifyContent="center" margin="40px 0px 0px 0px">
        <Button
          text={t("rules_understood")}
          onClick={handleSetUnderstoodRules}
        />
      </Box>
    </React.Fragment>
  );
};

export default PostScreamRules;
