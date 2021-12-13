/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
// Redux stuff
import { closeProject } from "../../../redux/actions/projectActions";
import { clearErrors } from "../../../redux/actions/errorsActions";
import {
  setMapBounds,
  setMapViewport,
} from "../../../redux/actions/mapActions";

//Components
import CalendarComponent from "../../atoms/calendar/CalendarComponent";

import IdeaList from "../SwipeLists/IdeaList";
import ProjectHeader from "../../molecules/Headers/ProjectHeader";
import ProjectInfo from "../../molecules/DialogInlineComponents/ProjectInfo";
import styled from "styled-components";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import OrganizationHeader from "../../molecules/Headers/OrganizationHeader";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 90;
  top: 0;
  position: fixed;
  pointer-events: none;

  @media (min-width: 768px) {
    margin-left: 0px;
    width: 400px;
    height: 100vh;
    padding-top: 70px;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
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
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);

  const { title, imgUrl } = organization;

  useEffect(() => {
    dispatch(handleTopicSelectorRedux("all"));
    setPath(window.location.pathname);
    console.log(organization);
  }, [openOrganization]);

  const handleClose = () => {
    dispatch(openOrganizationFunc(false));
    dispatch(clearErrors());
  };

  // const handleClick = (order) => {
  //   setOrder(order);

  //   if (order === 2) {
  //     window.scrollTo({
  //       top: 0,
  //       left: 0,
  //       behavior: "smooth",
  //     });
  //   }

  //   dispatch(clearErrors());
  // };

  // const handleDropdown = (value) => {
  //   setDropdown(value);
  // };

  // const dataRar = organization.projects;

  // const [searchTerm, setSearchTerm] = useState("");
  // const screamsSearched = dataRar?.filter((val) => {
  //   if (searchTerm === "") {
  //     return val;
  //   } else if (
  //     val.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     val.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     val.Stadtteil?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     val.Stadtbezirk?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     val.locationHeader?.toLowerCase().includes(searchTerm.toLowerCase())
  //   ) {
  //     return val;
  //   }
  // });

  // const sortedScreams =
  //   dropdown === "newest"
  //     ? _.orderBy(screamsSearched, "createdAt", "desc")
  //     : _.orderBy(screamsSearched, "likeCount", "desc");

  // const dataFinal = sortedScreams.filter(
  //   ({ Thema, status, lat, long }) =>
  //     selectedTopics.includes(Thema) &&
  //     lat <= mapBounds?.latitude1 &&
  //     lat >= mapBounds?.latitude2 &&
  //     long >= mapBounds?.longitude2 &&
  //     long <= mapBounds?.longitude3 &&
  //     status === "None"
  // );

  // const dataFinalLength = dataFinal.length;

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
          // handleClick={handleClick}
        />

        <Wrapper>
          {isMobileCustom && order !== 1 ? (
            <BackgroundMobile />
          ) : !isMobileCustom ? (
            <BackgroundDesktop />
          ) : null}
          {/* {order === 1 && (
            <IdeaList
              type="projectIdeas"
              loading={loading}
              order={order}
              dataFinal={dataFinal}
              dataFinalLength={dataFinalLength}
              geoData={geoData}
              viewport={viewport}
              handleDropdown={handleDropdown}
              projectsData={projectsData}
              loadingProjects={loadingProjects}
              project={organization}
              dropdown={dropdown}
              dataFinalMap={dataFinalMap}
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
                  startDate={startDate}
                  endDate={endDate}
                  owner={owner}
                />
                <br />
              </MainAnimations>
            </div>
          )} */}
        </Wrapper>
      </React.Fragment>
    )
  );
};

export default OrganizationDialog;
