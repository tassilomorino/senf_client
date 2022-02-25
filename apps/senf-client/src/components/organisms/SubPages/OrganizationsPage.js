/** @format */

import React, { useState, useEffect, useMemo } from "react";
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
import { Covers, CoverWrapper, Wrapper } from "./styles/sharedStyles";
import { TagsFilter } from "../../molecules/Filters/TagsFilter";
import { MenuData } from "../../../data/MenuData";
import { StyledH2 } from "../../../styles/GlobalStyle";
import Tabs from "../../atoms/Tabs/Tabs";
import { usePrevious } from "apps/senf-client/src/hooks/usePrevious";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import NewButton from "../../atoms/CustomButtons/NewButton";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";

const DragWrapper = styled(animated.div)`
  overscroll-behavior: contain;
  overflow-x: hidden;

  width: 100%;
  height: 100%;
  background: rgb(254, 217, 87);
  background: linear-gradient(
    180deg,
    rgba(254, 217, 87, 1) 0%,
    rgba(255, 218, 83, 1) 50%,
    rgba(255, 255, 255, 1) 100%
  );
  border-radius: 20px;
  position: absolute;
  z-index: 995;
  animation: organizationOverviewEnterAnimation 0.5s;

  @media (min-width: 768px) {
    width: 400px;
    animation: none;
    border-radius: 0px;
  }
`;

const ClickBackground = styled.div`
  width: 100%;
  height: 100%;
  left: 0;
  position: fixed;
  z-index: 994;
  pointer-events: auto;
  top: 0;
`;

const InnerWrapper = styled.div`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100% - 120px);
  width: 100%;
  margin-top: ${(props) => (props.isMobileCustom ? "0px" : "0px")};
  overflow: scroll;
  background-color: #ffe898;

  justify-content: center;
  position: relative;
  @media (min-width: 768px) {
    display: flex;
    height: calc(100% - 140px);
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  padding-bottom: 200px;
`;

const HeaderWrapper = styled(animated.div)`
  position: sticky;
  width: 100%;
  top: 20px;
  background-color: #fed957;
  z-index: 25;
  height: 100px;
  @media (min-width: 768px) {
    width: 600px;
    height: 120px;
    margin-left: 50%;
    transform: translateX(-50%);
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

const ButtonWrapper = styled.div`
  width: calc(100% - 20px);
  margin: 0px 10px;

  @media (min-width: 768px) {
    width: 300px;
    position: fixed;
    top: 55px;
    right: 60px;
  }
`;

const OrganizationsPage = ({
  setOpenOrganizationsPage,
  order,
  loading,
  dataFinal,
  dropdown,
  handleDropdown,
  setDropdown,
  searchTerm,
  setSearchTerm,
}) => {
  const { t } = useTranslation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    setOpen(true);
  }, []);

  const [props, set] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${30}px)`,
    overflow: "hidden",
    touchAction: "none",
    userSelect: "none",
  }));

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      if (last && my > 50) {
        set({
          transform: `translateY(${window.innerHeight}px)`,
          touchAction: "none",
        });

        setTimeout(() => {
          setOpenOrganizationsPage(false);
        }, 150);
        setTimeout(() => {
          set({
            transform: `translateY(${30}px)`,
            touchAction: "none",
          });
        }, 300);
      }

      set({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
      },
    }
  );

  const setClose = () => {
    set({
      transform: `translateY(${window.innerHeight}px)`,
      touchAction: "none",
    });
    setTimeout(() => {
      setOpenOrganizationsPage(false);
    }, 150);
  };

  const dataFinalLength = dataFinal.length;
  const prevdataFinalLength = usePrevious({ dataFinalLength });
  const prevDropdown = usePrevious({ dropdown });

  useEffect(() => {
    if (
      (dataFinalLength &&
        prevdataFinalLength &&
        prevdataFinalLength.dataFinalLength !== dataFinalLength) ||
      (dropdown && prevDropdown && prevDropdown.dropdown !== dropdown)
    ) {
      console.log(dataFinalLength);
      setListItems(1);
      sethasMoreItems(true);
    }
  }, [loading, dropdown, dataFinalLength]);

  const itemsPerPage = 1;
  const [hasMoreItems, sethasMoreItems] = useState(true);
  const [listItems, setListItems] = useState(itemsPerPage);

  const showItems = (dataFinal) => {
    var items = [];
    if (dataFinalLength !== 0) {
      for (var i = 0; i < listItems; i++) {
        items.push(
          dataFinal[i]?.organizationId && (
            <OrganizationCard
              key={dataFinal[i]?.organizationId}
              organization={dataFinal[i]}
            />
          )
        );
      }
      return items;
    }
  };

  const loadMore = () => {
    console.log(listItems, dataFinal.length);
    if (
      !dataFinal ||
      dataFinal.length === 0 ||
      listItems === dataFinal.length
    ) {
      sethasMoreItems(false);
    } else {
      console.log(listItems);
      setTimeout(() => {
        setListItems(listItems + itemsPerPage);
      }, 100);
    }
  };

  const openCreateOrganization = () => {
    dispatch(stateCreateOrganizationsFunc(true));
  };

  return !loading && isMobileCustom ? (
    <React.Fragment>
      <ClickBackground onClick={setClose} />

      <DragWrapper className={!loading ? "" : "drag_hide"} style={props}>
        <HeaderWrapper {...bind()}>
          <CustomIconButton
            name="ArrowDown"
            position="fixed"
            margin="-10px 0px"
            backgroundColor="transparent"
            shadow={false}
            handleButtonClick={setClose}
            zIndex={99}
          />

          <Tabs
            loading={false}
            order={1}
            tabLabels={MenuData.map((item) => item.text).slice(2, 3)}
            marginTop={"20px"}
            marginBottom={"20px"}
          />

          {isMobileCustom && (
            <TagsFilter
              placing="list"
              type={order === 1 ? "topics" : "organizationType"}
            />
          )}

          {!isMobileCustom && (
            <Toolbar
              swipeListType="organizationOverview"
              marginTop="0px"
              loading={loading}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dataFinalLength={dataFinalLength}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}
        </HeaderWrapper>
        <InnerWrapper isMobileCustom={isMobileCustom}>
          {isMobileCustom && (
            <Toolbar
              swipeListType="organizationOverview"
              type="standalone"
              loading={loading}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dataFinalLength={dataFinalLength}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}

          <ButtonWrapper>
            <NewButton
              borderType="dashed"
              handleButtonClick={
                user.authenticated
                  ? openCreateOrganization
                  : () =>
                      alert("bitte melde dich erst mit deinem Senf-Profil an")
              }
            >
              Organisationsprofil anlegen
            </NewButton>
          </ButtonWrapper>

          <FlexWrapper isMobileCustom={isMobileCustom}>
            {!loading ? (
              <InfiniteScroll
                loadMore={() => loadMore()}
                hasMore={hasMoreItems}
                // loader={<SkeletonCard dataFinalLength={dataFinalLength === 0} />}
                useWindow={false}
              >
                {showItems(dataFinal)}
              </InfiniteScroll>
            ) : (
              <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
            )}
          </FlexWrapper>
        </InnerWrapper>
      </DragWrapper>
    </React.Fragment>
  ) : (
    !loading && (
      <Wrapper order={open}>
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          margin="10px"
          backgroundColor="#FFF0BC"
          handleButtonClick={() => setOpenOrganizationsPage(false)}
          zIndex={99}
        />

        <HeaderWrapper>
          <Tabs
            loading={false}
            order={1}
            tabLabels={MenuData.map((item) => item.text).slice(2, 3)}
            marginTop={"20px"}
            marginBottom={"20px"}
          />

          {isMobileCustom && (
            <TagsFilter
              placing="list"
              type={order === 1 ? "topics" : "organizationType"}
            />
          )}

          {!isMobileCustom && (
            <Toolbar
              swipeListType="organizationOverview"
              marginTop="0px"
              loading={loading}
              handleDropdown={handleDropdown}
              dropdown={dropdown}
              dataFinalLength={dataFinalLength}
              setSearchOpen={setSearchOpen}
              searchOpen={searchOpen}
              setSearchTerm={setSearchTerm}
              searchTerm={searchTerm}
            />
          )}
          <ButtonWrapper>
            <NewButton
              borderType="dashed"
              handleButtonClick={
                user.authenticated
                  ? openCreateOrganization
                  : () =>
                      alert("bitte melde dich erst mit deinem Senf-Profil an")
              }
            >
              Organisationsprofil anlegen
            </NewButton>
          </ButtonWrapper>
        </HeaderWrapper>
        <InnerWrapper isMobileCustom={isMobileCustom}>
          {!loading ? (
            <InfiniteScroll
              loadMore={() => loadMore()}
              hasMore={hasMoreItems}
              // loader={<SkeletonCard dataFinalLength={dataFinalLength === 0} />}
              useWindow={false}
            >
              {showItems(dataFinal)}
            </InfiniteScroll>
          ) : (
            <NoIdeasYet>{t("projectrooms_loader")}</NoIdeasYet>
          )}
        </InnerWrapper>
      </Wrapper>
    )
  );
};

export default OrganizationsPage;
