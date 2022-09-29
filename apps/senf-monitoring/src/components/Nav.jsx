import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dropdown,
  LayerYellowDefault,
  SenfLogoSmall,
  Tabs,
  theme,
  useModals,
  Wave,
} from "senf-atomic-design-system";
import styled from "styled-components";
import { useAuthContext, AuthModal } from "senf-shared";
import { Arrow, SenfLogoBig } from "senf-atomic-design-system/src/assets/icons";
import { setMonitoringBoard } from "../redux/actions/accountActions";
import IdeaSidebarContent from "../pages/ideaProcessing/IdeaSidebarContent";

const Wrapper = styled.div`
  z-index: 0;
  background-color: ${({ theme }) => theme.colors.primary.primary100};
  height: 100%;
  width: ${({ navOpen }) => (navOpen ? "220px" : "80px")};
  transition: 0.5s;

  ${(props) => LayerYellowDefault}
  & > button {
    transition: 0.5s !important;
  }
`;

const Nav = () => {
  const { t } = useTranslation();
  const [navOpen, setNavOpen] = useState(false);
  const [order, setOrder] = useState(1);
  const { user, signOut } = useAuthContext();
  const { openModal } = useModals();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const monitoringBoards = useSelector((state) => state.data.monitoringBoards);

  const location = useLocation();
  if (location.pathname.split("/")[1] === "login") return null;
  if (location.pathname.split("/")[1] === "register") return null;
  if (location.pathname.split("/")[1] === "superAdminBoard") return null;

  const handleOrder = (value) => {
    setOrder(value);
    if (value === 1) {
      navigate("/");
    } else if (value === 2) {
      navigate("/divisions");
    }
  };

  useEffect(() => {
    if (location.pathname.split("/")[1] === "") {
      setOrder(1);
    } else if (location.pathname.split("/")[1] === "divisions") {
      setOrder(2);
    }
  }, [location]);

  useEffect(() => {
    if (monitoringBoards) {
      dispatch(setMonitoringBoard(monitoringBoards[0]?.monitoringBoardId));
    }
  }, [monitoringBoards]);

  const handleSelectMonitoringBoard = (event) => {
    const monitoringBoardId = event.target.value;
    dispatch(setMonitoringBoard(monitoringBoardId));
  };

  const navItems = [
    {
      name: "Dashboard",
      label: t("dashboard"),
      icon: "DashboardIcon",
      itemOrder: 1,
    },
    { name: "Divisions", label: t("divisions"), icon: "Politik", itemOrder: 2 },
  ];

  return (
    <Wrapper navOpen={navOpen}>
      <Box
        flexDirection="column"
        justifyContent="center"
        padding="18px"
        gap="10px"
        height="100%"
      >
        <Button
          variant="tertiary"
          size="medium"
          justifyContent="flex-start"
          text={
            navOpen ? (
              <SenfLogoBig color="white" />
            ) : (
              <SenfLogoSmall color="white" />
            )
          }
          onClick={() => setOrder(1)}
        />
        {navItems.map(({ name, icon, itemOrder }) => (
          <Button
            size="medium"
            variant={order === itemOrder ? "white" : "tertiary"}
            text={navOpen && name}
            width="100%"
            icon={icon}
            onClick={() => handleOrder(itemOrder)}
            justifyContent="flex-start"
          />
        ))}

        <Box
          marginTop="auto"
          zIndex={1}
          width="100%"
          justifyContent="center"
        >
          <Button
            size="medium"
            variant="tertiary"
            icon={navOpen ? <Arrow transform="rotate(180deg)" /> : <Arrow />}
            onClick={() => setNavOpen(!navOpen)}
          />
        </Box>
        <Wave
          color={theme.colors.beige.beige20}
          bottom="0px"
          left="0px"
          height="200px"
        />
      </Box>
    </Wrapper>
  );
};

export default Nav;
