import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "senf-atomic-design-system";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const Dashboard = () => {
  const { t } = useTranslation();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const myDate = new Date();
    const hours = myDate.getHours();

    if (hours < 12) {
      setGreeting("Good morning");
    } else if (hours >= 12 && hours <= 17) {
      setGreeting("Good afternoon");
    } else if (hours >= 17 && hours <= 24) {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <Wrapper>
      <Box gap="20px" flexDirection="column" margin="30px">
        <Typography variant="h1"> {greeting} Leon </Typography>
        <Typography variant="h3"> Das wird mega geil! </Typography>

        <Box gap="8px">
          <Button variant="secondary" text={t("cancel")} disabled={true} />
          <Button variant="white" text="Ja mann" />
          <Button variant="primary" text="Jaaaaaa mannnn" />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
