/** @format */

import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import MyButton from "../../../../util/MyButton";

import CloseIcon from "@material-ui/icons/Close";

import Switch from "@material-ui/core/Switch";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const styles = {
  wrapper: {
    position: "relative",
    width: "90vw",
    marginLeft: "5vw",
  },
  closeButton: {
    zIndex: 9999,
    position: "fixed",
    left: "15px",

    marginTop: "18px",
    backgroundColor: "white",
    color: "#ffd388",
  },
  Header: {
    width: "70vw",
    top: "0",
    marginTop: "15px",
  },
  Switch: {
    float: "right",
  },
  line: {
    height: "1px",
    width: "100%",
    backgroundColor: "#414345",
  },
  listTitle: {
    paddingBottom: 0,
    marginBottom: "0",
  },
  listitem: {
    paddingBottom: 0,
    marginTop: "0",
  },
};

export class start extends Component {
  state = {
    necessary: true,
    location: false,
  };

  componentDidMount() {
    if (cookies.get("Cookie_settings") !== "all") {
      this.setState({
        location: false,
      });
    }
    if (cookies.get("Cookie_settings") === "all") {
      this.setState({
        location: true,
      });
    }
  }

  handleLocation = (event) => {
    this.setState({
      location: !this.state.location,
    });

    if (this.state.location === false) {
      cookies.set("Cookie_settings", "all", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
        sameSite: "none",
        secure: true,
      });
    }
    if (this.state.location === true) {
      cookies.set("Cookie_settings", "minimum", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
        sameSite: "none",
        secure: true,
      });
    }
  };
  render() {
    const { classes } = this.props;

    return (
      <div>
        {/* <div className="MainBackground"></div> */}

        <Link to="/">
          <MyButton btnClassName={classes.closeButton}>
            <CloseIcon />
          </MyButton>
        </Link>

        <div className={classes.wrapper}>
          <Link to="/">
            <h1 className="logo2">Senf</h1>
          </Link>
          <br />
          <br /> <br />
          <h1>Cookie Richtlinie</h1>
          <h2>Cookie-Konfigurator</h2>
          <p>
            Dieses Tool ermöglicht es dir, verschiedene Cookie-Kategorien zu
            aktivieren. Du kannst die Einstellungen jederzeit ändern.
          </p>
          <Switch
            className={classes.Switch}
            disabled
            checked={this.state.necessary}
            value="necessary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <h2 className={classes.Header}>Notwendige Cookies</h2>
          <p>
            Notwendige Cookies helfen dabei, eine Website nutzbar zu machen,
            indem sie Grundfunktionen wie Seitennavigation und Zugriff auf
            sichere Bereiche der Website ermöglichen. Die Website kann ohne
            diese Cookies nicht richtig funktionieren. Sie können nicht
            blockiert werden.
          </p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Senf</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>Cookie_settings</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Speichert sämtliche Cookie Präferenzen des Nutzers
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>3 Monate</p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Senf</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>Cookie_Rules</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Speichert, dass Nutzer den Regeln des Ideen-teilens zugestimmt
            haben.
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>3 Monate</p>
          <Switch
            className={classes.Switch}
            checked={this.state.location}
            onChange={() => this.handleLocation()}
            value="location"
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <h2 className={classes.Header}>Service-verbessernde-Cookies</h2>
          <p>
            Die Service verbessernden Cookies erlauben es, dass sowohl
            Funktionen wie der Kartendienst oder auch die Analyse der Ergebnisse
            geschehen kann.
          </p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Senf</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>_ga</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Google Analytics-Cookie zur Benutzeridentifizierung
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>2 Jahre</p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Senf</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>_gid</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Google Analytics-Cookie zur Benutzeridentifizierung
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>24 Stunden</p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Senf</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>_gat</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>Drosselung der Anforderungsrate</p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>1 Minute</p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Google</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>1P_JAR</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Wird zur Optimierung von Werbung von Google DoubleClick eingesetzt,
            um für Nutzer relevante Anzeigen bereitzustellen, Berichte zur
            Kampagnenleistung zu verbessern oder um zu vermeiden, dass ein
            Nutzer dieselben Anzeigen mehrmals sieht.
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>1 Monat</p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Google</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>NID</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Das NID-Cookie enthält eine eindeutige ID, über die Google Ihre
            bevorzugten Einstellungen und andere Informationen speichert,
            insbesondere Ihre bevorzugte Sprache (z. B. Deutsch), wie viele
            Suchergebnisse pro Seite angezeigt werden sollen (z. B. 10 oder 20)
            und ob der Google SafeSearch-Filter
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>6 Monate</p>
          <div className={classes.line} />
          <h3 className={classes.listTitle}>Anbieter</h3>{" "}
          <p className={classes.listitem}>Google</p>
          <h3 className={classes.listTitle}>Name</h3>{" "}
          <p className={classes.listitem}>CONSENT</p>
          <h3 className={classes.listTitle}>Zweck</h3>{" "}
          <p className={classes.listitem}>
            Speichert deine Bestätigung zur Verwendung der Cookies für die
            Standort-Ermittlung
          </p>
          <h3 className={classes.listTitle}>Speicherdauer</h3>{" "}
          <p className={classes.listitem}>18 Jahre</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(start));
