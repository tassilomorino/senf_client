/** @format */

import React, { useState, useEffect } from "react";

import Cookies from "universal-cookie";
import styled from "styled-components";
import { Switch } from "senf-atomic-design-system";
import { LegalStyles } from "./LegalStyles";

// "shared styles" component in legal folder
// TO DO: take care of the function handleLocation

const cookies = new Cookies();

const ListItem = styled.p`
  padding-bottom: 0;
  margin-top: 0;
`;

const ListTitle = styled.h3`
  padding-bottom: 0;
  margin-bottom: 0;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: #414345;
`;

const Header = styled.h2`
  width: auto;
  top: 0;
  font-weight: 900;
  font-size: 20px;
`;

const Wrapper = styled.div``;

const Logo = styled.h1`
  position: relative;
  top: 0em;
  left: 0vw;
`;
const HeaderSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CookieConfigurator = ({ classes }) => {
  const [necessary, setNecessary] = useState(true);
  const [location, setLocation] = useState(false);

  useEffect(() => {
    if (cookies.get("Cookie_settings") !== "all") {
      setLocation(false);
    }
    if (cookies.get("Cookie_settings") === "all") {
      setLocation(true);
    }
  }, []);

  const handleLocation = () => {
    setLocation(!location);

    if (location === false) {
      cookies.set("Cookie_settings", "all", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
        sameSite: "none",
        secure: true,
      });
    }
    if (location === true) {
      cookies.set("Cookie_settings", "minimum", {
        path: "/",
        maxAge: 60 * 60 * 24 * 90,
        sameSite: "none",
        secure: true,
      });
    }
  };

  const linkToHome = () => {
    window.location.href = "/";
  };

  return (
    <LegalStyles>
      <br />
      <br /> <br />
      <h1>Cookie Richtlinie</h1>
      <h2>Cookie-Konfigurator</h2>
      <p>
        Dieses Tool ermöglicht es dir, verschiedene Cookie-Kategorien zu
        aktivieren. Du kannst die Einstellungen jederzeit ändern.
      </p>
      <br /> <br />
      <HeaderSwitchWrapper style={{ pointerEvents: "none" }}>
        <Header>Notwendige Cookies</Header>
        <Switch
          id="test-switch"
          checked={necessary}
          receiveValue={(e) => setNecessary(e.target.checked)}
          disabled
        />
      </HeaderSwitchWrapper>
      <p>
        Notwendige Cookies helfen dabei, eine Website nutzbar zu machen, indem
        sie Grundfunktionen wie Seitennavigation und Zugriff auf sichere
        Bereiche der Website ermöglichen. Die Website kann ohne diese Cookies
        nicht richtig funktionieren. Sie können nicht blockiert werden.
      </p>
      <Line />
      <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
      <ListTitle>Name</ListTitle> <ListItem>Cookie_settings</ListItem>
      <ListTitle>Zweck</ListTitle>{" "}
      <ListItem>Speichert sämtliche Cookie Präferenzen des Nutzers</ListItem>
      <ListTitle>Speicherdauer</ListTitle> <ListItem>3 Monate</ListItem>
      <Line />
      <ListTitle>Anbieter</ListTitle> <ListItem>Senf</ListItem>
      <ListTitle>Name</ListTitle> <ListItem>language</ListItem>
      <ListTitle>Zweck</ListTitle>{" "}
      <ListItem>
        Speichert die Spracheinstellung des Nutzers und leitet ihn beim erneuten
        Seitenaufruf direkt auf die von ihm gewählte Version weiter{" "}
      </ListItem>
      <ListTitle>Speicherdauer</ListTitle> <ListItem>3 Monate</ListItem>
      <br /> <br />
      <HeaderSwitchWrapper>
        <Header>Statistik-Cookies</Header>
        <Switch
          id="test-switch2"
          checked={location}
          receiveValue={handleLocation}
        />
      </HeaderSwitchWrapper>
      <p>
        Statistik-Cookies helfen Websitebetreibern zu verstehen, wie Nutzer mit
        Websites interagieren, indem Informationen anonym gesammelt und gemeldet
        werden. Sofern Sie Cookies aus dieser Kategorie zulassen und zu einem
        späteren Zeitpunkt wieder blockieren, können bereits gesetzte Cookies
        aus technischen Gründen auf Ihrem Gerät verbleiben. Sie können diese
        dann jederzeit manuell löschen.
      </p>
      <Line />
      <p>Im Moment verwenden wir keine Cookies dieser Art. </p>
      {/* <ListTitle>Anbieter</ListTitle> <ListItem>Google</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>_ga</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>Google Analytics-Cookie zur Benutzeridentifizierung</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>2 Jahre</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Google</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>_gid</ListItem>
        <ListTitle>Zweck</ListTitle>{" "}
        <ListItem>Google Analytics-Cookie zur Benutzeridentifizierung</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>24 Stunden</ListItem>
        <Line />
        <ListTitle>Anbieter</ListTitle> <ListItem>Google</ListItem>
        <ListTitle>Name</ListTitle> <ListItem>_gat</ListItem>
        <ListTitle>Zweck</ListTitle>
        <ListItem>Drosselung der Anforderungsrate</ListItem>
        <ListTitle>Speicherdauer</ListTitle> <ListItem>1 Minute</ListItem> */}
      <br /> <br />
    </LegalStyles>
  );
};

export default CookieConfigurator;
