import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { doc, deleteDoc } from "firebase/firestore";
import { Box } from "senf-atomic-design-system";
import DropdownButton from "senf-atomic-design-system/src/components/atoms/contentDropdown/DropdownButton";
import { db } from "../../../firebase";
import { isMobileCustom } from "../../../util/customDeviceDetect";
import { StyledH2 } from "../../../styles/GlobalStyle";
import { stateCreateOrganizationsFunc } from "../../../redux/actions/organizationActions";
import { openCreateProjectRoomFunc } from "../../../redux/actions/projectActions";

const Wrapper = styled.div`
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 1;
  height: 70px;
  width: 100vw;

  /* box-shadow: 0 8px 40px -12px rgba(0, 0, 0, 0.2); */
`;

const ProgressLine = styled.div`
  height: 10px;
  width: 50%;
  max-width: 400px;
  top: 10px;

  background-color: #fed957;
  border-radius: 10px;
  position: relative;
`;
const CurrentStep = styled.div`
  height: 100%;

  width: ${(props) => props.index && `${props.index}%`};
  transition: 1s;
  border-radius: 5px;
  background-color: white;
`;
const TitlesWrapper = styled.div`
  position: fixed;
  height: 60px;
  left: 50%;
  transform: translateX(-50%);
  top: 10px;
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h4`
  height: 30px;
  position: relative;
  text-align: center;
  width: 100%;
  top: 10px;
  margin-bottom: 20px;
`;

const SVGWrapper = styled.div`
  /* background-color: rgb(249, 241, 215); */
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const SVGWrapper2 = styled.div`
  /* background-color: rgb(249, 241, 215); */
  height: 150px;
  width: 100%;
  position: absolute;
  top: 0;
  z-index: -2;
  margin-top: 10px;
  transition: 1s;

  clip-path: polygon(
    0 0,
    ${(props) => props.currentStep && `${props.currentStep}%`} 0,
    ${(props) => props.currentStep && `${props.currentStep}%`} 100%,
    0% 100%
  );
`;

const ButtonWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.standalone ? "100px" : "50px")};
  position: relative;
  z-index: 999;
  overflow: hidden;
`;
const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: grey;
  position: relative;
`;

export const StyledIcon = styled.img`
  width: 30px;
  position: absolute;
  z-index: 2;
  pointer-events: all;

  top: 25px;
  left: calc(100% - 55px);

  @media (min-width: 768px) {
    top: 20px;
    left: calc(100% - 60px);
  }
`;

const TopNavigation = ({
  pagesData,
  index,
  title,
  currentStep,
  setClose,
  type,
}) => {
  const dispatch = useDispatch();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { t } = useTranslation();

  const handleDelete = async () => {
    const answer = window.confirm(
      "Bist du sicher, dass du die Organisation löschen möchtest?"
    );
    if (answer) {
      if (type === "projectRoom") {
        await deleteDoc(
          doc(
            db,
            "organizations",
            localStorage.getItem("createProjectRoomOrganizationId"),
            "projectRooms",
            localStorage.getItem("createProjectRoomId")
          )
        ).then(() => {
          localStorage.removeItem("createProjectRoomOrganizationId");
          localStorage.removeItem("createProjectRoomId");
          setClose();
          // dispatch(openProjectRoomFunc(null, false));
        });
      } else {
        await deleteDoc(
          doc(db, "organizations", localStorage.getItem("createOrganizationId"))
        ).then(() => {
          localStorage.removeItem("createOrganizationId");
          setClose();
          // dispatch(openOrganizationFunc(null, false));
        });
      }

      // some code
    } else {
      // some code
    }
  };

  const handleRestart = async () => {
    const answer = window.confirm(
      "Wenn du den Prozess neustartest, wird die Organisation, die du gerade erstellst gelöscht"
    );
    if (answer) {
      if (type === "projectRoom") {
        localStorage.removeItem("createProjectRoomOrganizationId");
        localStorage.removeItem("createProjectRoomId");
        setClose();
        setTimeout(() => {
          dispatch(openCreateProjectRoomFunc(true));
        }, 100);
      } else {
        localStorage.removeItem("createOrganizationId");
        setClose();
        setTimeout(() => {
          dispatch(stateCreateOrganizationsFunc(true));
        }, 100);
      }
    }
  };
  return (
    <Wrapper>
      <Box
        margin={document.body.clientWidth > 768 ? "10px" : "15px 5px"}
        justifyContent="space-between"
      >
        {index !== 0 && index !== 1 && (
          // <StyledIcon
          //   onClick={() => setSettingsOpen(true)}
          //   src={SettingsIcon}
          //   width="100%"
          //   alt="project-thumbnail"
          // />
          <DropdownButton
            variant="white"
            icon="More"
            width="height"
            data={[
              {
                onClick: handleRestart,
                text: t("restart"),
                leadingIcon: "Edit",
              },
              {
                onClick: handleDelete,
                text:
                  type === "projectRoom"
                    ? "Projektraum löschen"
                    : "Organisation löschen",
                leadingIcon: "Delete",
              },
            ]}
          />
        )}
        {/* <ProgressLine>
        <CurrentStep index={index} />
      </ProgressLine> */}
        <TitlesWrapper>
          {title && <Title>{title}</Title>}
          <StyledH2
            fontWeight="900"
            textAlign="center"
            fontSize="24px"
            margin="0px 50px"
          >
            {isMobileCustom && pagesData[index].mobileTitle
              ? pagesData[index].mobileTitle
              : pagesData[index].title}
          </StyledH2>
        </TitlesWrapper>

        <div />
      </Box>
      <SVGWrapper>
        {isMobileCustom ? (
          <svg
            width="100%"
            height="106"
            viewBox="0 0 400 127"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 109.5V0H421V102.5C370 118.5 359 106 343 103.5C322.158 100.243 296 93.3391 263.303 107.934C209.319 132.03 151.529 95.6048 85 118.5C46.0731 131.896 13.7423 108.668 0 109.5Z"
              fill="#FED957"
            />
          </svg>
        ) : (
          <svg
            width="100%"
            height="156"
            viewBox="0 0 1100 126"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
              fill="#FED957"
            />
          </svg>
        )}
      </SVGWrapper>
      <SVGWrapper2 currentStep={currentStep}>
        {isMobileCustom ? (
          <svg
            width="100%"
            height="106"
            viewBox="0 0 400 127"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 109.5V0H421V102.5C370 118.5 359 106 343 103.5C322.158 100.243 296 93.3391 263.303 107.934C209.319 132.03 151.529 95.6048 85 118.5C46.0731 131.896 13.7423 108.668 0 109.5Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            width="100%"
            height="156"
            viewBox="0 0 1100 126"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 125.5V0.5H1130.5V99C1025 143 974.588 95.9476 942.5 83C828.5 37 819 43.5 704 62.5C558 86.6217 307.5 44.5 196 99C128.785 131.854 37.1667 124.667 0 125.5Z"
              fill="white"
            />
          </svg>
        )}
      </SVGWrapper2>
    </Wrapper>
  );
};

export default TopNavigation;
