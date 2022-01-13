/** @format */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "@react-spring/web";

//Components
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import MainDialog from "../../atoms/Layout/MainDialog";
import CreateOrganizationPage0 from "./Organization_components/CreateOrganizationPage0";
import CreateOrganizationPage0a from "./Organization_components/CreateOrganizationPage0a";
import CreateOrganizationPage0b from "./Organization_components/CreateOrganizationPage0b";
import CreateOrganizationPage1 from "./Organization_components/CreateOrganizationPage1";
import CreateOrganizationPage2 from "./Organization_components/CreateOrganizationPage2";
import CreateOrganizationPage3 from "./Organization_components/CreateOrganizationPage3";
import CreateOrganizationPage4 from "./Organization_components/CreateOrganizationPage4";
import CreateOrganizationPagePreview from "./Organization_components/CreateProjectPreview";
import FinishedCreatingOrganization from "./Organization_components/FinishedCreatingOrganization";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";

const InnerWrapper = styled.div`
  text-align: center;
  margin-top: 40px;
  position: relative;

  @media (min-width: 768px) {
    margin-top: 40px;
  }
`;

const ProgressLine = styled.div`
  height: 10px;
  width: 50%;
  margin-left: 25%;
  background-color: rgb(255, 255, 255, 0.4);
  border-radius: 10px;
  position: relative;
  top: 30px;
`;
const CurrentStep = styled.div`
  height: 100%;

  width: ${(props) => props.index && `${props.index}%`};
  transition: 1s;
  border-radius: 5px;
  background-color: white;
`;

const CreateProjectDialog = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [index, set] = useState(1);

  useEffect(() => {
    if (
      typeof Storage !== "undefined" &&
      localStorage.getItem("createOrganizationId")
    ) {
      set(0);
    }
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
    dispatch(stateCreateOrganizationsFunc(false));
  };

  const pages = [
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage0 onClickNext={onClickNext} />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage0a
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage0b
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage1
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage2
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage3
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPage4
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          width: "100%",
          position: "absolute",
        }}
      >
        <CreateOrganizationPagePreview
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
        />
      </animated.div>
    ),
    ({ style }) => (
      <animated.div
        style={{
          ...style,
          width: "100%",
          position: "absolute",
        }}
      >
        <FinishedCreatingOrganization
          onClickPrev={onClickPrev}
          setCreateOrganizationIsOpen={setClose}
          set={set}
        />
      </animated.div>
    ),
  ];

  const currentStep = (100 / (pages.length - 1)) * index;

  return (
    <MainDialog isOpen={true}>
      <ProgressLine>
        <CurrentStep index={currentStep} />
      </ProgressLine>
      <CustomIconButton
        name="Close"
        position="fixed"
        margin={document.body.clientWidth > 768 ? "40px" : "10px"}
        left="0"
        top="0"
        handleButtonClick={setClose}
      />

      <InnerWrapper>
        {transitions((style, i) => {
          const Page = pages[i];
          return <Page style={style} />;
        })}
      </InnerWrapper>
    </MainDialog>
  );
};

export default CreateProjectDialog;
