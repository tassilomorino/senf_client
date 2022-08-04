/** @format */

import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import Plus from "../../../assets/icons/Plus";
import theme from "../../../styles/theme";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import RoundedButton from "../../atoms/buttons/RoundedButton";
import Wave from "../../atoms/shapes/Wave";
import SwipeModal from "../../molecules/modals/SwipeModal";
import { EditIdeaPageProps } from "./EditIdeaPage.types";

import CalendarIcon from "../../../assets/icons/CalendarIcon";
import Hyperlink from "../../../assets/icons/Hyperlink";
import Mail from "../../../assets/icons/Mail";
import { OptionsProjectrooms } from "../../../data/OptionsProjectrooms";
import { OptionsTopics } from "../../../data/OptionsTopics";

import Dropdown from "../../atoms/dropdown/Dropdown";
import Input from "../../atoms/inputs/Input";
import Typography from "../../atoms/typography/Typography";
import { EditIdeaProps } from "./EditIdea.types";
import Geocoder from "../../atoms/geocoder/Geocoder";
import MapTileSmall from "../../../assets/other/mapTileSmall.png";

const Wrapper = styled.div<EditIdeaProps>`
  margin: 20px 10px 10px 10px;
  position: relative;
  background-color: transparent;
`;

const EditIdeaPage: FC<EditIdeaPageProps> = ({
  formikEditIdea,
  editOpen,
  setEditOpen,
  projectRooms,
  handleDropdownProject,
  onSelected,
  viewport,
  scream,
  projectRoomId,
  setProjectRoomId,
  address,
  title,
  body,
  topic,
  setTopic,
  setTitle,
  setBody,
  handleDropdown,
  weblink,
  weblinkTitle,
  setWeblinkOpen,
  contact,
  contactTitle,
  setContactOpen,
  datePicker,
  selectedDays,
  setCalendarOpen,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  const [enableCalendar, setEnableCalendar] = React.useState(false);
  useEffect(() => {
    projectRooms?.forEach((project) => {
      if (formikEditIdea.values.projectRoomId === project.projectRoomId) {
        setEnableCalendar(project.calendar ?? false);
      }
    });
  }, [formikEditIdea.values.projectRoomId]);
  console.log(
    formikEditIdea.values.projectRoomId,
    "formikEditIdea.values.projectRoomId"
  );
  return (
    <SwipeModal
      openModal={editOpen}
      setOpenModal={setEditOpen}
      zIndex={9999999999}
      overflow="hidden"
      backgroundColor={theme.colors.primary.primary100}
    >
      <Wave color={theme.colors.beige.beige20} top="0px" />

      <Box position="absolute" top="0px" margin="10px" zIndex={99}>
        <RoundedButton
          icon={<Plus transform="rotate(45deg)" />}
          onClick={() => setEditOpen(false)}
        />
      </Box>
      <Wrapper>
        <Typography variant="h2" textAlign="center">
          {t("edit_idea")}
        </Typography>

        {/*    <Geocoder
        mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
        onSelected={onSelected}
        viewport={viewport}
        hideOnSelect={true}
        limit={3}
        queryParams={queryParams}
        id="geocoder-edit"
        className="geocoder-edit"
        inputComponent={MyInput}
        updateInputOnSelect
      /> */}

        <Box
          flexDirection="column"
          gap="20px"
          top="50px"
          margin="0px 0px 0px 0px"
        >
          <Input
            key="title"
            id="title"
            name="title"
            type="text"
            placeholder={t("add_title")}
            label={t("title")}
            onChange={formikEditIdea.handleChange}
            onBlur={formikEditIdea.handleBlur}
            value={formikEditIdea.values.title}
            error={
              formikEditIdea.touched.title &&
              Boolean(formikEditIdea.errors.title)
            }
            note={formikEditIdea.touched.title && formikEditIdea.errors.title}
          />
          <Input
            key="body"
            id="body"
            name="body"
            type="textarea"
            placeholder={t("add_description")}
            label={t("body")}
            rows={10}
            onChange={formikEditIdea.handleChange}
            onBlur={formikEditIdea.handleBlur}
            value={formikEditIdea.values.body}
            error={
              formikEditIdea.touched.body && Boolean(formikEditIdea.errors.body)
            }
            note={formikEditIdea.touched.body && formikEditIdea.errors.body}
          />

          <Box gap="8px">
            <RoundedButton
              variant={
                formikEditIdea.values.weblink !== null &&
                  formikEditIdea.values.weblink !== "" &&
                  formikEditIdea.values.weblinkTitle !== null &&
                  formikEditIdea.values.weblinkTitle !== ""
                  ? "primary"
                  : "white"
              }
              icon={<Hyperlink />}
              onClick={() => setWeblinkOpen(true)}
            />

            <RoundedButton
              variant={
                formikEditIdea.values.contact !== null &&
                  formikEditIdea.values.contact !== "" &&
                  formikEditIdea.values.contactTitle !== null &&
                  formikEditIdea.values.contactTitle !== ""
                  ? "primary"
                  : "white"
              }
              icon={<Mail />}
              onClick={() => setContactOpen(true)}
            />

            {enableCalendar && (
              <RoundedButton
                variant={selectedDays.length > 0 ? "primary" : "white"}
                icon={<CalendarIcon />}
                onClick={() => setCalendarOpen(true)}
              />
            )}
          </Box>
          <Box width="100%">
            <Geocoder placeholder={address} />
            <div style={{ width: "60px", height: "50px" }}>
              <img
                src={MapTileSmall}
                width="98px"
                style={{ transform: "translate(-15px,-26px)" }}
              />
            </div>
          </Box>

          <Dropdown
            key="topic"
            id="topic"
            name="topic"
            label={t("topic")}
            initialValue={t("select_topic")}
            listItems={OptionsTopics()}
            onChange={formikEditIdea.handleChange("Thema")}
            value={formikEditIdea.values.Thema}
          />
          <Dropdown
            id="projectrooms"
            label={t("projectrooms")}
            initialValue={t("all_ideas")}
            listItems={projectRooms && OptionsProjectrooms(projectRooms)}
            onChange={formikEditIdea.handleChange("projectRoomId")}
            value={formikEditIdea.values.projectRoomId}
          /* text={
              OptionsProjects().find(
                (optionsProjects) => projectSelected === optionsProjects.value
              ).label || t("all_ideas")
            } */
          />

          <div style={{ height: "100px" }} />
        </Box>
      </Wrapper>

      <Box
        position="absolute"
        bottom="0px"
        width="calc(100% - 20px)"
        gap="8px"
        margin="10px"
      >
        <Button
          variant="white"
          fillWidth="max"
          onClick={() => setEditOpen(false)}
          text={t("cancel")}
        />
        <Button
          variant="primary"
          fillWidth="max"
          onClick={handleSubmit}
          disabled={
            formikEditIdea.values.title === "" ||
            formikEditIdea.values.body === "" ||
            Boolean(formikEditIdea.errors.body) ||
            Boolean(formikEditIdea.errors.title)
          }
          text={t("save")}
        />
      </Box>
    </SwipeModal>
  );
};

export default EditIdeaPage;
