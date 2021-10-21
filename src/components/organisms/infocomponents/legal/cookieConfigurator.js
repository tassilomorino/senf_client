/** @format */

import React, { Component } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";

import Switch from "@material-ui/core/Switch";

import Cookies from "universal-cookie";
import { CustomIconButton } from "../../../atoms/CustomButtons/CustomButton";
import styled from "styled-components";
import LogoWhite from "../../../../images/logo_white.png";


const cookies = new Cookies();

const styles = {
  Switch: {
    float: "right",
  },
};


const ListItem = styled.p`
  padding-bottom: 0;
  margin-top: 0;
`

const ListTitle = styled.h3`
  padding-bottom: 0;
  margin-bottom: 0;
`

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #414345;
`

const Header = styled.h2`
  width: 70vw;
  top: 0;
  margin-top: 15px;
`

const Wrapper = styled.div`
  position: relative;
  z-index: 0;
  width: 90vw;
  height: 100%;
  margin: auto;
  max-width: 600px;
  margin-top: 30vh;
`

const Logo = styled.h1`
  position: relative;
  top: 0em;
  left: 0vw;
`

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

    const linkToHome = () => {
      window.location.href = "/";
    }

    return (
      <div>
        {/* <div className="MainBackground"></div> */}

        <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        left="0"
        handleButtonClick={() => linkToHome()}
        top="0"
      />

        <Wrapper>
        <Logo onClick={() => linkToHome()}>
          <img src={LogoWhite} width="100px" alt="logo" />
        </Logo>
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
          <Header>Notwendige Cookies</Header>
          <p>
            Notwendige Cookies helfen dabei, eine Website nutzbar zu machen,
            indem sie Grundfunktionen wie Seitennavigation und Zugriff auf
            sichere Bereiche der Website ermöglichen. Die Website kann ohne
            diese Cookies nicht richtig funktionieren. Sie können nicht
            blockiert werden.
          </p>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Senf</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>Cookie_settings</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Speichert sämtliche Cookie Präferenzen des Nutzers
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>3 Monate</ListItem>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Senf</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>Cookie_Rules</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Speichert, dass Nutzer den Regeln des Ideen-teilens zugestimmt
            haben.
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>3 Monate</ListItem>
          <Switch
            className={classes.Switch}
            checked={this.state.location}
            onChange={() => this.handleLocation()}
            value="location"
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <Header>Service-verbessernde-Cookies</Header>
          <p>
            Die Service verbessernden Cookies erlauben es, dass sowohl
            Funktionen wie der Kartendienst oder auch die Analyse der Ergebnisse
            geschehen kann.
          </p>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Senf</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>_ga</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Google Analytics-Cookie zur Benutzeridentifizierung
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>2 Jahre</ListItem>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Senf</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>_gid</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Google Analytics-Cookie zur Benutzeridentifizierung
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>24 Stunden</ListItem>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Senf</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>_gat</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>Drosselung der Anforderungsrate</ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>1 Minute</ListItem>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Google</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>1P_JAR</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Wird zur Optimierung von Werbung von Google DoubleClick eingesetzt,
            um für Nutzer relevante Anzeigen bereitzustellen, Berichte zur
            Kampagnenleistung zu verbessern oder um zu vermeiden, dass ein
            Nutzer dieselben Anzeigen mehrmals sieht.
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>1 Monat</ListItem>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Google</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>NID</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Das NID-Cookie enthält eine eindeutige ID, über die Google Ihre
            bevorzugten Einstellungen und andere Informationen speichert,
            insbesondere Ihre bevorzugte Sprache (z. B. Deutsch), wie viele
            Suchergebnisse pro Seite angezeigt werden sollen (z. B. 10 oder 20)
            und ob der Google SafeSearch-Filter
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>6 Monate</ListItem>
          <Line />
          <ListTitle>Anbieter</ListTitle>{" "}
          <ListItem>Google</ListItem>
          <ListTitle>Name</ListTitle>{" "}
          <ListItem>CONSENT</ListItem>
          <ListTitle>Zweck</ListTitle>{" "}
          <ListItem>
            Speichert deine Bestätigung zur Verwendung der Cookies für die
            Standort-Ermittlung
          </ListItem>
          <ListTitle>Speicherdauer</ListTitle>{" "}
          <ListItem>18 Jahre</ListItem>
        </Wrapper>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps)(withStyles(styles)(start));
