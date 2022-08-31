/** @format */

import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Arrow, CalendarIcon, Hyperlink, Mail } from "../../../assets/icons";
import { OptionsTopics } from "../../../data/OptionsTopics";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";
import ContentDropdownItem from "../../atoms/contentDropdownItem/ContentDropdownItem";
import Input from "../../atoms/inputs/Input";
import { PostIdeaFormProps } from "./PostIdeaForm.types";

const Wrapper = styled.div<PostIdeaFormProps>`

width: 425px;
height: auto;
position: absolute;
top: 150px;
left: 16px;
padding:20px;
background-color: white;
z-index:2 ;
`;


const PostIdeaForm: FC<PostIdeaFormProps> = ({ formik }) => {
  const { t } = useTranslation()
  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  return <Wrapper>
    <Box gap="5px" flexDirection="column">
      <Input
        name="title"
        type="text"
        placeholder={t("add_title")}
        label={t("postScream_ideaTitle")}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values.title}
        error={formik?.touched.title && Boolean(formik?.errors.title)}
        note={formik?.touched.title && formik?.errors.title}

      // maxLength: 70
      />

      <Input
        name="body"
        type="textarea"
        placeholder={t("add_body")}
        label={t("postScream_ideaBody")}
        rows={5}
        maxRows={10}
        onChange={formik?.handleChange}
        onBlur={formik?.handleBlur}
        value={formik?.values.body}
        error={formik?.touched.body && Boolean(formik?.errors.body)}
        note={formik?.touched.body && formik?.errors.body}

      // maxLength: 800
      />


      {/* <Button
        variant={
          weblink !== null && weblinkTitle !== null ? "primary" : "white"
        }
        icon={<Hyperlink />}
        onClick={() => setWeblinkOpen(true)}
      />
      <Button
        variant={
          contact !== null && contactTitle !== null ? "primary" : "white"
        }
        icon={<Mail />}
        onClick={() => setContactOpen(true)}
      />

      {checkIfCalendar && (
        <Button
          variant={selectedDays.length > 0 ? "primary" : "white"}
          icon={<CalendarIcon />}
          onClick={() => setCalendarOpen(true)}
        />
      )} */}

      <ContentDropdown
        open={topicDropdownOpen}
        setOpen={setTopicDropdownOpen}
        OpenButton={
          <Button
            onClick={() => setTopicDropdownOpen(!topicDropdownOpen)}
            text={formik?.values.topic || t("select_topic")}
            iconRight={<Arrow transform="rotate(90deg)" />}
            variant="semibold"
          />
        }
        Content={
          <Box gap="5px" flexDirection="column">
            {Object.values(OptionsTopics()).map(({ value, label }) => (
              <Box gap="5px">
                <ContentDropdownItem
                  type="check"
                  text={label}
                  checked={formik?.values.topic === value}
                  onClick={() => formik?.setFieldValue("topic", value)}
                />
              </Box>
            ))}
          </Box>
        }
      />
    </Box>
  </Wrapper>;
};

export default PostIdeaForm;
