/** @format */

import React, { FC, Fragment, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

import * as yup from "yup"
import { useFormik } from "formik";
import DatePicker from "../../organisms/datePicker/DatePicker";
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
import ModalButton from "../../molecules/modalStack/ModalButton";
import { ModalContext } from "../../molecules/modalStack/ModalProvider";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const Background = styled.div<EditIdeaProps>`
 width:100%;
 height:100%;
  background-color: #fed957;
  position:absolute;
  z-index:0;
`;

const Wrapper = styled.div<EditIdeaProps>`
  margin: 20px 10px 10px 10px;
  position: relative;
  background-color: transparent;
`;

const EditIdeaPage: FC<EditIdeaPageProps> = ({
  data,
  projectroomsData,
  address,
  handle,
}) => {
  const { t } = useTranslation();
  const isMobile = isMobileCustom()
  const { handleModal } = React.useContext(ModalContext) || {};

  const [checkIfCalendar, setCheckIfCalendar] = React.useState(false);
  const [selectedDays, setSelectedDays] = useState([]);


  const editIdeaValidationSchema = yup.object({
    title: yup
      .string()
      .required(t("enter_ideaTitle"))
      .min(10, t("ideaTitle_too_short"))
      .max(70, t("ideaTitle_too_long")),

    body: yup
      .string()
      .required(t("enter_ideaDescription"))
      .min(100, t("ideaDescription_too_short"))
      .max(800, t("ideaDescription_too_long")),


    weblinkTitle: yup
      .string()
      .required(t("enter_ideaDescription"))

  });
  const initialValues = useRef({
    screamId: data.screamId,
    projectRoomId: data.projectRoomId ?? null,
    title: data.title ?? null,
    body: data.body ?? null,
    Thema: data.Thema ?? null,

    locationHeader: data.locationHeader ?? "",
    district: data.district ?? "Ohne Ortsangabe",
    Stadtteil: data.Stadtteil ?? "Ohne Ortsangabe",
    lat: data.lat ?? null,
    long: data.long ?? null,

    contact: data.contact ?? null,
    contactTitle: data.contactTitle ?? null,

    weblink: data.weblink ?? null,
    weblinkTitle: data.weblinkTitle ?? null,

    selectedUnix: data.selectedUnix ?? [],
  })
  const formikEditIdea = useFormik({
    initialValues: initialValues.current,
    validationSchema: editIdeaValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    // dispatch(getUserEmail(data.userId));

    if (data.selectedUnix) {
      const selectedDays = [];
      const { selectedUnix } = data;
      let i;
      for (i = 0; i < selectedUnix.length; i++) {
        selectedDays[i] = new Date(selectedUnix[i] * 1000);
      }
      setSelectedDays(selectedDays);
    }
  }, [data]);


  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    let i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i].unix;
    }

    setSelectedDays(selectedDays);
    formikEditIdea.setFieldValue("selectedUnix", selectedUnix);
  };


  useEffect(() => {
    projectroomsData?.forEach((project) => {
      if (formikEditIdea.values.projectRoomId === project.projectRoomId) {
        setCheckIfCalendar(project.calendar ?? false);
      }
    });
  }, [formikEditIdea.values.projectRoomId]);


  /*  const geocodeonSelected = (newViewport) => {
    setTimeout(() => {
      geocode(newViewport);
      setViewport(newViewport);
    }, 1000);
  }; */

  /*   const geocode = (viewport) => {
    const geocodingClient = mbxGeocoding({
      accessToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
    });
    geocodingClient
      .reverseGeocode({
        query: [viewport.longitude, viewport.latitude],
        limit: 1,
      })
      .send()
      .then((response) => {
        const match = response.body;
        console.log("Gesamt", match.features[0]);
        console.log(
          "Adresse",
          match.features[0].text,
          match.features[0].address
        );
        console.log("Stadtteil", match.features[0].context[1].text);
  
        const houseNumber =
          match.features[0].address !== undefined
            ? match.features[0].address
            : "";
  
        setNeighborhood(match.features[0].context[1].text);
        setAddress(`${match.features[0].text} ${houseNumber}`);
        setFulladdress(match.features[0].place_name);
      });
  }; */

  return (
    <React.Fragment>
      <Background />

      <Wave color={theme.colors.beige.beige20} top="0px" zIndex={1} />
      <Wrapper>
        <Box marginLeft="10px">
          <Typography variant="h2" >
            {t("edit_idea")}
          </Typography>
        </Box>

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


            <ModalButton
              variant="secondary"
              size="small"
              text={formikEditIdea?.values.weblinkTitle || t('add_weblink')}
              icon={<Hyperlink />}
              options={{
                padding: 20,
                title: t('add_weblink'),
                cancelText: t('cancel'),
                submitText: t('save'),
                onSubmit: () => handleModal("pop")
              }}
            >

              <Typography variant="bodyBg">Du kannst deinem Link einen eigenen Titel geben. Wenn du möchtest dass die URL angezeigt wird, lasse das Feld einfach frei.
              </Typography>
              <Box gap="16px" flexDirection="column" marginTop="20px">
                <Input
                  name="weblinkTitle"
                  placeholder={t("weblinkTitle")}
                  onChange={formikEditIdea?.handleChange}
                  onBlur={formikEditIdea?.handleBlur}
                  value={formikEditIdea?.values.weblinkTitle}
                  error={
                    formikEditIdea?.touched.weblinkTitle &&
                    Boolean(formikEditIdea?.errors.weblinkTitle)
                  }
                  note={
                    formikEditIdea?.touched.weblinkTitle &&
                    formikEditIdea?.errors.weblinkTitle
                  }
                />
                <Input
                  name="weblink"
                  type="text"
                  placeholder={t("weblink")}
                  onChange={formikEditIdea?.handleChange}
                  onBlur={formikEditIdea?.handleBlur}
                  value={formikEditIdea?.values.weblink}
                  error={
                    formikEditIdea?.touched.weblink &&
                    Boolean(formikEditIdea?.errors.weblink)
                  }
                  note={
                    formikEditIdea?.touched.weblink &&
                    formikEditIdea?.errors.weblink
                  }
                />
              </Box>
            </ModalButton>



            <ModalButton
              variant="secondary"
              size="small"
              text={formikEditIdea?.values.contactTitle || t('add_contact')}
              icon={<Mail />}
              options={{
                padding: 20,
                title: t('add_contact'),
                cancelText: t('cancel'),
                submitText: t('save'),
                onSubmit: () => handleModal("pop")
              }}
            >

              <Typography variant="bodyBg">Deine Kontaktdaten werden öffentlich gezeigt.</Typography>
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
              </Box>
            </ModalButton>

            {checkIfCalendar && (

              <ModalButton
                variant={selectedDays.length > 0 ? "primary" : "secondary"}
                size="small"
                icon={<CalendarIcon />}
                options={{
                  padding: 20,
                  title: t('add_date'),
                  cancelText: t('cancel'),
                  submitText: t('save'),
                  onSubmit: () => handleModal("pop")
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
            name="topic"
            label={t("topic")}
            initialValue={t("select_topic")}
            listItems={OptionsTopics()}
            onChange={formikEditIdea.handleChange("Thema")}
            value={formikEditIdea.values.Thema}
          />
          <Dropdown
            name="projectrooms"
            label={t("projectrooms")}
            initialValue={t("all_ideas")}
            listItems={projectroomsData && OptionsProjectrooms(projectroomsData)}
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
        bottom={isMobile ? "100px" : "0px"}
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
          onClick={() => handle.editIdea(formikEditIdea.values)}
          disabled={
            formikEditIdea.values.title === "" ||
            formikEditIdea.values.body === "" ||
            Boolean(formikEditIdea.errors.body) ||
            Boolean(formikEditIdea.errors.title)
          }
          text={t("save")}
        />
      </Box>
    </React.Fragment >
  );
};

export default EditIdeaPage;
