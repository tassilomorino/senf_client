/** @format */

import { MuiThemeProvider, NativeSelect, TextField } from "@material-ui/core";
import LocationOn from "@material-ui/icons/LocationOn";
import React from "react";
import Contact from "../modals/postModals/Contact";
import InlineDatePicker from "../modals/postModals/InlineDatePicker";
import Weblink from "../modals/postModals/Weblink";
import PostScreamRules from "../modals/PostScreamRules";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//Icons
import Arrow from "../../images/icons/arrow.png";

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
  topicsArray,
}) => {
  return (
    <div className={classes.content}>
      <div
        className={classes.locationOuter}
        onClick={handleLocationDecided}
        // onDragStart={() => this.handleClickAdress()}
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
        style={project === "Test:testproject_name" ? {} : { display: "none" }}
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
  );
};
export default PostScreamFormContent;
