/** @format */

import React from "react";
import { isAndroid } from "react-device-detect";
import { isMobileCustom } from "../../util/customDeviceDetect";

import { useTranslation } from "react-i18next";

//MUI Stuff
import { TextField } from "@material-ui/core";

//Components
import PostScreamRules from "../modals/PostScreamRules";
import Contact from "../modals/postModals/Contact";
import InlineDatePicker from "../modals/postModals/InlineDatePicker";
import Weblink from "../modals/postModals/Weblink";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import CustomSelect from "../module/CustomSelect";
import { SubmitButton } from "../module/buttons/SubmitButton";

const PostScreamFormContent = ({
  classes,
  errors,
  address,
  handleLocationDecided,
  handleChange,
  handleDropdown,
  openWeblink,
  weblink,
  weblinkTitle,
  handleOpenWeblink,
  handleCloseWeblink,
  handleSaveWeblink,
  openContact,
  contactTitle,
  contact,
  handleOpenContact,
  handleCloseContact,
  handleSaveContact,
  project,
  openCalendar,
  selectedDays,
  handleOpenCalendar,
  handleCloseCalendar,
  handleSaveCalendar,
  handleChangeCalendar,
  topic,
  loading,
  Out,
  locationDecided,
  handleSubmit,
  body,
  title,
}) => {
  const { t } = useTranslation();

  const optionsTopics = [
    { name: "Versorgung", label: t("topics_care") },
    { name: "Verkehr", label: t("topics_traffic") },
    {
      name: "Umwelt und Grün",
      label: t("topics_ecoAndGreen"),
    },
    {
      name: "Rad",
      label: t("topics_bike"),
    },
    {
      name: "Inklusion / Soziales",
      label: t("topics_inclusionAndSocial"),
    },
    {
      name: "Sport / Freizeit",
      label: t("topics_sportsAndLeisure"),
    },
    { name: "Sonstige", label: t("topics_other") },
  ];

  // const topicsArray = (
  //   <>
  //     <option value={"Inklusion / Soziales"} className={classes.formText}>
  //       Inklusion / Soziales
  //     </option>
  //     <option value={"Rad"} className={classes.formText}>
  //       Rad
  //     </option>
  //     <option value={"Sport / Freizeit"} className={classes.formText}>
  //       Sport / Freizeit
  //     </option>
  //     <option value={"Umwelt und Grün"} className={classes.formText}>
  //       Umwelt und Grün
  //     </option>
  //     <option value={"Verkehr"} className={classes.formText}>
  //       Verkehr
  //     </option>
  //     <option value={"Versorgung"} className={classes.formText}>
  //       Versorgung
  //     </option>
  //     <option value={"Sonstige"} className={classes.formText}>
  //       Sonstige
  //     </option>
  //   </>
  // );
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={isAndroid === false ? "postCard" : "postCardAndroid"}
        style={
          locationDecided && isMobileCustom
            ? { top: "20vh", transition: "0.5s" }
            : !locationDecided && isMobileCustom
            ? { top: "100vh", transition: "0.5s" }
            : locationDecided && !isMobileCustom
            ? { zIndex: 5 }
            : { zIndex: 1 }
        }
      >
        {!isMobileCustom && (
          <div
            onClick={handleLocationDecided}
            style={
              locationDecided
                ? {
                    display: "none",
                  }
                : {
                    display: "block",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#000000",
                    position: "absolute",
                    zIndex: 99999,
                    opacity: 0.6,
                    borderRadius: "19px",
                  }
            }
          ></div>
        )}
        <div className={classes.content}>
          <div
            className={classes.locationOuter}
            onClick={handleLocationDecided}
          >
            <LocationOn style={{ marginTop: "-5px" }} />{" "}
            <div className={classes.locationHeader}> ~ {address} </div>
          </div>
          <PostScreamRules />
          <TextField
            name="title"
            type="text"
            label={t("postScream_ideaTitle")}
            multiline
            rowsMax="2"
            placeholder=""
            error={errors.title ? true : false}
            helperText={errors.title}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
            fullWidth
            inputProps={{ maxLength: 70 }}
          />
          <TextField
            name="body"
            type="text"
            label={t("postScream_ideaBody")}
            multiline
            rowsMax="12"
            InputProps={{ disableUnderline: true }}
            placeholder=""
            error={errors.body ? true : false}
            helperText={errors.body}
            className={classes.textField}
            onChange={handleChange}
            margin="normal"
            fullWidth
            inputProps={{ maxLength: 800 }}
          />

          <Weblink
            openWeblink={openWeblink}
            handleOpenWeblink={handleOpenWeblink}
            handleCloseWeblink={handleCloseWeblink}
            handleSaveWeblink={handleSaveWeblink}
            weblinkTitle={weblinkTitle}
            weblink={weblink}
            handleChange={handleChange}
          ></Weblink>
          <Contact
            openContact={openContact}
            handleOpenContact={handleOpenContact}
            handleCloseContact={handleCloseContact}
            handleSaveContact={handleSaveContact}
            contactTitle={contactTitle}
            contact={contact}
            handleChange={handleChange}
          ></Contact>
          <div
            style={
              project === "Test:testproject_name" ? {} : { display: "none" }
            }
          >
            <InlineDatePicker
              openCalendar={openCalendar}
              handleOpenCalendar={handleOpenCalendar}
              handleCloseCalendar={handleCloseCalendar}
              handleSaveCalendar={handleSaveCalendar}
              handleChange={handleChangeCalendar}
              selectedDays={selectedDays}
            ></InlineDatePicker>
          </div>
          <div className="topicSelectContainer">
            <span>{t("topic")}: </span>

            <CustomSelect
              name={"topic"}
              value={topic}
              initialValue={"Wähle das Thema aus"}
              options={optionsTopics}
              handleDropdown={handleDropdown}
            />
            {/* <Select
              name={"topic"}
              value={topic}
              initialValue={"Wähle das Thema aus"}
              valuesArray={topicsArray}
              handleDropdown={handleChange}
            /> */}
          </div>
        </div>
        {locationDecided && (
          <SubmitButton
            text={t("postScream_shareIdea")}
            backgroundColor="white"
            textColor="#353535"
            position="absolute"
            bottom="-60px"
            loading={loading}
            disabled={body === "" || title === "" || Out === true}
            animation={true}
          />
        )}
        {/* 
        <button
          type="submit"
          className="submitPostButton buttonWide"
          disabled={body === "" || title === "" || Out === true}
          style={
            locationDecided
              ? {
                  display: "block",
                }
              : {
                  display: "none",
                }
          }
        >
          {t("postScream_shareIdea")}
          {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </button> */}
      </div>
    </form>
  );
};
export default PostScreamFormContent;
