/** @format */

import { MuiThemeProvider, NativeSelect, TextField } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import React, { useEffect } from "react";
import Contact from "../modals/postModals/Contact";
import InlineDatePicker from "../modals/postModals/InlineDatePicker";
import Weblink from "../modals/postModals/Weblink";
import PostScreamRules from "../modals/PostScreamRules";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Icons
import Arrow from "../../images/icons/arrow.png";
import { CircularProgress } from "@material-ui/core";
import { isAndroid, isMobileOnly } from "react-device-detect";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});

const PostScreamFormContent = ({
  classes,
  errors,
  address,
  handleLocationDecided,
  handleChange,
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
}) => {
  const topicsArray = (
    <>
      <option value={"Inklusion / Soziales"} className={classes.formText}>
        Inklusion / Soziales
      </option>
      <option value={"Rad"} className={classes.formText}>
        Rad
      </option>
      <option value={"Sport / Freizeit"} className={classes.formText}>
        Sport / Freizeit
      </option>
      <option value={"Umwelt und Grün"} className={classes.formText}>
        Umwelt und Grün
      </option>
      <option value={"Verkehr"} className={classes.formText}>
        Verkehr
      </option>
      <option value={"Versorgung"} className={classes.formText}>
        Versorgung
      </option>
      <option value={"Sonstige"} className={classes.formText}>
        Sonstige
      </option>
    </>
  );
  return (
    <form onSubmit={handleSubmit}>
      <div
        className={isAndroid === false ? "postCard" : "postCardAndroid"}
        style={
          locationDecided && isMobileOnly
            ? { top: "20vh", transition: "0.5s" }
            : !locationDecided && isMobileOnly
            ? { top: "100vh", transition: "0.5s" }
            : locationDecided && !isMobileOnly
            ? { zIndex: 5 }
            : { zIndex: 1 }
        }
      >
        {!isMobileOnly && (
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
            label="Titel deiner Idee"
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
            label="Beschreibung deiner Idee"
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
            <span>Thema: </span>

            <MuiThemeProvider theme={theme}>
              <NativeSelect
                value={topic}
                onChange={handleChange}
                name="topic"
                className="projectFormControl"
                inputProps={{ "aria-label": "topic" }}
                id="topic"
                IconComponent={() => (
                  <img
                    src={Arrow}
                    width="20px"
                    style={{
                      marginTop: "0px",
                      marginLeft: "-24px",
                      pointerEvents: "none",
                    }}
                  ></img>
                )}
              >
                <option value="" className={classes.formText}>
                  Wähle das Thema aus
                </option>
                {topicsArray}
              </NativeSelect>
            </MuiThemeProvider>
          </div>
        </div>

        <button
          type="submit"
          className="submitPostButton buttonWide"
          disabled={loading || Out ? true : false}
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
          Idee teilen
          {loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </button>
      </div>
    </form>
  );
};
export default PostScreamFormContent;
