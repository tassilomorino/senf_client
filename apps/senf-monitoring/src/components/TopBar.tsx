import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Arrow,
  Box,
  Button,
  Dropdown,
  DropdownButton,
  Tabs,
  useModals,
  isMobileCustom,
} from "senf-atomic-design-system";
import styled from "styled-components";
import { useAuthContext, AuthModal } from "senf-shared";
import { setMonitoringBoard } from "../redux/actions/accountActions";

const Wrapper = styled.div`
  position: sticky;
  z-index: 9;
  background-color: transparent;
  /* background-color: ${({ theme }) => theme.colors.primary.primary100}; */
  top: 0;
  height: 80px;
  padding: 25px;
  width: 100%;
  transition: 0.5s;
`;

const TopBar = () => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [order, setOrder] = useState(1);
  const { user, signOut } = useAuthContext();
  const { openModal } = useModals();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const monitoringBoards = useSelector((state) => state.data.monitoringBoards);
  const currentMonitoringBoard = useSelector(
    (state) => state.data.currentMonitoringBoard
  );

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

  const handleSelectMonitoringBoard = (value) => {
    const monitoringBoardId = value;
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
      <Box justifyContent="space-between">
        <Box gap="8px">
          {monitoringBoards && (
            <DropdownButton
              variant="secondary"
              size="small"
              text={currentMonitoringBoard?.title}
              trailingIcon="ArrowDown"
              options={{ itemType: "check" }}
              data={Object.values(
                monitoringBoards as { label: string; value: string }[]
              ).map((item) => ({
                text: item?.title,
                // leadingIcon: item.icon,
                checked:
                  item?.monitoringBoardId ===
                  currentMonitoringBoard?.monitoringBoardId,
                onClick: () => {
                  handleSelectMonitoringBoard(item.monitoringBoardId);
                  // setCheckedStatusOption(item.value);
                  // setActiveStatusOptionLabel(item.label);
                },
              }))}
            />
          )}

          {/* {divisions && ( */}
          <DropdownButton
            variant="secondary"
            size="small"
            text={currentMonitoringBoard?.title}
            trailingIcon="ArrowDown"
            options={{ itemType: "check" }}
            data={Object.values(
              monitoringBoards as { label: string; value: string }[]
            ).map((item) => ({
              text: item?.title,
              // leadingIcon: item.icon,
              checked:
                item?.monitoringBoardId ===
                currentMonitoringBoard?.monitoringBoardId,
              onClick: () => {
                handleSelectMonitoringBoard(item.monitoringBoardId);
                // setCheckedStatusOption(item.value);
                // setActiveStatusOptionLabel(item.label);
              },
            }))}
          />
        </Box>

        {/* <Dropdown
        id="monitoringBoardSelect"
        initialValue={t("select_division")}
        listItems={monitoringBoards}
        onChange={handleSelectMonitoringBoard}
        
      /> */}

        <Box
          marginLeft="auto"
          gap="8px"
        >
          <DropdownButton
            variant="secondary"
            size="medium"
            leadingIcon="Bell"
            // data={Object.values(
            //   monitoringBoards as { label: string; value: string }[]
            // ).map((item) => ({
            //   text: item?.title,
            //   // leadingIcon: item.icon,
            //   checked:
            //     item?.monitoringBoardId ===
            //     currentMonitoringBoard?.monitoringBoardId,
            //   onClick: () => {
            //     handleSelectMonitoringBoard(item.monitoringBoardId);
            //     // setCheckedStatusOption(item.value);
            //     // setActiveStatusOptionLabel(item.label);
            //   },
            // }))}
          />

          {user && (
            <DropdownButton
              button={Avatar}
              img={user?.photoURL}
              placeholder={user?.handle.slice(0, 1)}
              size="small"
              trailingIcon="ArrowDown"
              options={{ itemType: "check" }}
              data={[
                // {
                //   onClick: handleRestart,
                //   text: t("restart"),
                //   leadingIcon: "Edit"
                // },
                {
                  onClick: () =>
                    openModal(<AuthModal authAddDetails={true} />, {
                      swipe: !!isMobile,
                      size: "md",
                    }),
                  text: t("profile.edit"),
                  leadingIcon: "Edit",
                },
                {
                  onClick: () => signOut(),
                  text: t("logout"),
                  leadingIcon: "Logout",
                },
              ]}
            />
          )}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default TopBar;
