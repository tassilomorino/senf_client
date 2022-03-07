/** @format */

import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

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
  border-radius: 24px;
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
  z-index: 1;
  margin-left: 50%;
  padding-bottom: 200px;
  transform: translateX(-50%);
  width: calc(100% - 20px);
  max-width: 800px;
  display: grid;
  display: flex;
  flex-direction: column;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 10px 10px;
  grid-template-areas:
    ". ."
    ". .";
  @media (min-width: 768px) {
    margin-top: 50px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  @media (min-width: 1068px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  padding-bottom: 200px;
`;

const SVGWrapper = styled.div`
  background-color: rgb(249, 241, 215);
  height: 150px;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 2;
`;
const HeaderWrapper = styled(animated.div)`
  position: sticky;
  width: 100%;
  top: 20px;
  background-color: #fed957;
  z-index: 25;
  height: 100px;
  @media (min-width: 768px) {
    position: absolute;

    width: 600px;
    height: 120px;
    margin-left: 50%;
    top: 0;
    transform: translateX(-50%);
    background-color: transparent;
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
    top: 102px;
    right: 60px;
  }
`;
const TabsWrapper = styled.div`
  margin-left: 20px;
`;

const HandleBar = styled.div`
  width: 50px;
  height: 2px;
  background-color: #f2c71c;
  overflow: visible;
  border-radius: 1px;
  margin-top: 8px;
  margin-left: 50%;
  transform: translateX(-50%);
  position: absolute;
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
    // window.history.pushState(null, null, "/organizations");
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
          window.history.pushState(null, null, "/projectRooms");
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
      window.history.pushState(null, null, "/projectRooms");

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

  const openRequestOrganization = () => {
    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Anfrage: Anlegen eines Organisationsprofils");

    window.location.href = link;
  };
  return !loading && isMobileCustom ? (
    <React.Fragment>
      <ClickBackground onClick={setClose} />

      <DragWrapper className={!loading ? "" : "drag_hide"} style={props}>
        <HandleBar />
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
          <TabsWrapper>
            <Tabs
              loading={false}
              order={1}
              tabLabels={MenuData.map((item) => item.text).slice(2, 3)}
              marginTop={"20px"}
              marginBottom={"20px"}
            />
          </TabsWrapper>

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
          {user.handle === "Senf.koeln" && (
            <ButtonWrapper>
              <NewButton
                borderType="dashed"
                handleButtonClick={
                  user.authenticated && user.handle === "Senf.koeln"
                    ? openCreateOrganization
                    : openRequestOrganization
                }
              >
                Organisationsprofil anlegen
              </NewButton>
            </ButtonWrapper>
          )}

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
        <SVGWrapper>
          <HeaderWrapper>
            <Tabs
              loading={false}
              order={1}
              tabLabels={MenuData.map((item) => item.text).slice(2, 3)}
              marginTop={"20px"}
              marginBottom={"40px"}
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
                  user.authenticated && user.handle === "Senf.koeln"
                    ? openCreateOrganization
                    : openRequestOrganization
                }
              >
                Organisationsprofil anlegen
              </NewButton>
            </ButtonWrapper>
          </HeaderWrapper>
          <svg
            width="100%"
            height="126"
            viewBox="0 0 1100 126"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
              fill="#FED957"
            />
          </svg>
        </SVGWrapper>

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
