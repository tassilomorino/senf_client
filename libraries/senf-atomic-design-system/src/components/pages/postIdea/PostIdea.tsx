/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { isisMobile } from "react-device-detect";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import Typography from "../../atoms/typography/Typography";
import { PostIdeaProps } from "./PostIdea.types";
import PostIdeaForm from "./PostIdeaForm";
import { LayerWhiteFirstDefault } from "../../atoms/layerStyles/LayerStyles";
import Geocoder from "../../atoms/geocoder/Geocoder";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const Wrapper = styled.div`
  z-index: 999;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${(props) => (props.isMobile ? "0px" : "22px 0px 0px 95px")};

  width: 366px;
  height: auto;
  overflow-y: scroll;
  border-radius: 24px;
  /* padding: 0px 16px 16px 16px; */
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
      justifyContent="space-between"
    >
      <Typography variant="h3">Idee erstellen</Typography>
      <Button
        variant="tertiary"
        size="big"
        text={t("Abbrechen")}
        justifyContent="flex-start"
        onClick={() => setPostIdeaOpen(false)}
      />
    </Box>
  );

  const InstructionsHeader = (
    <Box
      gap="16px"
      flexDirection="column"
      width="100%"
      padding={"0px 16px 0px 16px"}
    >
      <Typography variant="bodyBg">
        {" "}
        Navigiere auf der Karte an den gewünschten Ort oder nutze die
        Adresseingabe.
      </Typography>
      <Geocoder
        finalAddress={formik?.values?.address}
        statefulMap={statefulMap}
      />

      {formik?.values.address && formik?.values.address !== "" && (
        <Button
          variant="primary"
          size="big"
          text={t("Weiter")}
          fillWidth={"max"}
          onClick={() => setAddressSelected(true)}
        ></Button>
      )}
    </Box>
  );
  return (
    <Wrapper isMobile={isMobile}>
      {isMobile && createIdeaHeader}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        marginBottom="20px"
      >
        {!isMobile && createIdeaHeader}

        {!addressSelected && !isMobile && InstructionsHeader}

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
  );
};

export default PostIdea;
