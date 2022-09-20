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
      justifyContent="space-between">
      <Typography variant="h3">Idee erstellen</Typography>
      {!isMobile && (
        <Button
          variant="tertiary"
          size="big"
          text={t("Abbrechen")}
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
      padding={"0px 16px 0px 16px"}>
      <Typography variant="bodyBg">
        Navigiere auf der Karte an den gewünschten Ort oder nutze die
        Adresseingabe.
      </Typography>
      {!isMobile && (
        <Geocoder
          finalAddress={formik?.values?.address}
          statefulMap={statefulMap}
        />
      )}
      {!isMobile && formik?.values.address && formik?.values.address !== "" && (
        <Button
          variant="primary"
          size="big"
          text={t("Weiter")}
          fillWidth={"max"}
          onClick={() => setAddressSelected(true)}></Button>
      )}
    </Box>
  );
  return (
    <>
      {isMobile && !addressSelected && (
        <>
          <Box
            position="fixed"
            zIndex="99999"
            top="16px"
            left="16px">
            <Button
              icon={<Arrow transform="rotate(180)" />}
              onClick={() => setPostIdeaOpen(false)}
              size="medium"
              variant="white"
            />
          </Box>
          <Box
            position="fixed"
            top="16px"
            left="16px"
            right="16px"
            zIndex="9999">
            <Geocoder
              finalAddress={formik?.values?.address}
              statefulMap={statefulMap}
            />
          </Box>

          {!formik?.values?.address && (
            <StyledMobileHeaders>
              {createIdeaHeader}

              {InstructionsHeader}
            </StyledMobileHeaders>
          )}

          {formik?.values?.address && (
            <Box
              position="fixed"
              bottom="16px"
              left="16px"
              right="16px"
              zIndex="9999"
              height="66px">
              <Button
                variant="primary"
                size="big"
                text={t("Weiter")}
                fillWidth={"max"}
                onClick={() => setAddressSelected(true)}></Button>
            </Box>
          )}
        </>
      )}
      {isMobile && addressSelected && (
        <Box
          position="fixed"
          zIndex="99999"
          width="100%">
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
        </Box>
      )}

      {!isMobile && (
        <Wrapper>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            width="100%"
            marginBottom="20px">
            <Box
              flexDirection="row"
              alignItems="center"
              width="100%"
              justifyContent="space-between">
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
