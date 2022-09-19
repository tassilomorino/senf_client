/** @format */

import React, { FC, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { useFormik } from "formik";
import { Arrow, CalendarIcon, Hyperlink, Mail } from "../../../assets/icons";
import { OptionsTopics } from "../../../data/OptionsTopics";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";
import ContentDropdown from "../../atoms/contentDropdown/ContentDropdown";
import ContentDropdownItem from "../../atoms/contentDropdownItem/ContentDropdownItem";
import Divider from "../../atoms/divider/Divider";
import Input from "../../atoms/inputs/Input";
import Typography from "../../atoms/typography/Typography";
import ModalButton from "../../molecules/modalStack/ModalButton";
import { useModals } from "../../molecules/modalStack/ModalProvider";
import DatePicker from "../../organisms/datePicker/DatePicker";
import { PostIdeaFormProps } from "./PostIdeaForm.types";
import Geocoder from "../../atoms/geocoder/Geocoder";

const AddContactForm = ({ formikEditIdea: initial }) => {
  const { t } = useTranslation();

  const formikEditIdea = useFormik({ initialValues: initial.values });
  useEffect(() => initial.setValues(formikEditIdea.values), [formikEditIdea]);

  return (<><Typography variant="bodyBg">Deine Kontaktdaten werden öffentlich gezeigt.</Typography>
    <Box gap="16px" flexDirection="column" marginTop="20px">
      <Input
        name="contactTitle"
        placeholder={t("contactTitle")}
        onChange={formikEditIdea.handleChange("contactTitle")}
        onBlur={formikEditIdea.handleBlur}
        value={formikEditIdea.values.contactTitle}
        error={
          formikEditIdea.touched.contactTitle &&
          Boolean(formikEditIdea.errors.contactTitle)
        }
        note={
          formikEditIdea.touched.contactTitle &&
          formikEditIdea.errors.contactTitle
        }
      />
      <Input
        name="contact"
        type="text"
        placeholder={t("contact")}
        onChange={formikEditIdea?.handleChange}
        onBlur={formikEditIdea?.handleBlur}
        value={formikEditIdea?.values.contact}
        error={
          formikEditIdea?.touched.contact &&
          Boolean(formikEditIdea?.errors.contact)
        }
        note={
          formikEditIdea?.touched.contact &&
          formikEditIdea?.errors.contact
        }
      />
    </Box></>)
}


const Wrapper = styled.div<PostIdeaFormProps>`

width: 100%;
  height: auto;
  padding: 16px;
  background-color: white;
  z-index: 2;
`;

const PostIdeaForm: FC<PostIdeaFormProps> = ({ formik, statefulMap, checkIfCalendar, selectedDays, handleChangeCalendar, handleSubmit, loading, Out }) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()
  const { closeModal } = useModals();

  const [topicDropdownOpen, setTopicDropdownOpen] = useState(false);

  return <Wrapper>
    <Box marginBottom="20px" flexDirection="column" >
      <Typography variant="bodySm" paddingInline="0.875rem">Adresse deiner Idee</Typography>
      <Geocoder
        finalAddress={formik?.values?.address}
        statefulMap={statefulMap}
      />
    </Box>
    <Box gap="20px" flexDirection="column">
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


      <Box gap="8px" width="100%">


        <ModalButton
          fillWidth="max"
          variant="secondary"
          size="small"
          text={formik?.values.weblinkTitle || t('add_weblink')}
          icon={<Hyperlink />}
          options={{
            style: {
              padding: 20,
            },
            title: t('add_weblink'),
            cancelText: t('cancel'),
            submitText: t('save'),
            onSubmit: closeModal
          }}
        >

          <Typography variant="bodyBg">Du kannst deinem Link einen eigenen Titel geben. Wenn du möchtest dass die URL angezeigt wird, lasse das Feld einfach frei.
          </Typography>
          <Box gap="16px" flexDirection="column" marginTop="20px">
            <Input
              name="weblinkTitle"
              placeholder={t("weblinkTitle")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.weblinkTitle}
              error={
                formik?.touched.weblinkTitle &&
                Boolean(formik?.errors.weblinkTitle)
              }
              note={
                formik?.touched.weblinkTitle &&
                formik?.errors.weblinkTitle
              }
            />
            <Input
              name="weblink"
              type="text"
              placeholder={t("weblink")}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              value={formik?.values.weblink}
              error={
                formik?.touched.weblink &&
                Boolean(formik?.errors.weblink)
              }
              note={
                formik?.touched.weblink &&
                formik?.errors.weblink
              }
            />
          </Box>
        </ModalButton>



        <ModalButton
          variant="secondary"
          size="small"
          fillWidth="max"
          text={formik?.values.contactTitle || t('add_contact')}
          icon={<Mail />}
          options={{
            style: {
              padding: 20,
            },
            title: t('add_contact'),
            cancelText: t('cancel'),
            submitText: t('save'),
            onSubmit: closeModal
          }}
        >

          <AddContactForm
            formikEditIdea={formik}
          // onChange={formikEditIdea.setValues}
          />
          {/* <>
            <Typography variant="bodyBg">Deine Kontaktdaten werden öffentlich gezeigt.</Typography>
            <Box gap="16px" flexDirection="column" marginTop="20px">
              <Input
                name="contactTitle"
                placeholder={t("contactTitle")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.contactTitle}
                error={
                  formik.touched.contactTitle &&
                  Boolean(formik.errors.contactTitle)
                }
                note={
                  formik.touched.contactTitle &&
                  formik.errors.contactTitle
                }
              />
              <Input
                name="contact"
                type="text"
                placeholder={t("contact")}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                value={formik?.values.contact}
                error={
                  formik?.touched.contact &&
                  Boolean(formik?.errors.contact)
                }
                note={
                  formik?.touched.contact &&
                  formik?.errors.contact
                }
              />
            </Box>
          </> */}
        </ModalButton>


      </Box>

      <Divider />

      <Typography variant="buttonBg">{t("add_topic")}</Typography>


      <ContentDropdown
        open={topicDropdownOpen}
        setOpen={setTopicDropdownOpen}
        OpenButton={
          <Button
            onClick={() => setTopicDropdownOpen(!topicDropdownOpen)}
            text={formik?.values.topic || t("select_topic")}
            iconRight={<Arrow transform="rotate(90deg)" />}
            variant="secondary"
            size="small"
            fillWidth="max"

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

      <Divider />
      {checkIfCalendar && (
        <ModalButton
          variant="secondary"
          text={selectedDays?.length > 0 ? selectedDays.map((entry, i) => (`${entry.day}.${entry.month.number}${i !== selectedDays.length - 1 ? ", " : ""}`)) : "Termine hinzufügen"}
          size="small"
          fillWidth="max"
          icon={<CalendarIcon />}
          options={{
            padding: 20,
            title: t('add_date'),
            cancelText: t('cancel'),
            submitText: t('save'),
            onSubmit: closeModal
          }}
        >

          <Typography variant="bodyBg">{t("first_date_then_time")}</Typography>
          <Box gap="16px" flexDirection="column" marginTop="20px">

            <DatePicker
              handleChangeCalendar={handleChangeCalendar}
              selectedDays={selectedDays}
            />

          </Box>
        </ModalButton>


      )}

      <Button
        onClick={handleSubmit}
        variant={formik.errors.title || formik.errors.body ? "white" : "primary"}
        text={t("postScream_shareIdea")}
        loading={loading}
        disabled={
          formik.errors.body ||
          formik.errors.title ||
          !formik.values.address ||
          Out === true
        }
      />

    </Box>
  </Wrapper>;
};

export default PostIdeaForm;
