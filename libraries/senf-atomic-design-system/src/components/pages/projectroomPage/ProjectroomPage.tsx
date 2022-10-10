/** @format */

import React, { FC, useEffect, useRef, useState } from "react";
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
import { ProjectroomPageProps } from "./ProjectroomPage.types";
import Input from "../../atoms/inputs/Input";
import List from "../../molecules/list/List";
import CommentCard from "../../molecules/cards/CommentCard";
import Wave from "../../atoms/shapes/Wave";
import theme from "../../../styles/theme";
import Divider from "../../atoms/divider/Divider";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import DetailSidebar from "../../organisms/detailSidebar/DetailSidebar";
import TertiaryButton from "../../atoms/buttons/TertiaryButton";
import Arrow from "../../../assets/icons/Arrow";
import Tabs from "../../molecules/tabs/Tabs";
import Bulb from "../../../assets/icons/Bulb";
import Info from "../../../assets/icons/Info";
import More from "../../../assets/icons/More";

import IdeaCard from "../../molecules/cards/IdeaCard";
import Button from "../../atoms/buttons/Button";
import TagSlide from "../../molecules/tagSlide/TagSlide";
import Plus from "../../../assets/icons/Plus";
import setOrganizationTypeIcon from "../../../data/setOrganizationTypeIcon";
import Toolbar from "../../molecules/toolbar/Toolbar";
import { useIntersection } from "../../../hooks/useIntersection";
import CalendarIcon from "../../../assets/icons/CalendarIcon";
import Share from "../../../assets/icons/Share";
import SocialmediaShare from "../../organisms/socialmediaShare/SocialmediaShare";

import Edit from "../../../assets/icons/Edit";
import Skeleton from "../../atoms/skeleton/Skeleton";
import { Stats } from "../../../assets/icons";
import Loader from "../../atoms/animations/Loader";
import DropdownButton from "../../atoms/contentDropdown/DropdownButton";

const Calendar = React.lazy(() => import("../../organisms/calendar/Calendar"));

const DragWrapper = styled(animated.div)<ProjectroomPageProps>`
  display: flex;
  position: relative;
  flex-direction: column;
  ${(props) => LayerWhiteSecondDefault}
  border-radius: 18px;
  height: calc(100vh - 20px);
  width: 100%;
  max-width: 470px;

  background-color: ${({ theme }) => theme.colors.primary.primary100};

  overscroll-behavior: contain;
  overflow-x: hidden;
  position: absolute;
  pointer-events: all;
  width: 100%;
  height: 120%;
  position: fixed;
  z-index: 96;
  top: 0;
  overflow: visible;
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

const InnerWrapper = styled.div<OrganizationsOverviewProps>`
  @media (min-width: 768px) {
    padding: 0px 0px 0px 70px;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

const ContentWrapper = styled.div<OrganizationsOverviewProps>`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100vh - 160px);
  width: 100%;
  z-index: 1;
  margin-left: 50%;
  transform: translateX(-50%);

  @media (min-width: 768px) {
    height: calc(100% - 50px);
  }
`;

export const Header = styled(animated.div)`
  position: sticky;
  display: flex;
  flex-direction: column;
  width: 100%;

  background-color: transparent;
  z-index: 25;
  z-index: 99;
  border-radius: ${({ theme }) => theme.radii[5]}px
    ${({ theme }) => theme.radii[5]}px 0px 0px;
  overflow: visible;
`;

const ToolbarWrapper = styled.div`
  margin-top: ${({ swipedUp }) => (swipedUp ? "16px" : "-46px")};
  transition: 0.5s;
  margin-left: 12px;
  width: calc(100% - 24px);
`;

const HandleBar = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 50px;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.primary.primary120};
  border-radius: 1px;
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

const InfoWidget = styled.div`
  max-width: 100%;
  width: 352px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  height: ${(props) => (props.infoOpen ? "auto" : "90px")};
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${(props) => (props.infoOpen ? "block" : "-webkit-box")};
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const TagSlideWrapper = styled.div`
  position: sticky;
  top: -10px;

  .isSticky {
    position: fixed;
    top: 10px;
    z-index: 999999999;
  }
`;

const ProjectroomPage: FC<ProjectroomPageProps> = ({
  data,
  ideasData,
  organizations,

  user,
  handleButtonOpenCard,
  handleButtonClose,
  selectedTopics,
  handleSelectTopics,
  setPostIdeaOpen,
  handleButtonLike,
  handleButtonComment,
  setSearchOpen,
  searchOpen,
  searchTerm,
  setSearchTerm,
  handleEditProjectroom,
  path,
  handleShareIdeaVia,
  checkedSortOption,
  setCheckedSortOption,
  setOpenStatisticsOverview,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const cardOrganizationId = data?.organizationId;

  const [order, setOrder] = useState(1);
  const [infoOpen, setInfoOpen] = useState(false);
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const [socialmediaShareDropdownOpen, setSocialmediaShareDropdownOpen] =
    useState(false);

  const [swipedUp, setSwipedUp] = useState(true);

  const [swipePosition, setSwipePosition] = useState("top");
  const [tagSlideVisible, setTagSlideVisible] = useState(false);
  const catchRef = useRef();
  const ref = useRef();
  const [activeSortOptionLabel, setActiveSortOptionLabel] = useState(
    t("newest_ideas")
  );
  const scrollHandler = () => {
    if (isMobile) {
      const stickyElm = document.getElementById("tagSlideRef");

      const observer = new IntersectionObserver(
        ([e]) => e.target.classList.toggle("isSticky", e.intersectionRatio < 1),
        { threshold: [1] }
      );
      observer.observe(stickyElm);

      if (ref.current.classList.contains("isSticky")) {
        setTagSlideVisible(true);
      } else {
        setTagSlideVisible(false);
      }
    }
  };
  useEffect(() => {
    setActiveSortOptionLabel(
      order === "ideas" ? t("newest_ideas") : t("newest_projectrooms")
    );
  }, []);
  const [props, set] = useSpring(() => ({
    y: 0,
    transform: isMobile && `translateY(${70}px)`,
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
            userSelect: "all",
          });
          setSwipePosition("top");
          setSwipedUp(true);
        }
        if (last && my > 150 && swipePosition === "top") {
          set({
            transform: down
              ? `translateY(${0}px)`
              : `translateY(${window.innerHeight - 200}px)`,
            touchAction: "none",
            userSelect: "none",
          });
          setSwipePosition("bottom");
          setSwipedUp(false);
        }
        if (swipePosition !== "top") {
          set({ y: down ? my : 0, userSelect: "none" });
        }

        if (last && mx > 100) {
          // handleButtonClose();
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

  const [organizationCardData, setOrganizationCardData] = useState([]);

  useEffect(() => {
    if (organizations) {
      organizations.map(
        ({ organizationId, title, organizationType, logoURL, userIds }) => {
          if (cardOrganizationId === organizationId) {
            setOrganizationCardData([
              ...organizationCardData,
              title,
              organizationType,
              logoURL,
              userIds,
            ]);
          }
        }
      );
    }
  }, [organizations, data]);

  return (
    <React.Fragment>
      <DetailSidebar
        sideDivider={true}
        SecondButton={
          <DropdownButton
            variant="white"
            size="medium"
            width="height"
            leadingIcon="Share"
            data={
              <Box
                gap="5px"
                flexDirection="column"
              >
                <SocialmediaShare
                  path={path}
                  handleShareIdeaVia={handleShareIdeaVia}
                />
              </Box>
            }
          />
        }
        ThirdButton={
          organizationCardData[3]?.includes(user?.userId) ||
          (true && (
            <DropdownButton
              variant="white"
              size="medium"
              width="height"
              leadingIcon="More"
              data={[
                {
                  text: t("Projektraum bearbeiten"),
                  onClick: handleEditProjectroom,
                  leadingIcon: "Edit",
                },
              ]}
            />
          ))
        }
      />
      <DragWrapper
        id="dragWrapper"
        style={props}
        isMobile={isMobile}
      >
        <Wave
          top="0px"
          color={theme.colors.beige.beige20}
        />

        <InnerWrapper>
          <Header
            {...bind()}
            swipedUp={swipedUp}
            // style={listHeaderProps}
            ref={catchRef}
          >
            {isMobile && <HandleBar />}

            <Box margin="21px 110px 0px 24px">
              <Typography
                variant="h3"
                fontWeight={900}
                fontSize={isMobile ? "5.6vw" : "22px"}
              >
                {data?.title || (
                  <Skeleton
                    height="22"
                    width="200"
                    baseColor="#E6D7BF"
                    highlightColor="#F0E7D9"
                  />
                )}
              </Typography>
            </Box>

            {tagSlideVisible ? (
              <TagSlide
                type={"topics"}
                selectedTopics={selectedTopics}
                handleSelectTopics={handleSelectTopics}
              />
            ) : (
              <Box
                margin="24px 24px 12px 24px"
                alignItems="center"
                gap="12px"
              >
                <LogoPlacer>
                  <Icon
                    icon={setOrganizationTypeIcon(organizationCardData[1])}
                  />
                </LogoPlacer>
                {organizationCardData[0] ? (
                  <Typography variant="buttonBg">
                    {" "}
                    {organizationCardData[0]}
                  </Typography>
                ) : (
                  <Skeleton
                    height="22"
                    width="200"
                    baseColor="#E6D7BF"
                    highlightColor="#F0E7D9"
                  />
                )}
              </Box>
            )}

            {/* {!isMobile && toolbarComponent} */}
          </Header>

          <ContentWrapper
            isMobileCustom={isMobileCustom}
            id="contentWrapper"
            onScroll={scrollHandler}
          >
            <Box margin="0px 0px 0px 18px">
              <TertiaryButton
                text={t("information")}
                trailingIcon={
                  <Arrow
                    transform={infoOpen ? "rotate(-90deg) " : "rotate(0deg) "}
                  />
                }
                onClick={() => setInfoOpen(!infoOpen)}
              />
            </Box>
            <Box margin="2px 24px 0px 24px">
              <InfoWidget
                onClick={() => setInfoOpen(!infoOpen)}
                infoOpen={infoOpen}
              >
                {data?.description_about ? (
                  <Typography variant="bodyBg">
                    Es geht um {data?.description_about} <br />
                    <br />
                    Mit den Ideen werden wir
                    {data?.description_procedure} <br />
                    <br />
                    Unsere Motivation ist
                    {data?.description_motivation} <br />
                    <br />
                    Wenn du mehr erfahren willst
                    {data?.description_learnmore} <br />
                  </Typography>
                ) : (
                  <Skeleton
                    count="4"
                    height="16"
                    width="300"
                    baseColor="#E6D7BF"
                    highlightColor="#F0E7D9"
                  />
                )}
              </InfoWidget>
            </Box>

            <Divider
              margin="14px 24px 16px 24px"
              width="auto"
            />

            {data?.calendar && (
              <Box
                margin="0px 24px 0px 24px"
                gap="10px"
              >
                <Tabs
                  fontSize="buttonSm"
                  order={order}
                  setOrder={setOrder}
                  tabs={[
                    { icon: <Bulb />, text: "Ideen" },
                    { icon: <CalendarIcon />, text: "Kalender" },
                  ]}
                />
              </Box>
            )}
            {isMobile && (
              <TagSlideWrapper
                id="tagSlideRef"
                ref={ref}
              ></TagSlideWrapper>
            )}

            {order === 1 ? (
              <React.Fragment>
                <Box margin="14px 24px 16px 24px">
                  <Toolbar
                    setSearchOpen={setSearchOpen}
                    searchOpen={searchOpen}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    secondButton={
                      <Button
                        variant="secondary"
                        size="small"
                        text={t("statistics")}
                        leadingIcon="Stats"
                        onClick={() => setOpenStatisticsOverview(true)}
                      />
                    }
                    searchPlaceholder={t("searchBar")}
                    activeSortOptionLabel={activeSortOptionLabel}
                    setActiveSortOptionLabel={setActiveSortOptionLabel}
                    checkedSortOption={checkedSortOption}
                    setCheckedSortOption={setCheckedSortOption}
                    sortOptions={[
                      { value: "newest", label: t("newest_ideas") },
                      { value: "hottest", label: t("hottest_ideas") },
                    ]}
                    statusOptions={[
                      { value: "Unprocessed", label: t("unprocessed") },
                      { value: "Accepted", label: t("accepted") },
                      { value: "Planning", label: t("planning") },
                      { value: "Implemented", label: t("implemented") },
                      { value: "Rejected", label: t("rejected") },
                    ]}
                  />
                </Box>

                <Box margin="0px 16px">
                  <Button
                    variant="secondary"
                    size="medium"
                    width="max"
                    text={t("post_idea_in_projectroom")}
                    leadingIcon="Plus"
                    onClick={() => setPostIdeaOpen(true)}
                  />
                </Box>
                <List
                  handleButtonLike={handleButtonLike}
                  handleButtonComment={handleButtonComment}
                  user={user}
                  CardType={IdeaCard}
                  data={ideasData}
                  handleButtonOpenCard={handleButtonOpenCard}
                  organizations={organizations}
                  listEndText={
                    ideasData?.length > 0
                      ? t("noMoreIdeas")
                      : ideasData?.length < 1 && t("noProjectIdeas")

                    // :t("noContentIdeas") //filter...
                  }
                />
              </React.Fragment>
            ) : (
              order === 2 && (
                <div style={{ margin: "10px 24px 20px 24px" }}>
                  <React.Suspense
                    fallback={
                      <Loader
                        width="20px"
                        height="20px"
                      />
                    }
                  >
                    <Calendar
                      inlineCalendarEntries={data?.screams}
                      calendarType="inline"
                      handleButtonOpenCard={handleButtonOpenCard}
                    />
                  </React.Suspense>
                </div>
              )
            )}
          </ContentWrapper>
        </InnerWrapper>
      </DragWrapper>
    </React.Fragment>
  );
};

export default ProjectroomPage;
