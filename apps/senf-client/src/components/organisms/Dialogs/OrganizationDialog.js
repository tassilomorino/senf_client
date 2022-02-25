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
import {
  StyledH2,
  StyledH3,
  StyledText,
} from "apps/senf-client/src/styles/GlobalStyle";
import setIconByOrganizationType from "apps/senf-client/src/data/setIconByOrganizationType";
import NewButton from "../../atoms/CustomButtons/NewButton";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import Loader from "../../atoms/Backgrounds/Loader";
import List from "../../molecules/List/List";
import { SVGWrapper } from "../../molecules/Headers/styles/sharedStyles";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 0vh;
  z-index: 99;
  top: 0;
  position: fixed;
  pointer-events: all;
  overflow-y: scroll;
  overflow-x: hidden;
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
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
    overflow-x: hidden;
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
  width: 350px;
  max-width: calc(100% - 50px);
  height: auto; /* 72px */
  width: 348px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
  font-weight: 500;
  font-style: normal;
  font-family: "Nunito", serif;
  color: rgba(0, 0, 0, 0.8);
  font-size: 16px;
  letter-spacing: 0px;
  line-height: 1.5;
  text-align: left;

  margin: 0px 16px 0px 24px;
  height: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
`;

const Divider = styled.div`
  width: 342px;
  height: 1px;
  background-color: rgba(186, 160, 79, 0.2);
  overflow: visible;
  margin: 10px 24px 10px 24px;
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

const FlexBox = styled.div`
  display: flex;
  margin: 24px;
`;
const LogoWrapper = styled.div`
  margin: 20px 50% 0px 50%;
  transform: translateX(-50%);
  box-sizing: border-box;
  width: 158px;
  height: 158px;
  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: var(--token-58c56d1c-7f62-4684-98af-05bff26e81d6, #fcfbf8);
  overflow: visible;
  border-radius: 18px;
  border: 2px solid #ffffff;
`;

const Logo = styled.div`
  width: 118px;
  height: 118px;
  overflow: visible;
  background-image: url(${(props) => (props.imgUrl ? props.imgUrl : null)});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 10px;
  margin: 20px;
  border: 1px solid white;
`;

const LogoPlacer = styled.div`
  box-sizing: border-box;
  width: 28px;
  height: 28px;
  box-shadow: 0px 6px 8px -1px rgba(186, 160, 79, 0.2),
    0px -2px 5px 2px rgba(255, 255, 255, 0.2);
  background-color: #faf8f3;
  overflow: visible;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.8);
  position: relative;
`;

const Icon = styled.div`
  margin: 5px;
`;

const Title = styled.span`
  width: auto; /* 167px */
  height: auto; /* 28px */
  white-space: pre;
  overflow: visible;
  font-weight: 700;
  font-style: normal;
  font-family: "Nunito", serif;
  color: #000000;
  font-size: 20px;
  letter-spacing: 0px;
  line-height: 1.4;
  text-align: center;
  margin-left: 12px;
`;

const ListWrapper = styled.div`
  position: relative;
  background-color: rgb(249, 241, 215);
  padding-bottom: 200px;
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

  return openOrganization && organization ? (
    <Wrapper>
      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        margin="10px"
        backgroundColor="#FFF0BC"
        handleButtonClick={() => handleClose()}
        zIndex={99}
      />
      <SVGWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="466"
          style={{
            position: "absolute",
            zIndex: -1,
            marginTop: "50px",
            transform: "scale(1.06)",
          }}
        >
          <path
            d="M 390 465.5 L 0 465.5 L 0 72.799 C 0 72.799 36.092 37.746 111.8 47.312 C 187.508 56.878 219.827 63.443 257.92 54.074 C 296.013 44.705 304.708 18.224 331.24 6.221 C 357.772 -5.781 390 6.221 390 6.221 Z"
            fill="rgb(249, 241, 215)"
          ></path>
        </svg>
      </SVGWrapper>
      <LogoWrapper>
        <Logo imgUrl={organization.imgUrl} />
      </LogoWrapper>
      <FlexBox>
        <LogoPlacer>
          <Icon>
            {setIconByOrganizationType(organization.organizationType)}
          </Icon>
        </LogoPlacer>
        <Title> {organization.title}</Title>
      </FlexBox>

      <FlexBox>
        <NewButton>Kontakt</NewButton>
        <NewButton margin="0px 10px 0px 10px">Kalender</NewButton>
        <NewButton>FAQ</NewButton>
      </FlexBox>

      <InfoWidget>
        <StyledH2 fontWeight="700">Informationen </StyledH2>
        <StyledText>{organization?.description}</StyledText>
      </InfoWidget>

      <Divider />

      <ListWrapper>
        <StyledH2 fontWeight="700" margin="16px 24px 14px 24px">
          Unsere Projekträume
        </StyledH2>

        <List
          swipeListType="projectRoomOverview"
          order={2}
          loading={loading}
          dropdown={dropdown}
          dataFinal={dataFinal}
          projectsData={projectsData}
          handleClick={handleClick}
        />
      </ListWrapper>

      {/* {!isMobileCustom && (
        <CalendarWrapper>
          <CalendarComponent
            googleCalendarId={organization?.googleCalendarId}
          />
        </CalendarWrapper>
      )} */}
    </Wrapper>
  ) : (
    <Wrapper>
      <Loader />
    </Wrapper>
  );
};

export default OrganizationDialog;
