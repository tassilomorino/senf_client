import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Dropdown,
  Tabs,
  useModals,
} from "senf-atomic-design-system";
import styled from "styled-components";
import { useAuthContext, AuthModal } from "senf-shared";
import { setMonitoringBoard } from "../redux/actions/accountActions";

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.primary.primary100};
  height: 100%;
  width: 100px;
`;

const Nav = () => {
  const { t } = useTranslation();
  const params = useParams();

  const { user, signOut } = useAuthContext();
  const { openModal } = useModals();
  const navigate = useNavigate();

  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();
  const monitoringBoards = useSelector((state) => state.data.monitoringBoards);
  const { divisionId } = params;

  const handleOrder = (value) => {
    setOrder(value);
    if (value === 1) {
      navigate("/");
    } else if (value === 2) {
      navigate("/divisions");
    } else if (divisionId) {
      navigate(`/divisions/${divisionId}`);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/") {
      setOrder(1);
    } else if (window.location.pathname === "/divisions") {
      setOrder(2);
    } else if (divisionId) {
      setOrder(2);
    }
  }, []);

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
    <Wrapper>
      <Box
        zIndex="999"
        flexDirection="column">
        <Box
          flexDirection="column"
          justifyContent="center"
          padding="30px"
          gap="20px">
          {navItems.map(({ name, icon, itemOrder }) => (
            <Button
              size="small"
              variant={order === itemOrder ? "white" : "tertiary"}
              icon={icon}
              onClick={() => handleOrder(itemOrder)}
            />
          ))}
        </Box>

        <Box
          position="fixed"
          bottom="0px"
          flexDirection="column">
          {user && <Button onClick={() => signOut()}>signout</Button>}

          <Dropdown
            id="monitoringBoardSelect"
            initialValue={t("select_division")}
            listItems={monitoringBoards}
            onChange={handleSelectMonitoringBoard}
          />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Nav;
