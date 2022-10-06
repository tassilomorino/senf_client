import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import { Box, Button, Edit, LayerWhiteFirstDefault, Tabs, Typography } from "senf-atomic-design-system";
import { useTranslation } from "react-i18next";
import {
  Eye,
  Share,
  Stats,
  Arrow,
} from "senf-atomic-design-system/src/assets/icons";
import { Link } from "react-router-dom";

const Container = styled.div`
  ${LayerWhiteFirstDefault};
`;

const Nav = ({ title, order, setOrder }) => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Container>
      <Box
        justifyContent="space-between"
        padding="1rem"
        flexWrap="wrap"
        gap="1rem 0"
      >
        <Box
          alignItems="center"
          style={{ flex: 1 }}
          gap='0.5rem'
        >
          <Link to={'/'}>
            <Button
              variant="secondary"
              size="small"
              borderStyle="solid"
              icon={<Arrow transform="rotateY(180deg)" />}
            />
          </Link>
          <Typography variant="bodyBg">{title}</Typography>
        </Box>
        <Box
          alignItems="center"
          gap="1rem"
          style={{ flex: 1 }}
        >
          <Tabs
            fontSize="buttonSm"
            order={order}
            setOrder={setOrder}
            tabs={[
              {
                icon: <Edit />,
                text: t("Edit Survey"),
              },
              {
                icon: <Eye />,
                text: t("Preview"),
              },
              {
                icon: <Share />,
                text: t("Publish & Settings"),
              },
              {
                icon: <Stats />,
                text: t("Analyze Results"),
              },
            ]}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Nav;
