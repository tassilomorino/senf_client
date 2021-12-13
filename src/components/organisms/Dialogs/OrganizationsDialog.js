/** @format */

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import styled from "styled-components";
import {
  openOrganizationsFunc,
  stateCreateOrganizationsFunc,
} from "../../../redux/actions/organizationActions";

//Components
import {
  BackgroundDesktop,
  BackgroundMobile,
} from "../../atoms/Backgrounds/GradientBackgrounds";
import { handleTopicSelectorRedux } from "../../../redux/actions/UiActions";

import _ from "lodash";
import { useTranslation } from "react-i18next";
import InfiniteScroll from "react-infinite-scroller";
import { OrganizationCard } from "../../molecules/Cards/OrganizationCard";
import {
  CustomButton,
  CustomIconButton,
} from "../../atoms/CustomButtons/CustomButton";
import CreateOrganizationDialog from "../CreateOrganization/CreateOrganizationDialog";
import OrganizationsToolbar from "../../molecules/Toolbar/OrganizationsToolbar";
import MainDialog from "../../atoms/Layout/MainDialog";
import HorizontalSwiper from "../SwipeLists/HorizontalSwiper";
const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 99;
  top: 0;
  position: fixed;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(254, 217, 87, 1) 6%,
    rgba(255, 218, 83, 1) 41%,
    rgba(255, 255, 255, 1) 100%
  );

  @media (min-width: 768px) {
    margin-left: 0px;
    width: 400px;
    height: 100vh;

    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
  }
`;

const InnerWrapper = styled.div`
  margin-top: 20px;
`;

const CoverWrapper = styled.div`
  margin-top: 0px;
  margin-left: 2.5%;
  width: 95%;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
`;

const Break = styled.div`
  position: relative;
  height: 110px;
  width: 100%;

  @media (min-width: 768px) {
    height: 30px;
  }
`;

const NoIdeasYet = styled.div`
  position: relative;
  font-size: 15pt;
  color: #414345;
  width: 80%;
  margin-left: 10%;
  text-align: center;
`;

const Title = styled.h2`
  font-family: PlayfairDisplay-Bold;
  font-size: 22px;
  font-weight: 100;
  color: #353535;
  align-self: center;
  margin-top: 10px;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 32px;
  }
`;

const OrganizationsDialog = ({ dataFinalMap }) => {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);

  const mapViewport = useSelector((state) => state.data.mapViewport);
  const mapBounds = useSelector((state) => state.data.mapBounds);
  const selectedTopics = useSelector((state) => state.data.topics);
  const organizations = useSelector((state) => state.data.organizations);
  // const user = useSelector((state) => state.user);
  const loadingOrganizations = useSelector(
    (state) => state.data.loadingOrganizations
  );

  // const prevdataFinalLength = usePrevious({ dataFinalLength });
  // const prevDropdown = usePrevious({ dropdown });

  const [dropdown, setDropdown] = useState("newest");
  const [order, setOrder] = useState(1);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openOrganizationsFunc(false));
  };

  const handleClick = (order) => {
    setOrder(order);
  };

  const handleDropdown = (value) => {
    setDropdown(value);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const organizationsSearched = organizations?.filter((val) => {
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

  const sortedOrganizations =
    dropdown === "newest"
      ? _.orderBy(organizationsSearched, "createdAt", "desc")
      : _.orderBy(organizationsSearched, "likeCount", "desc");

  const dataFinal = sortedOrganizations;
  // ? sortedOrganizations.filter(
  //  ({ Thema, status, lat, long }) => selectedTopics.includes(Thema)

  //   && lat <= mapBounds?.latitude1 &&
  //   lat >= mapBounds?.latitude2 &&
  //   long >= mapBounds?.longitude2 &&
  //   long <= mapBounds?.longitude3 &&
  //   status === "None"
  //   )
  // : [];

  const dataFinalLength = dataFinal.length;

  useEffect(() => {
    if (!loadingOrganizations) {
      const element = document.getElementById("List");
      element?.scrollTo({
        top: 0,
        left: 0,
      });

      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loadingOrganizations]);
  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (organizations) => {
    var items = [];
    if (organizations.length !== 0) {
      for (var i = 0; i < listItems; i++) {
        items.push(
          organizations[i]?.organizationId && (
            <OrganizationCard
              key={organizations[i]?.organizationId}
              organization={organizations[i]}
            />
          )
        );
      }
      return items;
    }
  };

  const loadMore = () => {
    if (!loadingOrganizations && dataFinal.length === 0) {
      sethasMoreItems(false);
    }

    if (listItems === dataFinal.length) {
      sethasMoreItems(false);
    } else {
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
      }, 100);
    }
  };

  console.log(dataFinal, organizations);

  return (
    <Wrapper>
      <CustomIconButton
        name="ArrowLeft"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "10px" : "10px"}
        left={document.body.clientWidth > 768 ? "200px" : "0"}
        handleButtonClick={handleClose}
      />

      <OrganizationsToolbar
        loading={loadingOrganizations}
        handleDropdown={handleDropdown}
        dataFinalLength={dataFinalLength}
        setSearchOpen={setSearchOpen}
        searchOpen={searchOpen}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      <InnerWrapper>
        {!loadingOrganizations ? (
          <InfiniteScroll
            loadMore={() => loadMore()}
            hasMore={hasMoreItems}
            useWindow={false}
          >
            <CoverWrapper>{showItems(dataFinal)}</CoverWrapper>
          </InfiniteScroll>
        ) : (
          <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default OrganizationsDialog;
