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
import { isisMobileCustom } from "../../../hooks/customDeviceDetect";

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
  const isMobile = isisMobileCustom();

  const postIdeaHeader = (
    <>
      <Typography variant="h3">Idee erstellen</Typography>
      <Button
        variant="tertiary"
        size="big"
        text={t("Abbrechen")}
        justifyContent="flex-start"
        onClick={() => setPostIdeaOpen(false)}
      />
    </>
  );
  return (
    <Wrapper isMobile={isMobile}>
      {isMobile && { postIdeaHeader }}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        marginBottom="20px"
      >
        {!isMobile && <Box>{postIdeaHeader}</Box>}


        {!addressSelected && !isMobile && (
          <Box
            padding="0px 16px 0px 16px"
            gap="16px"
            flexDirection="column"
          >
            <Typography variant="bodyBg">
              {" "}
              Navigiere auf der Karte an den gewünschten Ort oder nutze die
              Adresseingabe.
            </Typography>

            <Geocoder
              finalAddress={formik?.values.address}
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
        )}

        {addressSelected && (
          <PostIdeaForm
            formik={formik}
            checkIfCalendar={checkIfCalendar}
            selectedDays={selectedDays}
            handleChangeCalendar={handleChangeCalendar}
            setPostIdeaOpen={setPostIdeaOpen}
          />
        )}
      </Box>

      {/* 
      <Box
        margin="10px 0px 10px 0px"
        justifyContent="center"
        position="absolute"
        bottom="10px"
        width="450px"
        zIndex={3}
      >
        <Button
          onClick={handleSubmit}
          variant="white"
          text={t("postScream_shareIdea")}
          loading={loading}
          disabled={
            formik.values.body === "" ||
            formik.values.title === "" ||
            !formik.values.address ||
            Out === true
          }
        />
      </Box> */}
    </Wrapper>
  );
};

export default PostIdea;
