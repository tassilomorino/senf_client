/** @format */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "@react-spring/web";

//firebase
import firebase from "firebase/app";
import "firebase/firestore";

//Components
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import MainDialog from "../../atoms/Layout/MainDialog";
import CreateProjectPage0 from "./CreateProjectRoom_components/CreateProjectPage0";
import CreateProjectPage0a from "./CreateProjectRoom_components/CreateProjectPage0a";
import CreateProjectPage1 from "./CreateProjectRoom_components/CreateProjectPage1";
import CreateProjectPage2 from "./CreateProjectRoom_components/CreateProjectPage2";
import CreateProjectPage3 from "./CreateProjectRoom_components/CreateProjectPage3";
import CreateProjectPage4 from "./CreateProjectRoom_components/CreateProjectPage4";
import CreateProjectPagePreview from "./CreateProjectRoom_components/CreateProjectPreview";
import { openCreateProjectRoomFunc } from "../../../redux/actions/projectActions";
import { PageWrapper } from "./styles/sharedStyles";
import TopNavigation from "./Components/TopNavigation";
const CreateProjectDialog = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(null);

  const [index, set] = useState(1);

  useEffect(() => {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createProjectRoomId")
    ) {
      if (localStorage.getItem("createProjectPostEdit")) {
        set(pages.length - 1);
      } else {
        set(0);
      }
    }
  }, []);

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
          setTitle(data.title);
        }
      }
    }
    fetchData();
  }, []);

  const [fromValue, setFrom] = useState(-100);
  const [leaveValue, setLeave] = useState(15);

  const onClickPrev = useCallback(() => {
    set((state) => state - 1);
    setFrom(-30);
    setLeave(15);
  }, []);
  const onClickNext = useCallback(() => {
    set((state) => state + 1);
    setFrom(30);
    setLeave(-15);
  }, []);

  const transitions = useTransition(index, {
    // from: {
    //   opacity: 0,
    //   transform: `translateX(${fromValue}%)`,
    //   config: { duration: 1000, mass: 100 },
    // },
    enter: {
      opacity: 1,
      transform: "translateX(0%)",
      animation: "smallEnteranimation 1s",
    },
    // leave: {
    //   opacity: 0,
    //   transform: `translateX(${leaveValue}%)`,
    //   config: { duration: 300 },
    // },
  });

  const setClose = () => {
    dispatch(openCreateProjectRoomFunc(false));
    localStorage.removeItem("createProjectPostEdit");
  };

  const pages = [
    ({ style }) => (
      <PageWrapper
        style={{
          ...style,
        }}
      >
        <CreateProjectPage0 set={set} />
      </PageWrapper>
    ),
    ({ style }) => (
      <PageWrapper
        style={{
          ...style,
        }}
      >
        <CreateProjectPage0a onClickNext={onClickNext} />
      </PageWrapper>
    ),
    ({ style }) => (
      <PageWrapper>
        <CreateProjectPage1 onClickNext={onClickNext} />
      </PageWrapper>
    ),
    ({ style }) => (
      <PageWrapper>
        <CreateProjectPage2
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </PageWrapper>
    ),
    ({ style }) => (
      <PageWrapper
        style={{
          ...style,
        }}
      >
        <CreateProjectPage3
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </PageWrapper>
    ),
    ({ style }) => (
      <animated.div>
        <CreateProjectPage4
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div>
        <CreateProjectPagePreview
          onClickPrev={onClickPrev}
          setClose={setClose}
          set={set}
        />
      </animated.div>
    ),
  ];

  const currentStep = (100 / (pages.length - 1)) * index;

  return (
    <MainDialog isOpen={true}>
      <TopNavigation
        index={currentStep}
        title={index !== 0 && index !== 1 && index !== 2 && title}
      />

      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "10px" : "10px"}
        left="0"
        top="0"
        zIndex={2}
        backgroundColor="transparent"
        shadow={false}
        handleButtonClick={setClose}
      />

      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </MainDialog>
  );
};

export default CreateProjectDialog;
