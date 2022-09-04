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
import { Arrow, Plus, Search } from "../../../assets/icons";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ModalButton from "../../molecules/modalStack/ModalButton";
import ImageUploadTile from "../../atoms/imageUploadTile/ImageUploadTile";
import Typography from "../../atoms/typography/Typography";
import HorizontalSwiper from "../../organisms/horizontalSwiper/HorizontalSwiper";

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
  setSearchTerm,
  swipedUp,
  setSwipedUp,
  handleOpenMyAccount,
  setShowUI,
  formik,
  uploadedImage,
  handleImageUpload,
  uploadingImage,
  handleSubmit,
  grounds,
  setMode,
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
        style={isMobile
          ? springProps
          : null
        }
      >
        <Wave color={theme.colors.beige.beige20} top="0px" />
        {!isMobile && (
          <MenuSidebar
            handleOpenMyAccount={() => console.log("hi")}
            setShowUI={true}
            setOrder={() => console.log("hi")}
          />

        )}

        <InnerWrapper>
          <Header
            {...bind()}
          >
            {isMobile && <HandleBar />}

            <Box margin="30px 10px" flexDirection="column" gap="10px">
              <Typography variant="buttonBg" textAlign="center">Suche nach Objekten für deinen Entwurf</Typography>

              <Input
                name="searchAddress"
                type="search"
                leadingIcon={showResults ? <Arrow transform="rotate(180deg)" /> : <Search />}
                leadingIconClick={() => { setSearchTerm(""); setShowResults(false) }}
                placeholder={"searchObjects"}
                onChange={(event) => setSearchTerm(event?.target?.value)}
                value={searchTerm}
                onClick={() => setShowResults(true)
                }
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
            ) :
              <React.Fragment>

                <Box margin="40px 10px" gap="20px" flexDirection="column" overflow="hidden" height="260px">


                  <HorizontalSwiper data={grounds} handleButtonOpenCard={(item) => setMode({ mode: "draw", drawType: item.drawType, drawStyle: item.drawStyle })} />
                  {/* <Box position="absolute" width="auto" marginTop="30px">
                    {grounds?.map((item, index) => (
                      <ObjectCard data={item} handleButtonOpenCard={() => setMode({ mode: "draw", drawType: item.drawType, drawStyle: item.drawStyle })} />
                    ))}
                  </Box> */}
                </Box>


                <Box margin="10px" gap="20px" flexDirection="column" position="absolute" bottom="20px" width="calc(100% - 20px)">
                  <Typography variant="buttonBg" textAlign="center">Du hast eigene Modelle?</Typography>
                  <ModalButton variant="primary" icon={<Plus />} text="3D Modell hochladen" fillWidth="max" options={{
                    padding: 20,
                    title: t("add_model"),
                    swipe: isMobile && true,

                  }}>
                    <Box flexDirection="column" gap="20px">
                      <Input
                        name="title"
                        type="text"
                        placeholder={t("add_title")}
                        label={t("title")}
                        onChange={formik?.handleChange}
                        onBlur={formik?.handleBlur}
                        value={formik?.values.title}
                      />
                      <Box gap="20px">
                        <ImageUploadTile
                          photoURL={uploadedImage}
                          uploadingImage={uploadingImage}
                          handleImageUpload={handleImageUpload}
                        />
                        <ImageUploadTile
                          photoURL={uploadedImage}
                          uploadingImage={uploadingImage}
                          handleImageUpload={handleImageUpload}
                        />
                      </Box>


                      <Button
                        text="add model"

                        onClick={handleSubmit}
                        disabled={!formik?.isValid}
                      />
                    </Box>
                  </ModalButton>
                </Box>


              </React.Fragment>



            }


          </ContentWrapper>
        </InnerWrapper>
      </DragWrapper>
    </React.Fragment>
  );
};

export default memo(ThreeDToolSwipeList);
