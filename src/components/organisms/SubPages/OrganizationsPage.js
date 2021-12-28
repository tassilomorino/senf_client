/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import firebase from "firebase/app";
import "firebase/firestore";
import MainAnimations from "../../atoms/Backgrounds/MainAnimations";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import ExpandButton from "../../atoms/CustomButtons/ExpandButton";
import { OrganizationCard } from "../../molecules/Cards/OrganizationCard";
import { openOrganizationFunc } from "../../../redux/actions/organizationActions";
import InfiniteScroll from "react-infinite-scroller";
import Toolbar from "../../molecules/Toolbar/Toolbar";
import { Background } from "../../atoms/Backgrounds/GradientBackgrounds";
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import { isMobileCustom } from "../../../util/customDeviceDetect";

const Wrapper = styled.div`
  width: 100vw;
  height: 100%;
  margin-top: 0vh;
  z-index: 99;
  top: 0;
  position: fixed;
  pointer-events: all;

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
    margin-left: 200px;
    width: 400px;
    height: 100vh;
    overflow-y: scroll;
    z-index: 90;
    top: 0;
    position: fixed;
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
const InnerWrapper = styled.div`
  margin-top: ${(props) => (props.isMobileCustom ? "10px" : "120px")};
  pointer-events: all;
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

const OrganizationsPage = ({ handleClick }) => {
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
  const dispatch = useDispatch();

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

  return (
    <Wrapper>
      {isMobileCustom && (
        <CustomIconButton
          name="ArrowLeft"
          position="relative"
          margin="10px"
          backgroundColor="#FFF0BC"
          handleButtonClick={() => handleClick(2)}
        />
      )}
      <Toolbar
        swipeListType="organizationOverview"
        type="standalone"
        loading={loadingOrganizations}
        handleDropdown={handleDropdown}
        dataFinalLength={dataFinalLength}
        setSearchOpen={setSearchOpen}
        searchOpen={searchOpen}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      <InnerWrapper isMobileCustom={isMobileCustom}>
        {!loadingOrganizations ? (
          <InfiniteScroll
            loadMore={() => loadMore()}
            hasMore={hasMoreItems}
            useWindow={false}
          >
            {showItems(dataFinal)}
          </InfiniteScroll>
        ) : (
          <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
        )}
      </InnerWrapper>
    </Wrapper>
  );
};

export default OrganizationsPage;
