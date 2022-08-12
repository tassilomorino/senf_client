/** @format */

import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import Icon from "../../atoms/icons/Icon";
import {
  LayerWhiteFirstDefault,
  LayerWhiteSecondDefault,
} from "../../atoms/layerStyles/LayerStyles";
import Box from "../../atoms/box/Box";
import Typography from "../../atoms/typography/Typography";
import { IdeaDetailPageProps } from "./IdeaDetailPage.types";
import setColorByTopic from "../../../data/setColorByTopic";
import Dot from "../../../assets/icons/Dot";
import FlameInactive from "../../../assets/icons/FlameInactive";
import CommentInactive from "../../../assets/icons/CommentInactive";
import FlameActive from "../../../assets/icons/FlameActive";
import CommentActive from "../../../assets/icons/CommentActive";
import setOrganizationTypeIcon from "../../../data/setOrganizationTypeIcon";
import Arrow from "../../../assets/icons/Arrow";
import Input from "../../atoms/inputs/Input";
import List from "../../molecules/list/List";
import CommentCard from "../../molecules/cards/CommentCard";
import Wave from "../../atoms/shapes/Wave";
import theme from "../../../styles/theme";
import More from "../../../assets/icons/More";
import Tabs from "../../molecules/tabs/Tabs";
import Stats from "../../../assets/icons/Stats";
import Info from "../../../assets/icons/Info";
import Bulb from "../../../assets/icons/Bulb";
import User from "../../../assets/icons/User";
import Mail from "../../../assets/icons/Mail";
import Divider from "../../atoms/divider/Divider";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import DetailSidebar from "../../organisms/detailSidebar/DetailSidebar";
import Share from "../../../assets/icons/Share";
import Button from "../../atoms/buttons/Button";
import ModalButton from "../../molecules/modalStack/ModalButton";
import Hyperlink from "../../../assets/icons/Hyperlink";
import { openMail, openLink } from "../../../util/helpers";
import Calendar from "../../organisms/calendar/Calendar";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import Location from "../../../assets/icons/Location";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";
import SocialmediaShare from "../../organisms/socialmediaShare/SocialmediaShare";
import Edit from "../../../assets/icons/Edit";
import Delete from "../../../assets/icons/Delete";
import Report from "../../../assets/icons/Report";
import Skeleton from "../../atoms/skeleton/Skeleton";
import EditIdeaPage from "../editIdeaPage/EditIdeaPage";

const DragWrapper = styled(animated.div) <IdeaDetailPageProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  ${(props) => LayerWhiteSecondDefault}
  border-radius: 18px;
  height: calc(100vh - 20px);
  width: 100%;
  max-width: 470px;

  background-color: ${({ theme }) => theme.colors.beige.beige20};
  overflow: hidden;

  overscroll-behavior: contain;
  overflow-x: hidden;
  position: absolute;
  pointer-events: all;
  width: 100%;
  height: 120%;
  position: fixed;
  z-index: 96;
  top: 0;
  overflow: scroll;
  overscroll-behavior: contain;
  animation: translateYFrom100toMinus200pxAnimation 1s;

  @media (min-width: 768px) {
    width: 466px;
    max-width: 466px;
    border-radius: 18px;
    margin: 10px;
    height: calc(100vh - 20px);
    overflow: hidden;
    animation: none;
  }
`;
const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;

  @media (min-width: 768px) {
    padding: 10px 10px 0px 70px;
    overflow-y: scroll;
  }
`;
const CardWrapper = styled.div<IdeaDetailPageProps>`
  float: left;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;

  border-radius: 18px;

  width: 100%;
  max-width: 400px;

  height: auto;
  flex: none;
  padding-bottom: ${({ projectroomCardData }) =>
    projectroomCardData ? "40px" : "0"};

  ${(props) => LayerWhiteFirstDefault}

  filter: ${(props) =>
    props.status === "deactivated" || props.status === "uncompleted"
      ? "brightness(0.6)"
      : "brightness(1)"};
  /* animation: opacityTranslateYFrom50Animation 0.8s; */
`;

const InnerCardWrapper = styled.div`
  margin: 12px 12px 12px 18px;
`;

const ProjectroomOpenButton = styled.button`
  position: absolute;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale20};
  border: 0;
  bottom: 0;
  &:hover {
    background-color: ${({ theme }) => theme.colors.greyscale.greyscale35};
    cursor: pointer;
  }
`;
const IdeaDetailPage: FC<IdeaDetailPageProps> = ({
  data,
  projectroomsData,
  projectroomCardData,
  handleButtonCloseCard,
  user,
  path,
  commentFormInput,
  setCommentFormInput,
  commentFormLoading,
  handleSetAuthOpen,
  handleSubmitEditidea
}) => {
  const {
    handle,
    screamId,
    title,
    body,
    Stadtteil,
    locationHeader,
    status,
    Thema,
    weblink,
    weblinkTitle,
    contact,
    contactTitle,
    likeCount,
    commentCount,
    projectRoomId: cardProjectroomId,
    selectedUnix,
    userHandle,
    userId,
    createdAt,
    comments,
  } = data;
  const { t } = useTranslation();
  const isMobile = isMobileCustom();

  const [socialmediaShareDropdownOpen, setSocialmediaShareDropdownOpen] =
    useState(false);

  const [editIdeaDropdownOpen, setEditIdeaDropdownOpen] = useState(false);

  const [swipePosition, setSwipePosition] = useState("bottom");

  const liked = () => {
    if (user?.likes && user?.likes.find((like) => like.screamId === screamId))
      return true;
    return false;
  };

  const commented = () => {
    if (
      user?.comments &&
      user?.comments.find((comment) => comment.screamId === screamId)
    )
      return true;
    return false;
  };



  let selectedDates = [];
  const selectedUnixArray = selectedUnix;
  const options = {
    weekday: "short",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  if (selectedUnixArray !== undefined && selectedUnixArray !== null) {
    if (selectedUnixArray.length > 0) {
      selectedUnixArray.forEach((element) => {
        selectedDates.push(
          <div key={element * 1000}>
            {new Date(element * 1000).toLocaleTimeString("de-DE", options)}{" "}
            <br />{" "}
          </div>
        );
      });
    } else {
      selectedDates = (
        <div>
          {new Date(selectedUnix * 1000).toLocaleTimeString("de-DE", options)}{" "}
          <br />{" "}
        </div>
      );
    }
  }

  const [props, set] = useSpring(() => ({
    y: 0,
    transform: isMobile && `translateY(${window.innerHeight - 200}px)`,
    overflow: "hidden",
    touchAction: "none",
    userSelect: "none",
  }));

  const bind = useDrag(
    ({ last, down, movement: [mx, my] }) => {
      if (isMobile) {
        const el = document.getElementById("dragWrapper");

        if (last && my < -50) {
          set({
            transform: !down ? `translateY(${70}px)` : `translateY(${0}px)`,
            touchAction: "unset",
            overflow: "scroll",
            userSelect: "all",
          });
          setSwipePosition("top");
        }
        if (last && el.scrollTop < 30 && my > 150) {
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
          handleButtonCloseCard();
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

  const handleShareIdea = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Senf.koeln – ${title}`,
          url: path,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      setSocialmediaShareDropdownOpen(!socialmediaShareDropdownOpen);
    }
  };
  return (
    <React.Fragment>
      <DetailSidebar
        handleButtonClose={() => handle.closeCard(false)}
        SecondButton={
          <ContentDropdown
            open={socialmediaShareDropdownOpen}
            setOpen={setSocialmediaShareDropdownOpen}
            direction={isMobile ? "downLeft" : "downRight"}
            OpenButton={
              <Button
                size="medium"
                variant="white"
                onClick={handleShareIdea}
                icon={<Share />}
              />
            }
            Content={
              <Box gap="5px" flexDirection="column">
                <SocialmediaShare
                  path={path}
                  handleShareIdeaVia={handle.shareIdeaVia}
                />
              </Box>
            }
          />
        }
        ThirdButton={
          <ContentDropdown
            open={editIdeaDropdownOpen}
            setOpen={setEditIdeaDropdownOpen}
            direction={isMobile ? "downLeft" : "downRight"}
            OpenButton={
              <Button
                size="medium"
                variant="white"
                onClick={() => setEditIdeaDropdownOpen(!editIdeaDropdownOpen)}
                icon={<More />}
              />
            }
            Content={
              <Box gap="5px" flexDirection="column">
                {user?.userId === userId || user?.isSuperAdmin === true ? (
                  <React.Fragment>
                    <ModalButton
                      variant={"tertiary"}
                      size="small"
                      text={t("idea.edit")}
                      justifyContent="flex-start"
                      icon={<Edit />}
                      options={{
                        padding: 0,
                        swipe: isMobile && true,
                        height: isMobile && window.innerHeight + 83
                      }}
                    >
                      <EditIdeaPage
                        projectroomsData={projectroomsData}
                        // viewport={viewport}
                        data={data}
                        handle={handle}
                      />
                    </ModalButton>

                    <ModalButton
                      variant={"tertiary"}
                      size="small"
                      text={t("idea.delete")}
                      justifyContent="flex-start"
                      icon={<Delete />}
                      options={{
                        padding: 20,
                        title: "Bist du sicher, dass du die Idee löschen möchtest?",
                        cancelText: t('cancel'),
                        submitText: t('delete'),
                        onSubmit: () => handle.deleteIdea(screamId)
                      }}
                    >
                    </ModalButton>
                  </React.Fragment>
                ) : (
                  <Button
                    variant={"secondary"}
                    size="small"
                    text={t("idea.report")}
                    justifyContent="flex-start"
                    onClick={() => handle.reportIdea(screamId)}
                    icon={<Report />}
                  />
                )}
              </Box>
            }
          />
        }
      />
      < DragWrapper
        id="dragWrapper"
        style={props}
        {...bind()}
        $isMobile={isMobile}
      >
        <div
          style={{
            position: "absolute",
            height: "200px",
            width: "100%",
            backgroundColor: isMobile ? "white" : "#fed957",
          }}
        />
        <Wave top="0px" color={theme.colors.beige.beige20} />

        <InnerWrapper>
          <CardWrapper
            status={status}
            projectroomCardData={projectroomCardData[0]}
          >
            <InnerCardWrapper>
              <Box
                alignItems="center"
                flexDirection="row"
                gap="5px"
                margin="8px 0px 4px 0px"
              >
                {Thema ? (
                  <Icon icon={<Dot color={setColorByTopic(Thema)} />} />
                ) : (
                  <Skeleton borderRadius="100" width="16" height="16" />
                )}
                <Typography
                  variant="bodySm"
                  fontWeight={600}
                  color={setColorByTopic(Thema)}
                >
                  {Stadtteil || <Skeleton height="16" />}
                </Typography>

                <Box
                  alignItems="center"
                  justifyContent="flex-end"
                  flexDirection="row"
                  margin="0px 0px 0px auto"
                >
                  <Button
                    variant="tertiary"
                    size="small"
                    icon={liked() ? <FlameActive /> : <FlameInactive />}
                    text={likeCount}
                    onClick={(event) => handle.buttonLike(event, screamId)}
                  />
                  <Button
                    variant="tertiary"
                    size="small"
                    icon={
                      commented() ? <CommentActive /> : <CommentInactive />
                    }
                    text={commentCount}
                    onClick={(event) => handle.buttonComment(event, screamId)}
                  />
                </Box>
              </Box>

              <Typography variant="h3">
                {" "}
                {title || <Skeleton height="25" />}
              </Typography>

              {/* <Box margin="10px 0px 20px 0px">
                <Tabs
                  fontSize="buttonSm"
                  order={0}
                  tabs={[
                    { icon: <Bulb />, text: "Beschreibung" },
                    { icon: <Info />, text: "Status" },
                    // { icon: <Stats />, text: "Statistiken" },
                  ]}
                />
              </Box> */}

              <Box alignItems="flex-start" flexDirection="row" margin="8px 0px">
                <Typography variant="bodyBg">
                  {" "}
                  {body || <Skeleton count="4" width="300" />}
                </Typography>
              </Box>

              {weblink || contact ? (
                <Box gap="8px" flexWrap="wrap" margin="10px 0px 16px 0px">
                  {contact && (
                    <Button
                      variant="secondary"
                      icon={<Mail />}
                      text={contactTitle || t("contact")}
                      size="small"
                      onClick={() => openMail(contact)}
                    />
                  )}
                  {weblink && (
                    <Button
                      variant="secondary"
                      icon={<Hyperlink />}
                      text={weblinkTitle || t("website")}
                      size="small"
                      onClick={() => openLink(weblink)}
                    />
                  )}
                </Box>
              ) : (
                <Divider margin="10px 0px 16px 0px" />
              )}

              <Box flexDirection="column" gap="5px">
                {selectedUnixArray && selectedUnixArray.length > 0 && (
                  <Box gap="5px">
                    <Icon icon={<CalendarIcon />} />
                    <Typography variant="buttonSm">{selectedDates}</Typography>
                  </Box>
                )}
                <Box gap="5px">
                  <Icon icon={<Location />} />{" "}
                  <Typography variant="buttonSm">{locationHeader}</Typography>
                </Box>

                <Box gap="5px">
                  <Icon icon={<User />} />{" "}
                  {createdAt && userHandle && (
                    <React.Fragment>
                      <Typography variant="buttonSm">{userHandle}</Typography>
                      <Typography
                        variant="buttonSm"
                        color={theme.colors.black.black40tra}
                      >
                        {t("at")}
                      </Typography>
                      <Typography
                        variant="buttonSm"
                        color={theme.colors.black.black40tra}
                      >
                        {dayjs(createdAt).format("DD.MM.YYYY")}
                      </Typography>
                    </React.Fragment>
                  )}
                </Box>
              </Box>
            </InnerCardWrapper>

            {projectroomCardData[0] && (
              <ProjectroomOpenButton
                onClick={() => handle.openProjectroom(cardProjectroomId)}
              >
                <Box
                  alignItems="center"
                  flexDirection="row"
                  gap="14px"
                  margin="0px 10px"
                >
                  <Icon
                    icon={setOrganizationTypeIcon(projectroomCardData[1])}
                  />
                  <Typography variant="bodySm">
                    {projectroomCardData[0]}
                  </Typography>
                </Box>
              </ProjectroomOpenButton>
            )}
          </CardWrapper>
          <Box
            margin="20px 10px"
            position="relative"
            flexDirection="column"
            gap="10px"
          >
            <Typography variant="h3">
              {t("IdeaDetailPage.commentHeadline")}
            </Typography>
            {!user?.authenticated ? (
              <Button onClick={handleSetAuthOpen}>{t("login")}</Button>
            ) : (
              <Box gap="8px" width="100%">
                <Input
                  placeholder={t("IdeaDetailPage.commentPlaceholder")}
                  value={commentFormInput}
                  onChange={(event) => setCommentFormInput(event.target.value)}
                />

                <Button
                  text={t("send")}
                  disabled={commentFormInput === "" || commentFormLoading}
                  loading={commentFormLoading}
                  onClick={handle.submitComment}
                />
              </Box>
            )}
          </Box>
          {comments && (
            <List
              data={comments}
              CardType={CommentCard}
              listEndText={" "}
              handle={handle}
              user={user}
            />
          )}
          <div style={isMobile ? { minHeight: "400px" } : { minHeight: "200px" }} />
        </InnerWrapper>
      </DragWrapper >
    </React.Fragment >
  );
};

export default IdeaDetailPage;
