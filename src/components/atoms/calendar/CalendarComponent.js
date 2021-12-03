/** @format */

import React from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import deLocale from "@fullcalendar/core/locales/de";
import enLocale from "@fullcalendar/core/locales/en-gb";
import { formatDate } from "@fullcalendar/react";

import listMonth from "@fullcalendar/list";
import { openScreamFunc } from "../../../redux/actions/screamActions";
// Redux stuff
import { connect } from "react-redux";

import "./Fullcalendar.css";

let str = formatDate(new Date(), {
  month: "long",
  year: "numeric",
  day: "numeric",
});

class CalendarComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      calendarWeekends: true,
      calendarEvents: [
        // initial event data
        {
          title: "Aktion X",
          date: new Date(1623397202 * 1000),
          id: "cIOhFG1vJoI9lDQ0QOPk",
        },
      ],
    };
  }

  componentDidMount() {
    const data = [];
    var i;
    var u;
    for (i = 0; i < this.props.projectScreams.length; i++) {
      if (
        this.props.projectScreams[i].selectedUnix === undefined ||
        this.props.projectScreams[i].selectedUnix === null
      ) {
        continue;
      }
      for (u = 0; u < this.props.projectScreams[i].selectedUnix.length; u++) {
        const eventObject = {
          title: this.props.projectScreams[i].title,
          date: new Date(this.props.projectScreams[i].selectedUnix[u] * 1000),
          id: this.props.projectScreams[i].screamId,
        };
        data.push(eventObject);
      }
    }

    this.setState({
      calendarEvents: data,
    });
  }
  handleEventClick = ({ event, el }) => {
    const screamId = event.id;
    this.props.openScreamFunc(screamId);
    this.props.handleClick(1);
  };

  render() {
    return (
      <div
        style={{
          zIndex: 999,
          paddingRight: "2.5%",
          paddingLeft: "2.5%",

          minHeight: "80vh",

          minWidth: "95%",
          display: "flex",
          flexDirection: "row",
          flexGrow: "1",
          paddingBottom: "50vh",
          pointerEvents: "all",
        }}
      >
        <FullCalendar
          plugins={[listMonth]}
          initialView="listMonth"
          events={this.state.calendarEvents}
          locale={navigator.language === "de-DE" ? deLocale : enLocale}
          eventClick={this.handleEventClick}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  openScreamFunc,
};

export default connect(mapStateToProps, mapActionsToProps)(CalendarComponent);
