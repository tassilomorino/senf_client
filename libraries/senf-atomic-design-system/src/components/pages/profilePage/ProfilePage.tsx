/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Icon from "../../atoms/icons/Icon";
import {
  LayerWhiteFirstDefault,
  LayerWhiteSecondDefault,
} from "../../atoms/layerStyles/LayerStyles";
import Box from "../../atoms/box/Box";
import Typography from "../../atoms/typography/Typography";
import { ProfilePageProps } from "./ProfilePage.types";
import Input from "../../atoms/inputs/Input";
import List from "../../molecules/list/List";
import CommentCard from "../../molecules/cards/CommentCard";
import Wave from "../../atoms/shapes/Wave";
import theme from "../../../styles/theme";
import Divider from "../../atoms/divider/Divider";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import DetailSidebar from "../../organisms/detailSidebar/DetailSidebar";
import ImagePlaceholder from "../../atoms/imagePlaceholder/ImagePlaceholder";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import Arrow from "../../../assets/icons/Arrow";
import Tabs from "../../molecules/tabs/Tabs";
import Bulb from "../../../assets/icons/Bulb";
import Info from "../../../assets/icons/Info";
import More from "../../../assets/icons/More";

import IdeaCard from "../../molecules/cards/IdeaCard";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";
import Button from "../../atoms/buttons/Button";
import OrganizationCard from "../../molecules/cards/OrganizationCard";
import Logout from "../../../assets/icons/Logout";
import Edit from "../../../assets/icons/Edit";
import Plus from "../../../assets/icons/Plus";
import Skeleton from "../../atoms/skeleton/Skeleton";
import ContentDropdownItem from "../../atoms/contentDropdownItem/ContentDropdownItem";
import ModalButton from "../../molecules/modalStack/ModalButton";
import Auth from "../auth/Auth";
import Avatar from "../../atoms/avatar/Avatar";

const DragWrapper = styled(animated.div) <ProfilePageProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  ${(props) => LayerWhiteSecondDefault}
  border-radius: 18px;
  height: calc(100vh - 20px);
  width: 100%;
  max-width: 470px;

  background-color: ${({ theme }) => theme.colors.primary.primary100};
  overflow: hidden;

  overscroll-behavior: contain;
  overflow-x: hidden;
  position: absolute;
  pointer-events: all;
  width: 100%;
  height: 120%;
  position: fixed;
  z-index: 95;
  top: 0;
  overflow: scroll;
  overscroll-behavior: contain;
  animation: translateYFrom100to70pxAnimation 1s;

  @media (min-width: 768px) {
    width: 470px;
    max-width: 470px;
    border-radius: 18px;
    margin: 10px;
    height: calc(100vh - 20px);
    overflow: hidden;
    animation: none;
  }
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
  overflow-y: scroll;
  @media (min-width: 768px) {
    padding: 10px 0px 0px 70px;
  }
`;

const ImageWrapper = styled.div`
  ${(props) => LayerWhiteFirstDefault}
  width:158px;
  height: 158px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoPlacer = styled.div`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  ${(props) => LayerWhiteSecondDefault}
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePage: FC<ProfilePageProps> = ({
  user,
  myProfileData,
  accountOwner,
  organization,
  organizations,
  profilePageOrganizations,
  profilePageScreams,
  handleButtonOpenCard,
  handleOpenProjectroom,
  handleButtonClose,
  handleSetAuthEditOpen,
  handleLogout,
  handleDeleteAccount,
  handleButtonLike,
  handleButtonComment,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [order, setOrder] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [swipePosition, setSwipePosition] = useState("top");

  const handleToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const [props, set] = useSpring(() => ({
    y: 0,
    transform: isMobile && `translateY(${70}px)`,
    overflow: "hidden",
    touchAction: "none",
    userSelect: "none",
  }));

  const bind = useDrag(
    ({ last, down, movement: [mx, my] }) => {
      if (isMobile) {
        const el = document.getElementById("dragWrapper");

        if (last && my < -50 && swipePosition === "bottom") {
          set({
            transform: !down ? `translateY(${70}px)` : `translateY(${0}px)`,
            touchAction: "unset",
            overflow: "scroll",
            userSelect: "all",
          });
          setSwipePosition("top");
        }
        if (last && my > 150 && swipePosition === "top") {
          set({
            transform: down
              ? `translateY(${0}px)`
              : `translateY(${window.innerHeight - 200}px)`,
            touchAction: "none",
            overflow: "hidden",
            userSelect: "none",
          });
          setSwipePosition("bottom");
        }
        if (swipePosition !== "top") {
          set({ y: down ? my : 0, userSelect: "none" });
        }

        if (last && mx > 100) {
          handleButtonClose();
        }
      }
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
        top: -window.innerHeight / 2,
        bottom: window.innerHeight - 120,
      },
    }
  );

  return (
    user && (
      <React.Fragment>
        <DetailSidebar
          handleButtonClose={() => handleButtonClose(false)}
          sideDivider={true}
          SecondButton={
            accountOwner && (<ContentDropdown
              open={dropdownOpen}
              setOpen={setDropdownOpen}
              direction={isMobile ? "downLeft" : "downRight"}
              OpenButton={
                <Button
                  variant="white"
                  size="medium"
                  onClick={handleToggle}
                  icon={<More />}
                />
              }
              Content={
                <Box gap="5px" flexDirection="column">
                  <ContentDropdownItem
                    text={t("profile.edit")}
                    icon={<Edit />}
                    onClick={handleSetAuthEditOpen}
                  />
                  <ContentDropdownItem
                    text={t("logout")}
                    icon={<Logout />}
                    onClick={handleLogout}
                  />


                  <ModalButton
                    button={ContentDropdownItem}
                    text={t("profile.delete")}
                    icon={<Plus />}
                    options={{
                      padding: 20,
                      title: t("contactModalTitle"),
                      cancelText: t("cancel")
                    }}
                  >

                    <ModalButton
                      text={t("profile.delete")}
                      fillWidth="max"
                      options={{
                        padding: 20,
                        title: t('delete_account_confirm'),
                        cancelText: t('cancel'),
                        submitText: t('delete'),
                        onSubmit: handleDeleteAccount,
                      }}
                    />

                  </ModalButton>
                </Box >

              }

            />)
          }

        />
        < DragWrapper
          id="dragWrapper"
          style={props}
          {...bind()}
          isMobile={isMobile}
        >
          <Wave top="0px" color={theme.colors.beige.beige20} />

          <ContentWrapper>
            <Box justifyContent="center" margin="20px">
              <Avatar layerStyle={LayerWhiteFirstDefault} borderRadius="16px" height="150px" width="150px" fontSize="28px" img={user?.photoURL} placeholder={user?.handle?.slice(0, 1)} loading={!user?.handle} />

            </Box>
            <Box justifyContent="center" margin="20px">
              {user?.handle ? (
                <Typography variant="h3">{user?.handle}</Typography>
              ) : (
                <Skeleton
                  height="22"
                  width="200"
                  baseColor="#E6D7BF"
                  highlightColor="#F0E7D9"
                />
              )}
            </Box>

            <Box margin="0px 24px" flexDirection="column">
              <Typography variant="buttonBg">
                {t("profilePage.aboutHeadline")}
              </Typography>

              <Box margin="5px 0px">
                {user?.description ? (
                  <Typography variant="bodyBg">{user?.description}</Typography>
                ) : accountOwner && (
                  <Button
                    variant="secondary"
                    size="small"
                    text={t("profilePage.addDescription")}
                    onClick={handleSetAuthEditOpen}
                  />
                )}
              </Box>
            </Box>

            <Divider margin="14px 24px 16px 24px" width="calc(100% - 48px)" />
            <Box margin="0px 24px 0px 24px" gap="10px">
              <Tabs
                fontSize="buttonSm"
                order={order}
                setOrder={setOrder}
                tabs={
                  profilePageOrganizations
                    ? [
                      { icon: <Bulb />, text: "Ideen" },
                      { icon: <Info />, text: "Organisationen" },
                      // { icon: <Info />, text: "Interaktionen" },
                    ]
                    : [
                      { icon: <Bulb />, text: "Ideen" },
                      // { icon: <Info />, text: "Interaktionen" },
                    ]
                }
              />
            </Box>

            <List
              user={user}
              myProfileData={myProfileData}
              CardType={order === 1 ? IdeaCard : OrganizationCard}
              data={order === 1 ? profilePageScreams : profilePageOrganizations}
              listType={order === 2 && "grid"}
              handleButtonOpenCard={handleButtonOpenCard}
              handleOpenProjectroom={handleOpenProjectroom}
              handleButtonLike={handleButtonLike}
              handleButtonComment={handleButtonComment}
              organizations={organizations}
              listEndText={
                order === 1 && profilePageScreams > 0
                  ? t("noMoreIdeas")
                  : order === 1 && profilePageScreams < 1 && t("noSharedIdeas")

                // :t("noIdeasWithFilter")
              }
            />
          </ContentWrapper>
        </ DragWrapper>
      </React.Fragment >
    )
  );
};

export default ProfilePage;
