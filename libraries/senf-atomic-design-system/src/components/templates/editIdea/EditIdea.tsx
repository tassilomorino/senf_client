/** @format */

import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import CalendarIcon from "../../../assets/icons/CalendarIcon";
import Hyperlink from "../../../assets/icons/Hyperlink";
import Mail from "../../../assets/icons/Mail";
import { OptionsProjectrooms } from "../../../data/OptionsProjectrooms";
import { OptionsTopics } from "../../../data/OptionsTopics";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import RoundedButton from "../../atoms/buttons/RoundedButton";
import Dropdown from "../../atoms/dropdown/Dropdown";
import Input from "../../atoms/inputs/Input";
import Typography from "../../atoms/typography/Typography";
import { EditIdeaProps } from "./EditIdea.types";
import Geocoder from "../../atoms/geocoder/Geocoder";
import MapTileSmall from "../../../assets/other/mapTileSmall.png";

const Wrapper = styled.div<EditIdeaProps>`
  max-height: 800px;
  overflow: scroll;

  margin: 20px 10px 10px 10px;
  position: relative;
  background-color: transparent;
`;

const EditIdea: FC<EditIdeaProps> = ({
  formik,
  projectrooms,
  data,
  setData,

  setEditOpen,
  setWeblinkOpen,
  setContactOpen,
  checkIfCalendar,
  selectedDays,
  setCalendarOpen,
  handleSubmit,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Typography variant="h2" textAlign="center">
        {t("edit_idea")}
      </Typography>

      {/*
      
      <Geocoder
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
      />

     
      */}
      <Box
        flexDirection="column"
        gap="20px"
        top="50px"
        margin="0px 0px 200px 0px"
      >
        <Input
          key="title"
          id="title"
          name="title"
          type="text"
          placeholder={t("add_title")}
          label={t("title")}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.title}
          error={formik?.touched.title && Boolean(formik?.errors.title)}
          note={formik?.touched.title && formik?.errors.title}
        />
        <Input
          key="body"
          id="body"
          name="body"
          type="textarea"
          placeholder={t("add_description")}
          label={t("body")}
          rows={10}
          onChange={formik?.handleChange}
          onBlur={formik?.handleBlur}
          value={formik?.values.body}
          error={formik?.touched.body && Boolean(formik?.errors.body)}
          note={formik?.touched.body && formik?.errors.body}
        />

        <Box gap="8px">
          <RoundedButton
            variant={
              data?.weblink !== null && data?.weblinkTitle !== null
                ? "primary"
                : "white"
            }
            icon={<Hyperlink />}
            onClick={() => setWeblinkOpen(true)}
          />
          <RoundedButton
            variant={
              data?.contact !== null && data?.contactTitle !== null
                ? "primary"
                : "white"
            }
            icon={<Mail />}
            onClick={() => setContactOpen(true)}
          />

          {checkIfCalendar && (
            <RoundedButton
              variant={data?.selectedDays.length > 0 ? "primary" : "white"}
              icon={<CalendarIcon />}
              onClick={() => setCalendarOpen(true)}
            />
          )}
        </Box>
        <Box width="100%">
          <Geocoder />
          <div style={{ width: "60px", height: "50px" }}>
            <img
              src={MapTileSmall}
              width="98px"
              style={{ transform: "translate(-15px,-26px)" }}
            />
          </div>
        </Box>

        <Dropdown
          id="topic"
          label={t("topic")}
          initialValue={t("select_topic")}
          listItems={OptionsTopics()}
          recieveValue={(selectedItems) =>
            setData({
              ...data,
              topic: selectedItems.topic,
            })
          }
          value={data?.topic}
        />
        <Dropdown
          id="projectrooms"
          label={t("projectrooms")}
          initialValue={t("all_ideas")}
          listItems={
            projectrooms
              ? OptionsProjectrooms({ projectrooms })
              : [{ value: "all_ideas", label: t("all_ideas") }]
          }
          recieveValue={(selectedItems) =>
            setData({
              ...data,
              projectrooms: selectedItems.projectrooms,
            })
          }
          value={data?.topic}
        />
      </Box>
    </Wrapper>
  );
};

export default EditIdea;
