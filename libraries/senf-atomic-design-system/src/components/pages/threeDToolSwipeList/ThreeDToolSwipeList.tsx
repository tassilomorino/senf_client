/** @format */
import React, { FC, useState, memo, useEffect } from "react";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { ThreeDToolSwipeListProps } from "./ThreeDToolSwipeListProps.types";

import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import theme from "../../../styles/theme";
import Wave from "../../atoms/shapes/Wave";
import List from "../../molecules/list/List";
import MenuSidebar from "../../organisms/menuSidebar/MenuSidebar";
import ObjectCard from "../../molecules/cards/ObjectCard";
import Input from "../../atoms/inputs/Input";
import { Arrow, Search } from "../../../assets/icons";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";

const DragWrapper = styled(animated.div)`
  z-index: ${({ zIndex }) => zIndex || 2};
  overscroll-behavior: contain;
  overflow-x: hidden;
  width: 100%;
  height: 100%;
  left: 0px;
  overflow: ${({ overflow }) => overflow || "scroll"};
  background-color: ${({ theme }) => theme.colors.primary.primary100};
  border-radius: ${({ theme }) => theme.radii[5]}px
    ${({ theme }) => theme.radii[5]}px 0px 0px;
  box-shadow: ${({ theme }) => theme.shadows[0]}
    ${({ theme }) => theme.colors.brown.brown20tra};

  position: absolute;
  pointer-events: all;
  

  /* transform: scale(0.9) translateY(-20px); */
  @media (min-width: 768px) {
    width: 466px;
    max-width: 466px;
    border-radius: 18px;
    margin: 10px;
    height: calc(100vh - 20px);
    overflow: hidden;

    width: ${({ swipedUp }) => swipedUp ? "466px" : "65px"};
    transition:0.3s;
  }
`;

const InnerWrapper = styled.div<OrganizationsOverviewProps>`
  @media (min-width: 768px) {
    padding-left: 66px;
    height: 100%;

    position: absolute;
  }
`;

const ContentWrapper = styled.div<OrganizationsOverviewProps>`
  overflow-y: scroll;
  pointer-events: all;
  height: calc(100vh - 110px);
  width: 100%;
  z-index: 1;
  margin-left: 50%;
  transform: translateX(-50%);
  position: fixed;
  top: ${({ swipedUp }) => swipedUp && "110px"};

  @media (min-width: 768px) {
    height: calc(100% - 50px);
    width: 400px;
    position: relative;
    top: 0;
  }
`;

const RoundedButtonWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 299;
  transition: 0.5s;

  @media (min-width: 768px) {
    top: 20px;
    right: 17px;
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

// const ToolbarWrapper = styled.div`
//   margin-top: ${({ swipedUp }) => (swipedUp ? "16px" : "-46px")};
//   transition: 0.5s;
//   margin-left: 12px;
//   width: calc(100% - 24px);
//   overflow-y: hidden;
//   z-index: 9;
// `;

const HandleBar = styled.div`
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 99;
  width: 50px;
  height: 5px;
  background-color: ${({ theme }) => theme.colors.primary.primary120};
  border-radius: 5px;
`;

const ThreeDToolSwipeList: FC<ThreeDToolSwipeListProps> = ({
  data,
  handlePlaceModel,
  searchTerm,
  handleSearch,
  swipedUp,
  setSwipedUp,
  handleOpenMyAccount,
  setShowUI,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [swipePercentage, setSwipePercentage] = useState(0);

  const [springProps, setSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight - 100}px)`,
    overflow: "visible",
    touchAction: "none",
    userSelect: "none",
  }));







  useEffect(() => {
    if (swipedUp) {
      setSpring({
        transform: `translateY(${16}px)`,
        touchAction: "unset",
      });
    } else {
      setSpring({
        transform: `translateY(${window.innerHeight - 100}px)`,
        touchAction: "unset",
      });

    }
  }, [swipedUp]);

  const bind = useDrag(
    ({ last, down, movement: [, my], offset: [, y] }) => {
      setSpring({
        transition: "0s",
      });
      if (last && my > 50) {
        setSpring({
          transform: `translateY(${window.innerHeight - 100}px)`,
          touchAction: "none",
        });
        setSwipedUp(false);
        // setSearchOpen(false);
      }

      if (last && my < -50) {
        setSpring({
          transform: `translateY(${16}px)`,
          touchAction: "unset",
        });

        setSwipedUp(true);
      }
      setSwipePercentage(Math.abs(my) / (window.innerHeight - 190));
      setSpring({ y: down ? my : 0 });
    },
    {
      pointer: { touch: true },
      bounds: {
        enabled: true,
      },
    }
  );






  return (
    <React.Fragment>
      <DragWrapper
        swipedUp={swipedUp}
        style={isMobile
          ? springProps
          : null
        }
      >
        <Wave color={theme.colors.beige.beige20} top="0px" />
        {!isMobile && (
          <React.Fragment>
            <MenuSidebar
              handleOpenMyAccount={() => console.log("hi")}
              setShowUI={true}
              setOrder={() => console.log("hi")}
            />
            <Box position="fixed" left={swipedUp ? "466px" : "50px"} top="50vh" transform="translateY(-50%)" transition="0.3s" zIndex={5}>
              <Button size="big" variant={swipedUp ? "white" : "primary"} icon={<Arrow transform={swipedUp ? "rotate(180)" : "rotate(0)"} />} onClick={() => setSwipedUp(!swipedUp)} />
            </Box>
          </React.Fragment>
        )}

        <InnerWrapper>
          <Header
            {...bind()}
          >
            {isMobile && <HandleBar />}

            <Box margin="30px 10px" >
              <Input
                name="searchAddress"
                type="search"
                leadingIcon={<Search />}
                placeholder={"searchObjects"}
                onChange={(event) => handleSearch(event?.target?.value)}
                value={searchTerm}
                onClick={() => setSwipedUp(true)
                }
              />
            </Box>
            {/* <RoundedButtonWrapper>
              <RoundedButton
                size="big"
                icon={
                  <Plus
                    color={theme.colors.primary.primary120}
                    transform="scale(2)"
                  />
                }
                onClick={() => setPostIdeaOpen(true)}
              />
            </RoundedButtonWrapper> */}

          </Header>
          <ContentWrapper swipedUp={swipedUp}>

            {data?.length > 0 && (
              <List
                listType="grid"
                CardType={ObjectCard}
                data={data}
                handleButtonOpenCard={handlePlaceModel}
                loading={false}
              />
            )}
          </ContentWrapper>
        </InnerWrapper>
      </DragWrapper>
    </React.Fragment>
  );
};

export default memo(ThreeDToolSwipeList);
