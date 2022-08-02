/** @format */

import React, { useState } from "react";
import { isAndroid } from "react-device-detect";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import {
  Arrow,
  Box,
  RoundedButton,
  Button,
  Input,
  Hyperlink,
  Mail,
  CalendarIcon,
  ContentDropdown,
  ContentDropdownItem,
  TertiaryButton,
} from "senf-atomic-design-system";
import { isMobileCustom } from "../../util/customDeviceDetect";

// MUI Stuff

// Components
import PostScreamRules from "./PostScreamRules";

// Icons
import LocationIcon from "../../images/icons/location.png";
import { OptionsTopics } from "../../data/OptionsTopics";
import { StyledH3, StyledH4, StyledText } from "../../styles/GlobalStyle";

const Card = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 12;
  display: flex;
  margin-left: 2.5%;
  margin-right: auto;

  /* height: calc(75vh - 70px); */
  height: ${(props) =>
    props.isAndroid ? "450px" : "calc((var(--vh, 1vh) * 100) - 150px)"};

  /* height:calc(80vh - 70px); */
  width: 95vw;
  border-radius: 20px;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0);
  background-color: white;

  @media (min-width: 768px) {
    position: fixed;
    top: 115px;
    left: 0;
    margin-left: 80px;
    margin-right: auto;
    height: 50vh;
    width: 400px;
    border-radius: 20px;
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0);
    background-color: white;
    z-index: 2;
    animation: enteranimation 1s;
  }
`;

const Content = styled.div`
  padding: 25px;
  object-fit: cover;
  overflow: scroll;
  width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  height: 10px;
  align-items: center;
  margin-bottom: 10px;
`;

const HideDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000;
  position: absolute;
  z-index: 99999;
  opacity: 0.6;
  border-radius: 19px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const SelectContainer = styled.div`
  background-color: #f8f8f8;
  width: 90%;
  left: 0;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding-left: 5%;
  padding-right: 5%;
  position: absolute;
  bottom: 0;
  border-bottom-right-radius: 20px;
  border-bottom-left-radius: 20px;
  font-size: 20px;
`;

const PostScreamFormContent = ({
  formik,
  errors,
  address,
  handleLocationDecided,
  handleDropdown,
  weblink,
  weblinkTitle,
  contactTitle,
  contact,
  checkIfCalendar,
  selectedDays,
  topic,
  loading,
  Out,
  locationDecided,
  handleSubmit,
  body,
  title,
  setTitle,
  setBody,
  setWeblinkOpen,
  setContactOpen,
  setCalendarOpen,
  setOpenRules,
}) => {
  const { t } = useTranslation();

  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  return (
    <Card
      isAndroid={isAndroid}
      style={
        locationDecided && isMobileCustom
          ? { top: "80px", transition: "0.5s" }
          : !locationDecided && isMobileCustom
          ? { top: "100vh", transition: "0.5s" }
          : locationDecided && !isMobileCustom
          ? { zIndex: 5 }
          : { zIndex: 1 }
      }
    >
      {!isMobileCustom && (
        <HideDiv onClick={handleLocationDecided} show={!locationDecided} />
      )}

      <Content>
        <FlexWrapper onClick={handleLocationDecided}>
          <img
            src={LocationIcon}
            width="20px"
            height="20px"
            style={{ paddingRight: "5px" }}
          />
          <StyledH4> ~ {address} </StyledH4>

          <Button
            variant="secondary"
            onClick={() => setOpenRules(true)}
            text={t("rules")}
          />

          <PostScreamRules />
        </FlexWrapper>
        <Box flexDirection="column" gap="20px">
          <Input
            key="title"
            id="title"
            name="title"
            type="textarea"
            placeholder={t("add_title")}
            label={t("postScream_ideaTitle")}
            rows={1}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.title}
            error={formik?.touched.title && Boolean(formik?.errors.title)}
            note={formik?.touched.title && formik?.errors.title}

            // maxLength: 70
          />

          <Input
            key="body"
            id="body"
            name="body"
            type="textarea"
            placeholder={t("add_body")}
            label={t("postScream_ideaBody")}
            rows={10}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            value={formik?.values.body}
            error={formik?.touched.body && Boolean(formik?.errors.body)}
            note={formik?.touched.body && formik?.errors.body}

            // maxLength: 800
          />
        </Box>
        {/* <TextField
          name="title"
          type="text"
          label={t("postScream_ideaTitle")}
          multiline
          maxRows="2"
          placeholder=""
          error={!!errors.title}
          helperText={errors.title}
          onChange={(event) => setTitle(event.target.value)}
          margin="normal"
          fullWidth
          inputProps={{ maxLength: 70 }}
        />
        <TextField
          name="body"
          type="text"
          label={t("postScream_ideaBody")}
          multiline
          maxRows="12"
          InputProps={{ disableUnderline: true }}
          placeholder=""
          error={!!errors.body}
          helperText={errors.body}
          onChange={(event) => setBody(event.target.value)}
          margin="normal"
          fullWidth
          inputProps={{ maxLength: 800 }}
        /> */}

        <Box position="absolute" bottom="60px" zIndex={2} gap="8px">
          <RoundedButton
            variant={
              weblink !== null && weblinkTitle !== null ? "primary" : "white"
            }
            icon={<Hyperlink />}
            onClick={() => setWeblinkOpen(true)}
          />
          <RoundedButton
            variant={
              contact !== null && contactTitle !== null ? "primary" : "white"
            }
            icon={<Mail />}
            onClick={() => setContactOpen(true)}
          />

          {checkIfCalendar && (
            <RoundedButton
              variant={selectedDays.length > 0 ? "primary" : "white"}
              icon={<CalendarIcon />}
              onClick={() => setCalendarOpen(true)}
            />
          )}
        </Box>
        <SelectContainer>
          <StyledH3 fontWeight={400}>{t("topic")}: </StyledH3>

          <ContentDropdown
            open={topicDropdownOpen}
            setOpen={setTopicDropdownOpen}
            OpenButton={
              <TertiaryButton
                onClick={() => setTopicDropdownOpen(!topicDropdownOpen)}
                text={topic || t("select_topic")}
                iconRight={<Arrow transform="rotate(90deg)" />}
                variant="semibold"
              />
            }
            Content={
              <Box gap="5px" flexDirection="column">
                {Object.values(OptionsTopics()).map(({ name, label }) => (
                  <Box gap="5px">
                    <ContentDropdownItem
                      type="check"
                      text={label}
                      checked={topic === name}
                      setChecked={() => handleDropdown(name)}
                    />
                  </Box>
                ))}
              </Box>
            }
          />
        </SelectContainer>
      </Content>
      {locationDecided && (
        <Box
          margin="10px 0px 10px 0px"
          justifyContent="center"
          position="absolute"
          top="100%"
          width="100%"
        >
          <Button
            onClick={handleSubmit}
            variant="white"
            text={t("postScream_shareIdea")}
            loading={loading}
            disabled={
              formik.values.body === "" ||
              formik.values.title === "" ||
              Out === true ||
              loading ||
              !address
            }
          />
        </Box>
      )}
    </Card>
  );
};
export default PostScreamFormContent;
