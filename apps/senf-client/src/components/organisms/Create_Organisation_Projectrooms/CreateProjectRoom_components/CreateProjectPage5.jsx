/** @format */

import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import MapDialog from "../Components/MapDialog";

import DrawMapImage from "../../../../images/drawMap.jpg";
import MapPreview from "../Components/MapPreview";
import {
  ComponentWrapper,
  ComponentInnerWrapper,
} from "../styles/sharedStyles";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/storage";
import Navigation from "../Components/Navigation";
import { StyledH2, StyledH3, StyledText } from "../../../../styles/GlobalStyle";
import CalendarIcon from "../../../../images/icons/calendar.png";
import ToggleStatusComponent from "../Components/ToggleStatusComponent";
const Card = styled.div`
  margin: 50px 0px 0px 10px;
  overflow: hidden;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 200px;
  width: 200px;
  margin-left: 50%;
  transform: translateX(-50%);

  box-shadow: 0px 12px 18px -8px rgba(186, 160, 79, 0.2),
    0px -4px 10px 4px rgba(255, 255, 255, 0.2);
  background-color: ${(props) => (props.active ? "#feecab" : "#fcfbf8")};
  border-radius: 18px;
  border: 2px solid ${(props) => (props.active ? "#e8ba02" : "#ffffff")};

  filter: ${(props) =>
    props.status === "deactivated" || props.status === "uncompleted"
      ? "brightness(0.6)"
      : "brightness(1)"};

  animation: CalendarCardAnimation 0.8s;

  @keyframes CalendarCardAnimation {
    0% {
      opacity: 0;
      transform: translateY(50%) translateX(-50%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%) translateX(-50%);
    }
  }
`;

const CreateProjectPage5 = ({
  onClickNext,
  onClickPrev,
  set,
  pagesData,
  index,
}) => {
  const { t } = useTranslation();
  const [nextClicked, setNextClicked] = useState(false);

  const [calendar, setCalendar] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();
      if (
        typeof Storage !== "undefined" &&
        localStorage.getItem("createProjectRoomId")
      ) {
        const ref = await db
          .collection("organizations")
          .doc(localStorage.getItem("createProjectRoomOrganizationId"))
          .collection("projectRooms")
          .doc(localStorage.getItem("createProjectRoomId"))
          .get();

        if (!ref.exists) {
          console.log("No such document!");
        } else {
          const data = ref.data();
          if (data.calendar) {
            setCalendar(data.calendar);
          }
        }
      }
    }
    fetchData();
  }, []);

  const handleNext = async () => {
    setNextClicked(true);

    const db = firebase.firestore();
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      //UPDATING AN EXISTING PROJECTROOM
      const updateProject = {
        calendar: calendar,
      };
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createProjectRoomOrganizationId"))
        .collection("projectRooms")
        .doc(localStorage.getItem("createProjectRoomId"));
      return ref.update(updateProject).then(() => {
        setTimeout(() => {
          if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
            set(pagesData.length - 1);
          } else {
            onClickNext();
          }
        }, 200);
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH3 textAlign="center" margin="20px">
            {pagesData[index].subTitle}
          </StyledH3>

          <Card active={calendar} onClick={() => setCalendar(!calendar)}>
            <img
              src={CalendarIcon}
              width="80px"
              style={{ marginTop: "20px" }}
            />
            <StyledH3 textAlign="center">{t("calendar")}</StyledH3>
            <StyledText textAlign="center">
              {t("calendar_projectroom_explanaition")}
            </StyledText>
          </Card>

          <ToggleStatusComponent
            title={""}
            status={calendar}
            handlePublish={() => setCalendar(true)}
            handleArchive={() => setCalendar(false)}
            activeLabel={t("active")}
            deactivatedLabel={t("deactivated")}
          />
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("next")}
        prevLabel={t("back")}
        handleNext={handleNext}
        handlePrev={onClickPrev}
        set={set}
        disabled={nextClicked}
        loading={nextClicked}
        pagesData={pagesData}
        index={index}
      />
    </React.Fragment>
  );
};

export default CreateProjectPage5;
