/** @format */

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "@react-spring/web";
import { useOnClickOutside } from "../../../hooks/useOnClickOutside";

//Components
import { CustomIconButton } from "../../atoms/CustomButtons/CustomButton";
import MainDialog from "../../atoms/Layout/MainDialog";
import CreateProjectPage0 from "./components/CreateProjectPage0";
import CreateProjectPage1 from "./components/CreateProjectPage1";
import CreateProjectPage2 from "./components/CreateProjectPage2";
import CreateProjectPage3 from "./components/CreateProjectPage3";

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

const CreateProjectDialog = ({
  setCreateProjectDialogIsOpen,
  isCreateProjectDialogIsOpen,
}) => {
  const { t } = useTranslation();
  const [outsideClick, setOutsideClick] = useState(false);

  const createProjectFormData = useSelector(
    (state) => state.formData.createProjectFormData
  );
  const [index, set] = useState(1);

  useEffect(() => {
    if (createProjectFormData && createProjectFormData.projectRoom_name) {
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

  const outerRef = useRef();
  useOnClickOutside(outerRef, () => {
    setOutsideClick(true);
    setTimeout(() => {
      setOutsideClick(false);
    }, 10000);
  });

  const pages = [
    ({ style }) => (
      <animated.div
        style={{
          ...style,

          width: "100%",
          position: "absolute",
        }}
      >
        <CreateProjectPage0 onClickNext={onClickNext} />
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
        <CreateProjectPage1
          outsideClick={outsideClick}
          onClickNext={onClickNext}
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
        <CreateProjectPage2
          outsideClick={outsideClick}
          setOutsideClick={setOutsideClick}
          onClickNext={onClickNext}
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
        <CreateProjectPage3
          outsideClick={outsideClick}
          setOutsideClick={setOutsideClick}
        />
      </animated.div>
    ),
  ];

  const currentStep = (100 / (pages.length - 1)) * index;

  return (
    <MainDialog
      setIsOpen={setCreateProjectDialogIsOpen}
      isOpen={isCreateProjectDialogIsOpen}
    >
      <ProgressLine>
        <CurrentStep index={currentStep} />
      </ProgressLine>
      {index === 0 ? (
        <CustomIconButton
          name="Close"
          position="fixed"
          margin={document.body.clientWidth > 768 ? "40px" : "10px"}
          left="0"
          top="0"
          handleButtonClick={() => setCreateProjectDialogIsOpen(false)}
        />
      ) : (
        <CustomIconButton
          name="ArrowLeft"
          position="fixed"
          margin={document.body.clientWidth > 768 ? "40px" : "10px"}
          left="0"
          top="0"
          handleButtonClick={onClickPrev}
        />
      )}

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
