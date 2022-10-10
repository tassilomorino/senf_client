/** @format */

import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import Typography from "../../atoms/typography/Typography";
import PostIdeaForm from "./PostIdeaForm";
import { LayerWhiteFirstDefault } from "../../atoms/layerStyles/LayerStyles";
import Geocoder from "../../atoms/geocoder/Geocoder";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import { Arrow, Close } from "../../../assets/icons";
import SwipeModal from "../../molecules/modals/SwipeModal";
import { useModals } from "../../molecules/modalStack/ModalProvider";
import DropdownButton from "../../atoms/contentDropdown/DropdownButton";
import List from "../../molecules/list/List";
import ProjectroomCard from "../../molecules/cards/ProjectroomCard";
import PostIdeaSuccess from "../../organisms/modalContents/success/PostIdeaSuccess";
import DiscardModalContent from "../../organisms/modalContents/discard/DiscardModalContent";

const Wrapper = styled.div`
  z-index: 999;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => "22px 0px 0px 95px"};

  width: 366px;
  height: auto;
  /* overflow-y: scroll; */
  border-radius: 24px;
  /* padding: 0px 16px 16px 16px; */
  ${() => LayerWhiteFirstDefault};
`;
const ProjectroomsWrapper = styled.div`
  z-index: 99;
  position: relative;
  left: 80px;
  width: 400px;
  height: calc(100vh - 250px);
  overflow: scroll;
`;

const StyledMobileHeaders = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 16px 16px 24px;
  z-index: 999;
  position: fixed;
  bottom: 0;
  ${() => LayerWhiteFirstDefault};
`;
const Background = styled.div`
  ${() => LayerWhiteFirstDefault};
`;

const PostIdea: FC<PostIdeaProps> = ({
  formik,
  statefulMap,
  checkIfCalendar,
  selectedDays,
  handleChangeCalendar,
  handleSubmit,
  loading,
  Out,
  setPostIdeaOpen,
  postIdeaSuccessModalOpen,
  setPostIdeaSuccessModalOpen,
  navigate,
  newIdea,
  projectroomsData,
  projectroomSelected,
  setProjectroomSelected,
  handleSelectProjectroom,
}) => {
  const { t } = useTranslation();
  const [postIdeaForm, setPostIdeaForm] = React.useState(false);
  const [showProjectrooms, setShowProjectrooms] = React.useState(false);

  const [addressSelected, setAddressSelected] = React.useState(false);
  const isMobile = isMobileCustom();
  const { openModal, closeModal } = useModals();
  const createIdeaHeader = (
    <Box
      flexDirection="row"
      alignItems="center"
      width="100%"
      justifyContent="space-between"
    >
      <Typography variant="h3">{t("postidea_create_idea")}</Typography>
      {!isMobile && (
        <Button
          variant="tertiary"
          size="small"
          text={t("cancel")}
          justifyContent="flex-start"
          onClick={() => setPostIdeaOpen(false)}
        />
      )}
    </Box>
  );

  const InstructionsHeader = (
    <Box
      display="flex"
      gap="16px"
      flexDirection="column"
      width="100%"
      height="auto"
    >
      <Typography variant="bodyBg">{t("postidea_navigate")}</Typography>
      {projectroomSelected && (
        <Typography variant="buttonBg"> 1 Projektraum ausgewählt</Typography>
      )}
      {!isMobile && (
        <Geocoder
          formik={formik}
          statefulMap={statefulMap}
        />
      )}

      {!isMobile && formik?.values.address && formik?.values.address !== "" && (
        <Button
          variant="primary"
          size="lg"
          text={t("next")}
          width="max"
          onClick={() => setAddressSelected(true)}
        ></Button>
      )}
    </Box>
  );
  useEffect(() => {
    if (postIdeaSuccessModalOpen) {
      openModal(
        <PostIdeaSuccess
          navigate={navigate}
          setPostIdeaSuccessModalOpen={setPostIdeaSuccessModalOpen}
          setPostIdeaOpen={setPostIdeaOpen}
          newIdea={newIdea}
          closeModal={closeModal}
        />,
        {
          swipe: !!isMobile,

          afterClose: () => {
            setPostIdeaSuccessModalOpen(false);
            setPostIdeaOpen(false);
          },
        }
      );
    }
    /* return () => closeModal(); */
  }, [postIdeaSuccessModalOpen]);
  const openDiscardModal = () => {
    openModal(
      <DiscardModalContent
        header={t("postIdeaDiscard_title")}
        setDiscard={setPostIdeaOpen}
        closeModal={closeModal}
      />,
      {
        swipe: !!isMobile,
        size: "sm",
      }
    );
  };
  return (
    <>
      {isMobile && !postIdeaSuccessModalOpen && (
        <>
          <Box
            zIndex={9}
            flexDirection="row"
            margin="14px 14px 0px 14px"
            gap="10px"
            justifyContent="space-between"
          >
            <Geocoder
              formik={formik}
              statefulMap={statefulMap}
            />
            <Button
              variant="white"
              icon={<Close />}
              onClick={() => openDiscardModal()}
            />
          </Box>

          {!formik?.values?.address && (
            <StyledMobileHeaders>
              {createIdeaHeader}

              {InstructionsHeader}
            </StyledMobileHeaders>
          )}

          {formik?.values?.address && !addressSelected && (
            <Box
              position="fixed"
              bottom="16px"
              left="16px"
              right="16px"
              zIndex="9999"
              height="66px"
            >
              <Button
                variant="primary"
                size="lg"
                text={t("next")}
                width={"max"}
                onClick={() => setAddressSelected(true)}
              ></Button>
            </Box>
          )}
          {addressSelected && (
            <Box
              position="fixed"
              bottom="0px"
              zIndex="999"
              width="100%"
            >
              <PostIdeaForm
                formik={formik}
                statefulMap={statefulMap}
                checkIfCalendar={checkIfCalendar}
                selectedDays={selectedDays}
                handleChangeCalendar={handleChangeCalendar}
                setPostIdeaOpen={setPostIdeaOpen}
                handleSubmit={handleSubmit}
                projectroomSelected={projectroomSelected}
                setProjectroomSelected={setProjectroomSelected}
                loading={loading}
                Out={Out}
              />
            </Box>
          )}
        </>
      )}

      {!isMobile && !postIdeaSuccessModalOpen && (
        <Wrapper>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            marginBottom="20px"
          >
            <Box
              flexDirection="column"
              alignItems="center"
              width="100%"
              justifyContent="space-between"
              padding="12px 16px 8px"
            >
              {createIdeaHeader}
              {!addressSelected && InstructionsHeader}
            </Box>
            {addressSelected && (
              <PostIdeaForm
                formik={formik}
                statefulMap={statefulMap}
                checkIfCalendar={checkIfCalendar}
                selectedDays={selectedDays}
                handleChangeCalendar={handleChangeCalendar}
                setPostIdeaOpen={setPostIdeaOpen}
                handleSubmit={handleSubmit}
                projectroomSelected={projectroomSelected}
                setProjectroomSelected={setProjectroomSelected}
                loading={loading}
                Out={Out}
              />
            )}
          </Box>
        </Wrapper>
      )}
      {!isMobile && !addressSelected && (
        <ProjectroomsWrapper>
          <Box
            margin="24px"
            flexDirection="column"
            gap="10px"
          >
            <Typography variant="buttonBg">
              {t("postIdea.projectroomsFoundNearbyTitle")}
            </Typography>
            <Typography variant="bodyBg">
              {t("postIdea.projectroomsFoundNearbyDescription")}
            </Typography>
            <Button
              variant="secondary"
              width="max"
              size="small"
              text={
                showProjectrooms ? t("hideProjectrooms") : t("showProjectrooms")
              }
              onClick={() => setShowProjectrooms(!showProjectrooms)}
            />
          </Box>
          {showProjectrooms && !addressSelected && (
            <List
              CardType={ProjectroomCard}
              data={projectroomsData}
              // projectroomsData={projectroomsData}
              handleButtonOpenCard={handleSelectProjectroom}
              listEndText={t("noMoreProjectrooms")}
              type="selectCard"
              projectroomSelected={projectroomSelected}
            />
          )}
        </ProjectroomsWrapper>
      )}
    </>
  );
};

export default PostIdea;
