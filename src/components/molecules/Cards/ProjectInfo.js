/** @format */

import { Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

// Images
import WeblinkIcon from "../../../images/icons/weblink.png";
import contactIcon from "../../../images/icons/mail.png";

const Card = styled.div`
  z-index: 99;
  position: relative;
  display: flex;
  margin-top: 0px;
  margin-left: 2.5%;
  width: 95%;
  min-width: 95%;
  border-radius: 20px;
  height: auto;
  background-color: white;
  box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0);
  margin-bottom: 10px;
`;

const Content = styled.div`
  width: 100%;
  padding: 15px;
  object-fit: cover;
`;

const Title = styled.div`
  position: relative;
  width: 95%;
  color: #353535;
  padding-top: 5;
  padding-bottom: 5;
  font-size: 18px;
  font-weight: 500;
  font-family: Futura PT W01-Bold;
  clear: both;
`;

const Button = styled.button`
  border-radius: 20px;
  text-transform: none;
  font-size: 12pt;
  background-color: white;
  height: 40px;
  font-family: Futura PT W01 Book;
  box-shadow: none;
  padding-right: 15px;
  padding-left: 15px;
  background-color: rgb(254, 217, 87);
  margin-right: 5px;
  box-shadow: rgb(38, 57, 77, 0) 0px 20px 30px -16px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const ProjectInfo = ({
  description,
  weblink,
  contact,
  startDate,
  endDate,
  owner,
}) => {
  const openLink = (weblink) => {
    window.open(`https://${weblink}`, "_blank");
  };
  const openMail = (contact) => {
    window.location.href = "mailto:" + contact;
  };
  return (
    <Card>
      <Content>
        <Title> Worum geht's</Title>
        <p>{description}</p>

        <div style={{ display: "flex", flexDirection: "row" }}>
          {weblink && (
            <Button onClick={() => openLink(weblink)}>
              Mehr Infos{" "}
              <img
                src={WeblinkIcon}
                style={{
                  paddingLeft: "9px",
                  marginTop: "-2px",
                }}
                width="15"
                alt="WeblinkIcon"
              />
            </Button>
          )}

          {contact && (
            <Button onClick={() => openMail(contact)}>
              Kontakt
              <img
                src={contactIcon}
                style={{ paddingLeft: "9px" }}
                width="22"
                alt="WeblinkIcon"
              />
            </Button>
          )}
        </div>

        <br />
        <Title> Zeitraum </Title>
        <p>
          {endDate ? (
            <div className="date">
              {startDate} – {endDate}
            </div>
          ) : (
            <div className="date">{startDate} </div>
          )}
        </p>
        <br />

        <Title>Initiatoren</Title>
        <p>{owner}</p>
        <br />
      </Content>
    </Card>
  );
};

export default ProjectInfo;
