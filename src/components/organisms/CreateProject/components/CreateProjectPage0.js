/** @format */

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

import NotDoneImage from "../../../../images/Not_connected.png";
import { Title } from "./styles/sharedStyles";

const CreateProjectPage0 = ({ set }) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

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
        setTitle(data.title);
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      fetchData();
    }
  }, []);

  const handleRestart = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Erstellung des Projektraums neustarten möchtest?"
    );
    if (answer) {
      localStorage.removeItem("createProjectRoomId");

      set(1);
    } else {
      //some code
    }
  };

  return (
    <div>
      <Title>
        Du bist noch dabei, deinen Projektraum {title && `"${title}"`}
        zu erstellen{" "}
      </Title>
      <br />

      <img src={NotDoneImage} width="60%" alt="NotDoneImage" />
      <SubmitButton
        text={t("continue_creation")}
        zIndex="9"
        backgroundColor="#353535"
        textColor="white"
        position="relative"
        top="50px"
        left="0"
        handleButtonClick={() => set(2)}
        // disabled={!formikCreateProjectStore.isValid}
        //   keySubmitRef={keySubmitRef}
      />

      <SubmitButton
        text={t("restart")}
        zIndex="9"
        backgroundColor="rgb(255,255,255,0.5)"
        textColor="#353535"
        position="relative"
        top="70px"
        handleButtonClick={handleRestart}
        // disabled={!formikCreateProjectStore.isValid}
        //   keySubmitRef={keySubmitRef}
      />
    </div>
  );
};

export default CreateProjectPage0;
