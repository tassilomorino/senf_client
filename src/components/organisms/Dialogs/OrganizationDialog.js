/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import ProjectHeader from "../../molecules/Headers/ProjectHeader";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import OrganizationHeader from "../../molecules/Headers/OrganizationHeader";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";
import SwipeList from "../SwipeLists/SwipeList";

const Wrapper = styled.div`
  @media (min-width: 768px) {
    padding-top: 70px;
  }
`;

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const OrganizationDialog = ({
  viewport,
  projectsData,
  loadingProjects,
  dataFinalMap,
}) => {
  const [path, setPath] = useState("");
  const [order, setOrder] = useState(1);
  const [dropdown, setDropdown] = useState("newest");

  const openOrganization = useSelector((state) => state.UI.openOrganization);
  const organization = useSelector((state) => state.data.organization);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.UI.loading);
  const mapViewport = useSelector((state) => state.data.mapViewport);

  const { title, imgUrl, description, weblink, contact } = organization;

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

  const dataRar = organization.projectRooms;

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

  return (
    openOrganization && (
      <React.Fragment>
        <OrganizationHeader
          imgUrl={imgUrl}
          title={title}
          loading={loading}
          order={order}
          path={path}
          organization={organization}
          handleClose={handleClose}
          handleClick={handleClick}
        />

        <Wrapper>
          {!isMobileCustom || (isMobileCustom && order !== 1 && <Background />)}

          {order === 1 && (
            <SwipeList
              swipeListType="projectRoomOverview"
              loading={loadingProjects}
              order={order}
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

          {order === 2 && (
            <div
              style={{
                overflow: "scroll",
                height: "100vh",
                pointerEvents: "all",
              }}
            >
              <Break />

              <MainAnimations
                transition="0.5s"
                display="block"
                paddingBottom="2em"
                height="100%"
              >
                <ProjectInfo
                  description={description}
                  weblink={weblink}
                  contact={contact}
                />
                <br />
              </MainAnimations>
            </div>
          )}
        </Wrapper>
      </React.Fragment>
    )
  );
};

export default OrganizationDialog;
