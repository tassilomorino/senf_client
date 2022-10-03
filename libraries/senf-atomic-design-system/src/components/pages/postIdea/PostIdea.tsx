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
import { Arrow } from "../../../assets/icons";
import SwipeModal from "../../molecules/modals/SwipeModal";
import SuccessSubmitIdea from "../success/SuccessSubmitIdea";
import { useModals } from "../../molecules/modalStack/ModalProvider";

const Wrapper = styled.div`
  z-index: 999;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => "22px 0px 0px 95px"};

  width: 366px;
  height: auto;
  overflow-y: scroll;
  border-radius: 24px;
  /* padding: 0px 16px 16px 16px; */
  ${() => LayerWhiteFirstDefault};
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
}) => {
  const { t } = useTranslation();
  const [postIdeaForm, setPostIdeaForm] = React.useState(false);

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

      <Button
        variant="tertiary"
        size="small"
        text={t("cancel")}
        justifyContent="flex-start"
        onClick={() => setPostIdeaOpen(false)}
      />
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
        <SuccessSubmitIdea
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

  return (
    <>
      {isMobile && !postIdeaSuccessModalOpen && (
        <>
          <Box
            position="fixed"
            top="16px"
            left="16px"
            right="16px"
            zIndex="9999"
          >
            <Geocoder
              formik={formik}
              statefulMap={statefulMap}
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
                text={t("Weiter")}
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
              <SwipeModal
                onClose={() => setPostIdeaOpen(false)}
                overflowing={true}
                style={{
                  height: "85%",
                }}
              >
                <PostIdeaForm
                  formik={formik}
                  statefulMap={statefulMap}
                  checkIfCalendar={checkIfCalendar}
                  selectedDays={selectedDays}
                  handleChangeCalendar={handleChangeCalendar}
                  setPostIdeaOpen={setPostIdeaOpen}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  Out={Out}
                />
              </SwipeModal>
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
              <>
                <PostIdeaForm
                  formik={formik}
                  statefulMap={statefulMap}
                  checkIfCalendar={checkIfCalendar}
                  selectedDays={selectedDays}
                  handleChangeCalendar={handleChangeCalendar}
                  setPostIdeaOpen={setPostIdeaOpen}
                  handleSubmit={handleSubmit}
                  loading={loading}
                  Out={Out}
                />
              </>
            )}
          </Box>
        </Wrapper>
      )}
    </>
  );
};

export default PostIdea;
