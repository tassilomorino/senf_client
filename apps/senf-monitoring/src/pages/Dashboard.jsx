import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Typography,
  IdeaCard,
  ModalButton,
  List,
} from "senf-atomic-design-system";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.beige.beige20};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
const Dashboard = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [greeting, setGreeting] = useState("");
  const ideas = useSelector((state) => state.data.ideas);

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
          <ModalButton text="Open Modal" options={{ swipe: true }}>
            <Button text="hi" />
          </ModalButton>
          {ideas && (
            <Button
              variant="white"
              text="zeig mir doch nur 3"
              onClick={() => dispatch(getIdeas(3))}
            />
          )}
        </Box>
        <Box>
          <Box width="400px" flexDirection="column" gap="16px">
            {ideas?.map((idea) => (
              <IdeaCard data={idea} />
            ))}
          </Box>
          {ideas && (
            <Box height="60vh" alignItems="center" margin="20px">
              <Typography variant="bodyBg">oder besser:</Typography>
            </Box>
          )}

          <Box width="400px" flexDirection="column">
            <List
              CardType={IdeaCard}
              data={ideas}
              // handleButtonOpenCard={handleButtonOpenCard}
              // handleOpenProjectroom={handleOpenProjectroom}
              listEndText={t("noMoreIdeas")}
            />
          </Box>
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
