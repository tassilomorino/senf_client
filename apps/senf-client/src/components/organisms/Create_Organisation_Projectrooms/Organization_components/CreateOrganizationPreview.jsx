/** @format */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

//firebase
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//Components
import { SubmitButton } from "../../../atoms/CustomButtons/SubmitButton";

//images
import {
  ButtonsWrapper,
  ComponentInnerWrapper,
  ComponentWrapper,
  Title,
} from "../styles/sharedStyles";
import EditIcon from "../../../../images/icons/pen.png";
import CheckIcon from "../../../../images/icons/check.png";
import MissingIcon from "../../../../images/icons/close.png";
import ExpandButton from "../../../atoms/CustomButtons/ExpandButton";
import { set } from "lodash-es";
import {
  getProjects /* reloadProjects */,
} from "../../../../redux/actions/projectActions";
import { StyledH2, StyledH3 } from "../../../../styles/GlobalStyle";
import Navigation from "../Components/Navigation";

import { getOrganizations } from "../../../../redux/actions/organizationActions";
import ListItemsEdit from "../Components/ListItemsEdit";
import ToggleStatusComponent from "../Components/ToggleStatusComponent";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FrameWrapper = styled.div`
  width: calc(100vw - 50px);
  height: calc(100vh - 160px);
  border-radius: 50px;
  overflow: hidden;
  box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.5);
  border: 10px solid white;
  max-width: 1200px;

  @media (min-width: 768px) {
    box-shadow: 0 0px 40px -12px rgba(0, 0, 0, 0.2);

    width: calc(100vw - 60px);
    height: calc(100vh - 350px);
  }
`;

const CreateOrganizationPreview = ({
  onClickPrev,
  setClose,
  set,
  pagesData,
  listItems,
  index,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [openPreview, setOpenPreview] = useState(false);
  const [status, setStatus] = useState(true);

  const [infosProvided, setInfosProvided] = useState(false);

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
        if (
          !data.status ||
          data.status === "deactivated" ||
          data.status === "uncompleted"
        ) {
          setStatus(false);
        }
        if (data.title && data.description) {
          setInfosProvided(true);
        }
      }
    }

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      fetchData();
    }
  }, []);

  const handleArchive = async () => {
    const db = firebase.firestore();
    setStatus(false);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update({ status: "deactivated" }).then(() => {});
    } else {
    }
  };

  const handlePublish = async () => {
    const db = firebase.firestore();
    setStatus(true);

    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      const ref = await db
        .collection("organizations")
        .doc(localStorage.getItem("createOrganizationId"));

      return ref.update({ status: "active" }).then(() => {
        if (localStorage.getItem("createOrganizationPostEdit") !== "true") {
          setTimeout(() => {
            setClose();
          }, 1000);
        }
      });
    }
  };

  return (
    <React.Fragment>
      <ComponentWrapper>
        <ComponentInnerWrapper>
          <StyledH2 fontWeight="900" textAlign="center">
            {pagesData[index].subTitle}
          </StyledH2>
          <ListItemsEdit listItems={listItems} set={set} />

          {localStorage.getItem("createOrganizationPostEdit") === "true" && (
            <ToggleStatusComponent
              title={t("createOrganizationPage7ToggleTitle")}
              status={status}
              handlePublish={handlePublish}
              handleArchive={handleArchive}
              activeLabel={t("public")}
              deactivatedLabel={t("deactivated")}
            />
          )}
        </ComponentInnerWrapper>
      </ComponentWrapper>

      <Navigation
        nextLabel={t("Veröffentlichen")}
        prevLabel={t("back")}
        handleNext={handlePublish}
        handlePrev={onClickPrev}
        disabled={localStorage.getItem("createOrganizationPostEdit") === "true"}
        pagesData={pagesData}
        index={index}
        setClose={setClose}
        // loading={nextClicked}
      />
    </React.Fragment>
  );
};

export default CreateOrganizationPreview;
