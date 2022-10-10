/** @format */
import React, { FC, useState, memo, useEffect } from "react";

import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { ThreeDToolSwipeListProps } from "./ThreeDToolSwipeListProps.types";

import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import theme from "../../../styles/theme";
import Wave from "../../atoms/shapes/Wave";
import List from "../../molecules/list/List";
import MenuSidebar from "../../organisms/menuSidebar/MenuSidebar";
import ObjectCard from "../../molecules/cards/ObjectCard";
import Input from "../../atoms/inputs/Input";
import { Search, Arrow, Plus } from "../../../assets/icons";
// import Search from "./Search";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ModalButton from "../../molecules/modalStack/ModalButton";
import ImageUploadTile from "../../atoms/imageUploadTile/ImageUploadTile";
import Typography from "../../atoms/typography/Typography";
import HorizontalSwiper from "../../organisms/horizontalSwiper/HorizontalSwiper";
import Divider from "../../atoms/divider/Divider";
import TextTransition from "../../atoms/animations/TextTransition";
import AddModel from "./AddModel";

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

    width: ${({ swipedUp }) => (swipedUp ? "466px" : "65px")};
    transition: 0.3s;
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
  height: calc(100vh - 120px);
  width: 100%;
  z-index: 1;
  margin-left: 50%;
  transform: translateX(-50%);
  position: fixed;
  margin-top: -10px;
  padding-top: 50px;
  top: ${({ swipedUp }) => swipedUp && "110px"};

  @media (min-width: 768px) {
    height: calc(100% - 150px);
    padding-top: 20px;
    width: 400px;
    position: relative;
    top: 0;
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
  setSearchTerm,
  swipedUp,
  setSwipedUp,
  handleOpenMyAccount,
  setShowUI,
  uploadedImage,
  handleImageUpload,
  uploadedModel,
  handleModelUpload,

  handleSubmit,
  grounds,
  setMode,
  formik: initial,
  validationSchema,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom();
  const [showResults, setShowResults] = useState(false);
  const [swipePercentage, setSwipePercentage] = useState(0);

  const [springProps, setSpring] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    transform: `translateY(${window.innerHeight}px)`,
    overflow: "visible",
    touchAction: "none",
    userSelect: "none",
  }));

  const formik = useFormik({ initialValues: initial, validationSchema });
  useEffect(() => initial.setValues(formik.values), [formik.values]);

  useEffect(() => {
    if (swipedUp) {
      setSpring({
        transform: `translateY(${16}px)`,
        touchAction: "unset",
      });
    } else {
      setSpring({
        transform: `translateY(${window.innerHeight}px)`,
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
          transform: `translateY(${window.innerHeight}px)`,
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
        style={isMobile ? springProps : null}
      >
        <Wave
          color={theme.colors.beige.beige20}
          top="0px"
        />
        {!isMobile && (
          <MenuSidebar
            handleOpenMyAccount={handleOpenMyAccount}
            setShowUI={true}
            setOrder={() => console.log("hi")}
          />
        )}

        <InnerWrapper>
          <Header {...bind()}>
            {isMobile && <HandleBar />}

            <Box
              margin="30px 10px 0px 10px"
              flexDirection="column"
              gap="10px"
            >
              <Box
                margin="0px 10px"
                flexDirection="column"
              >
                <Box>
                  <Typography
                    variant="h3"
                    textAlign="left"
                    fontWeight={900}
                  >
                    Finde den richtigen
                  </Typography>
                  <TextTransition
                    variant="h3"
                    fontWeight={900}
                  />
                </Box>
                <Typography
                  variant="h3"
                  textAlign="left"
                  fontWeight={900}
                >
                  {" "}
                  für deinen Entwurf{" "}
                </Typography>
              </Box>

              <Input
                name="searchAddress"
                type="search"
                leadingIcon={
                  showResults ? <Arrow transform="rotate(180)" /> : <Search />
                }
                leadingIconClick={() => {
                  setSearchTerm("");
                  setShowResults(false);
                }}
                placeholder={"Suche"}
                onChange={(event) => setSearchTerm(event?.target?.value)}
                value={searchTerm}
                onClick={() => setShowResults(true)}
              />
            </Box>
          </Header>

          <ContentWrapper swipedUp={swipedUp}>
            {showResults && searchTerm ? (
              <List
                listType="grid"
                CardType={ObjectCard}
                data={data}
                handleButtonOpenCard={handlePlaceModel}
                loading={false}
              />
            ) : (
              <React.Fragment>
                <Divider
                  margin="50px 80px"
                  width="calc(100% - 160px)"
                  height="2px"
                />
                <Box
                  margin="0px 10px"
                  gap="20px"
                  flexDirection="column"
                  overflow="hidden"
                  height="260px"
                >
                  <HorizontalSwiper
                    data={grounds}
                    handleButtonOpenCard={(item) =>
                      setMode({ mode: "draw", drawType: item.drawType })
                    }
                  />
                  {/* <Box position="absolute" width="auto" marginTop="30px">
                    {grounds?.map((item, index) => (
                      <ObjectCard data={item} handleButtonOpenCard={() => setMode({ mode: "draw", drawType: item.drawType, drawStyle: item.drawStyle })} />
                    ))}
                  </Box> */}
                </Box>

                <Box
                  margin="10px"
                  gap="20px"
                  flexDirection="column"
                  position="absolute"
                  bottom="10px"
                  width="calc(100% - 20px)"
                >
                  <Typography
                    variant="buttonBg"
                    textAlign="center"
                  >
                    Du hast eigene Modelle?
                  </Typography>
                  <ModalButton
                    variant="primary"
                    leadingIcon="Plus"
                    text="3D Modell hochladen"
                    width="max"
                    options={{
                      style: {
                        padding: 20,
                      },
                      title: t("add_model"),
                      swipe: isMobile && true,
                    }}
                  >
                    <AddModel
                      uploadedImage={uploadedImage}
                      handleImageUpload={handleImageUpload}
                      uploadedModel={uploadedModel}
                      handleModelUpload={handleModelUpload}
                      handleSubmit={handleSubmit}
                      formik={formik}
                      validationSchema={validationSchema}
                    />
                  </ModalButton>
                </Box>
              </React.Fragment>
            )}
          </ContentWrapper>
        </InnerWrapper>
      </DragWrapper>
    </React.Fragment>
  );
};

export default memo(ThreeDToolSwipeList);
