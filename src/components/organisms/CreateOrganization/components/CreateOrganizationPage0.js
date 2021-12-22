/** @format */

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

//compoennts
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import NotDoneImage from "../../../../images/Not_connected.png";

//styles
import { Title } from "./styles/sharedStyles";

const CreateOrganizationPage0 = ({ onClickNext }) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const db = firebase.firestore();

      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"))
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
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleRestart = () => {
    var answer = window.confirm(
      "Bist du sicher, dass du die Erstellung des Projektraums neustarten möchtest?"
    );
    if (answer) {
      localStorage.removeItem("createOrganizationId");
      onClickNext();
    } else {
      //some code
    }
  };

  return (
    <div>
      <Title>
        Du bist noch dabei, deine Organisation {title && `"${title}"`}
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
        handleButtonClick={onClickNext}
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

export default CreateOrganizationPage0;
