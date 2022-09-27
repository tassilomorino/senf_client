/** @format */

import React, { FC } from "react";
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
  const createIdeaHeader = (
    <Box
      flexDirection="row"
      alignItems="center"
      width="100%"
      padding={"0px 16px 0px 16px"}
      justifyContent="space-between"
    >
      <Typography variant="h3">Idee erstellen</Typography>

      <Button
        variant="tertiary"
        size="lg"
        text={t("Abbrechen")}
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
      padding={"0px 16px 0px 16px"}
    >
      <Typography variant="bodyBg">
        Navigiere auf der Karte an den gewünschten Ort oder nutze die
        Adresseingabe.
      </Typography>
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
          text={t("Weiter")}
          width="max"
          onClick={() => setAddressSelected(true)}></Button>
      )}
    </Box>
  );
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
      {isMobile && postIdeaSuccessModalOpen && (
        <SuccessSubmitIdea
          navigate={navigate}
          setPostIdeaSuccessModalOpen={setPostIdeaSuccessModalOpen}
          setPostIdeaOpen={setPostIdeaOpen}
          newIdea={newIdea}
        />
      )}

      {!isMobile && (
        <Wrapper>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            marginBottom="20px"
          >
            <Box
              flexDirection="row"
              alignItems="center"
              width="100%"
              justifyContent="space-between"
            >
              {createIdeaHeader}
            </Box>

            {!addressSelected && InstructionsHeader}

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
