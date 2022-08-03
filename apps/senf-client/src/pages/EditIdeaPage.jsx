/** @format */

import React, { useState, useEffect, memo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  EditIdeaPage as EditIdeaPageComponent,
  SwipeModal,
} from "senf-atomic-design-system";
import { editScreamFunc, getUserEmail } from "../redux/actions/screamActions";

import Weblink from "../components/Modals/Post_Edit_ModalComponents/Weblink";
import Contact from "../components/Modals/Post_Edit_ModalComponents/Contact";
import InlineDatePickerModal from "../components/Modals/Post_Edit_ModalComponents/InlineDatePickerModal";

const EditIdeaPage = ({
  isAdmin,
  isModerator,
  isUser,
  setEditOpen,
  setMenuOpen,
  editOpen,
  classes,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  const projectRooms = useSelector((state) => state.data?.projects);
  const scream = useSelector((state) => state.data.scream);

  const [order, setOrder] = useState(1);

  const [datePicker, setDatePicker] = useState(false);

  const [weblinkOpen, setWeblinkOpen] = useState(false);

  const [contactOpen, setContactOpen] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);

  const [viewport, setViewport] = useState({
    latitude: scream.lat ?? "",
    longitude: scream.long ?? "",
  });

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
  });

  const formikEditIdea = useFormik({
    initialValues: {
      projectRoomId: scream.projectRoomId ?? null,
      screamId: scream.screamId,

      title: scream.title ?? null,
      body: scream.body ?? null,
      Thema: scream.Thema ?? null,

      locationHeader: scream.locationHeader ?? "",
      district: scream.district ?? "Ohne Ortsangabe",
      Stadtteil: scream.Stadtteil ?? "Ohne Ortsangabe",
      lat: scream.lat ?? null,
      long: scream.long ?? null,

      contact: scream.contact ?? null,
      contactTitle: scream.contactTitle ?? null,

      weblink: scream.weblink ?? null,
      weblinkTitle: scream.weblinkTitle ?? null,

      selectedUnix: scream.selectedUnix ?? [],
    },
    validationSchema: editIdeaValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
  });

  useEffect(() => {
    // dispatch(getUserEmail(scream.userId));

    if (scream.selectedUnix) {
      const selectedDays = [];
      const { selectedUnix } = scream;
      let i;
      for (i = 0; i < selectedUnix.length; i++) {
        selectedDays[i] = new Date(selectedUnix[i] * 1000);
      }
      setSelectedDays(selectedDays);
    }
  }, [dispatch, editOpen, scream]);

  const handleCloseWeblink = () => {
    setWeblinkOpen(false);
    formikEditIdea.setFieldValue("weblink", scream.weblink ?? null);
    formikEditIdea.setFieldValue("weblinkTitle", scream.weblinkTitle ?? null);
  };
  const handleSaveWeblink = () => {
    setWeblinkOpen(false);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
    formikEditIdea.setFieldValue("contact", scream.contact ?? null);
    formikEditIdea.setFieldValue("contactTitle", scream.contactTitle ?? null);
  };
  const handleSaveContact = () => {
    setContactOpen(false);
  };
  const handleChangeCalendar = (selectedDays) => {
    const selectedUnix = [];
    let i;
    for (i = 0; i < selectedDays.length; i++) {
      selectedUnix[i] = selectedDays[i].unix;
    }

    setSelectedDays(selectedDays);
    formikEditIdea.setFieldValue("selectedUnix", selectedUnix);
  };

  const handleCloseCalendar = () => {
    setCalendarOpen(false);

    // setSelectedDays([]);
    // setSelectedUnix([]);
  };
  const handleSaveCalendar = () => {
    setCalendarOpen(false);
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
    if (selectedUnix[0] === undefined) {
      editScream.selectedUnix = [];
    } else {
      editScream.selectedUnix = selectedUnix;
    }
 */
    dispatch(editScreamFunc(formikEditIdea.values)).then(() => {
      setEditOpen(false);
    });
  };

  return (
    <React.Fragment>
      {weblinkOpen && (
        <Weblink
          formik={formikEditIdea}
          handleCloseWeblink={handleCloseWeblink}
          handleSaveWeblink={handleSaveWeblink}
          weblinkOpen={weblinkOpen}
          setWeblinkOpen={setWeblinkOpen}
        />
      )}
      {contactOpen && (
        <Contact
          formik={formikEditIdea}
          handleCloseContact={handleCloseContact}
          handleSaveContact={handleSaveContact}
          contactOpen={contactOpen}
          setContactOpen={setContactOpen}
        />
      )}
      {calendarOpen && (
        <InlineDatePickerModal
          calendarOpen={calendarOpen}
          setCalendarOpen={setCalendarOpen}
          handleCloseCalendar={handleCloseCalendar}
          handleSaveCalendar={handleSaveCalendar}
          handleChangeCalendar={handleChangeCalendar}
          selectedDays={selectedDays}
        />
      )}

      <EditIdeaPageComponent
        formikEditIdea={formikEditIdea}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        projectRooms={projectRooms}
        // onSelected={geocodeonSelected}
        viewport={viewport}
        scream={scream}
        setWeblinkOpen={setWeblinkOpen}
        setContactOpen={setContactOpen}
        datePicker={datePicker}
        selectedDays={selectedDays}
        setCalendarOpen={setCalendarOpen}
        handleSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

export default memo(EditIdeaPage);
