/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { clearErrors } from "../../../redux/actions/errorsActions";

//Components

import Header from "../../molecules/Headers/Header";
import InfoModal from "../../molecules/DialogInlineComponents/InfoModal";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";
import SwipeList from "../SwipeLists/SwipeList";
import { SubmitButton } from "../../atoms/CustomButtons/SubmitButton";
import { useTranslation } from "react-i18next";
import { MenuData } from "../../../data/MenuData";
import CalendarComponent from "../../atoms/calendar/CalendarComponent";
import { StyledH2, StyledText } from "apps/senf-client/src/styles/GlobalStyle";

export const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 99;
  top: 0;
  position: fixed;
  pointer-events: all;
  overflow: scroll;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );
  /* animation: OrganizationPageAnimation 0.2s; */

  @media (min-width: 768px) {
    margin-left: 0px;
    width: calc(100vw - 200px);
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
    transition: 0.5s;
  }

  /* @keyframes OrganizationPageAnimation {
  0% {
    left: 50vw;
    opacity: 0;
  }
  100% {
    left: 0vw;
    opacity: 1;
  }
} */
`;

const CalendarWrapper = styled.div`
  position: absolute;
  padding-top: 50px;
  top: 0;
  right: 0;
  background-color: #fed957;
  border-left: 2px solid white;
`;

const InfoWidget = styled.div`
  position: relative;
  width: 350px;
  height: auto;
  z-index: 99;
  margin-top: 20px;
  left: 10px;
  background-color: white;
  border-radius: 18px;
  padding: 15px;
`;

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const MapHider = styled.div`
  width: calc(100% - 600px);
  height: 100%;
  position: fixed;
  top: 0;
  left: 600px;
  background-color: #000;
  opacity: 0.6;
  z-index: 9;
`;

const OrganizationDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
}) => {
  const { t } = useTranslation();
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [dropdown, setDropdown] = useState("newest");

  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const organization = useSelector((state) => state.data.organization);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const loadingOrganization = useSelector(
    (state) => state.UI.loadingOrganization
  );

  const mapViewport = useSelector((state) => state.data.mapViewport);

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
    console.log(organization);
  }, [openOrganization]);

  const handleClose = () => {
    dispatch(openOrganizationFunc(false));
    dispatch(clearErrors());
  };

  const handleClick = (order) => {
    setOrder(order);

    if (order === 2) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }

    dispatch(clearErrors());
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const dataRar = organization?.projectRooms;

  const [searchTerm, setSearchTerm] = useState("");
  const screamsSearched = dataRar?.filter((val) => {
    if (searchTerm === "") {
      return val;
    } else if (
      val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return val;
    }
  });

  const sortedScreams =
    dropdown === "newest"
      ? _.orderBy(screamsSearched, "createdAt", "desc")
      : _.orderBy(screamsSearched, "likeCount", "desc");

  const dataFinal = sortedScreams;
  // .filter(
  //   ({ Thema, status, lat, long }) =>
  //     selectedTopics.includes(Thema) &&
  //     lat <= mapBounds?.latitude1 &&
  //     lat >= mapBounds?.latitude2 &&
  //     long >= mapBounds?.longitude2 &&
  //     long <= mapBounds?.longitude3 &&
  //     status === "None"
  // );
  console.log(dataRar, dataFinal);

  return (
    openOrganization && (
      <Wrapper>
        <Header
          imgUrl={organization?.imgUrl}
          title={organization?.title}
          owner={organization?.organizationType}
          loading={loading}
          order={order}
          path={path}
          organization={organization}
          handleClose={handleClose}
          handleClick={handleClick}
        />
        {/* {!isMobileCustom && order === 0 && <MapHider />} */}

        {/* {!isMobileCustom || (isMobileCustom && order !== 1 && <Background />)} */}
        <div
          style={{
            width: "400px",
            height: "100vh",
            position: "fixed",
            left: "600px",
            top: "0px",
            zIndex: 999999999,
          }}
        >
          {order === 1 && (
            <SwipeList
              swipeListType="projectRoomOverview"
              loading={loadingOrganization}
              tabLabels={MenuData.map((item) => item.text).slice(1, 2)}
              order={2}
              dataFinal={dataFinal}
              dataFinalLength={dataFinal.length}
              dataFinalMap={dataFinalMap}
              viewport={mapViewport}
              handleDropdown={handleDropdown}
              projectsData={projectsData}
              dropdown={dropdown}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}
        </div>

        <InfoWidget>
          <StyledH2 fontWeight="900">Über uns</StyledH2>
          <StyledText>{organization?.description}</StyledText>
        </InfoWidget>

        <InfoWidget>
          <StyledH2 fontWeight="900">Kontakt</StyledH2>
          <br />
          <StyledText>{organization?.contact}</StyledText>
          <StyledText>{organization?.weblink}</StyledText>
          Insta? Facebook? Twitter?
        </InfoWidget>
        <InfoWidget>
          <StyledH2 fontWeight="900">Adresse</StyledH2>
          <br />
          <StyledText>{organization?.address}</StyledText>
        </InfoWidget>

        <CalendarWrapper>
          <CalendarComponent
            googleCalendarId={organization?.googleCalendarId}
          />
        </CalendarWrapper>
      </Wrapper>
    )
  );
};

export default OrganizationDialog;
