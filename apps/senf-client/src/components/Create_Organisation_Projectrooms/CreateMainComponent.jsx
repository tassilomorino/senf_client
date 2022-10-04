/** @format */

import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { useTransition, animated } from "@react-spring/web";

// firebase
import { collection, doc, getDoc } from "firebase/firestore";
import { useModals } from "senf-atomic-design-system";
import { db } from "../../firebase";

// Components
import { PageWrapper } from "./styles/sharedStyles";
import TopNavigation from "./Components/TopNavigation";
import CreateProjectPage0b from "./CreateProjectRoom_components/CreateProjectPage0b";
import CreateProjectPage1 from "./CreateProjectRoom_components/CreateProjectPage1";
import CreateProjectPage2 from "./CreateProjectRoom_components/CreateProjectPage2";
import CreateProjectPage3 from "./CreateProjectRoom_components/CreateProjectPage3";
import CreateProjectPage4 from "./CreateProjectRoom_components/CreateProjectPage4";
import CreateProjectPagePreview from "./CreateProjectRoom_components/CreateProjectPreview";
import CreateOrganizationPage0a from "./Organization_components/CreateOrganizationPage0a";
import CreateOrganizationPage0b from "./Organization_components/CreateOrganizationPage0b";
import CreateOrganizationPage1 from "./Organization_components/CreateOrganizationPage1";
import CreateOrganizationPage2 from "./Organization_components/CreateOrganizationPage2";
import CreateOrganizationPage3 from "./Organization_components/CreateOrganizationPage3";
import CreateOrganizationPage4 from "./Organization_components/CreateOrganizationPage4";
import CreateOrganizationPage5 from "./Organization_components/CreateOrganizationPage5";
import CreateOrganizationPage6 from "./Organization_components/CreateOrganizationPage6";

import CreateOrganizationPagePreview from "./Organization_components/CreateOrganizationPreview";
// Redux
import {
  getOrganizations,
  openOrganizationFunc,
} from "../../redux/actions/organizationActions";
import {
  getProjects,
  openProjectRoomFunc,
} from "../../redux/actions/projectActions";
import CreateProjectPage5 from "./CreateProjectRoom_components/CreateProjectPage5";
import CreateProjectPage0a from "./CreateProjectRoom_components/CreateProjectPage0a";

const CreateProjectDialog = ({ type }) => {
  const { closeModal } = useModals();

  const userId = useSelector((state) => state.user.userId);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [projectRoomTitle, setProjectRoomTitle] = useState(null);
  const [projectRoomContact, setProjectRoomContact] = useState(null);
  const [projectRoomWeblink, setProjectRoomWeblink] = useState(null);
  const [projectRoomImage, setProjectRoomImage] = useState(null);
  const [projectRoomArea, setProjectRoomArea] = useState(null);
  const [projectRoomCalendar, setProjectRoomCalendar] = useState(null);
  const [projectRoomTeam, setProjectRoomTeam] = useState(null);

  const [organizationTitle, setOrganizationTitle] = useState(null);

  const [index, set] = useState(0);

  useEffect(() => {
    async function fetchData() {
      if (type === "projectRoom") {
        // IF EDITING A PROJECTROOM
        if (localStorage.getItem("createProjectRoomPostEdit")) {
          set(pages.length - 1);
        }

        // IF CONTINUING TO WORK ON A PROJECTROOM
        if (
          typeof Storage !== "undefined" &&
          localStorage.getItem("createProjectRoomId")
        ) {
          set(pages.length - 1);

          const ref = doc(
            db,
            `organizations/${localStorage.getItem(
              "createProjectRoomOrganizationId"
            )}/projectRooms/${localStorage.getItem("createProjectRoomId")}`
          );
          const organizationDocSnapshot = await getDoc(ref);
          console.log(organizationDocSnapshot);
          if (!organizationDocSnapshot.exists()) {
            console.log("No such document!");
          } else {
            const data = organizationDocSnapshot.data();
            if (data.title) {
              setProjectRoomTitle(data.title);
            }
            if (data.contact) {
              setProjectRoomContact(data.contact);
            }
            if (data.weblink) {
              setProjectRoomWeblink(data.weblink);
            }
            // if(data.title){
            //   setProjectRoomImage(data.title);
            // }
            if (data.geoData) {
              setProjectRoomArea(data.geoData);
            }
          }
        }
      } else if (type === "organization") {
        // IF EDITING A ORGANIZATION
        if (localStorage.getItem("createOrganizationPostEdit")) {
          set(pages.length - 1);
        }

        // IF CONTINUING TO WORK ON A ORGANIZATION

        if (
          typeof Storage !== "undefined" &&
          localStorage.getItem("createOrganizationId")
        ) {
          const orgDocRef = doc(
            db,
            `organizations/${localStorage.getItem("createOrganizationId")}`
          );
          const orgDocSnapshot = await getDoc(orgDocRef);

          if (!orgDocSnapshot.exists()) {
            console.log("No such document!");
          } else {
            const data = orgDocSnapshot.data();
            setOrganizationTitle(data.title);
            console.log("setting org title");
            set(pages.length - 1);
          }
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
    },
    // leave: {
    //   opacity: 0,
    //   transform: `translateX(${leaveValue}%)`,
    //   config: { duration: 300 },
    // },
  });

  const setClose = () => {
    dispatch(getOrganizations());
    dispatch(getProjects());

    closeModal();

    // dispatch(openCreateProjectRoomFunc(false));
    // dispatch(stateCreateOrganizationsFunc(false));

    if (localStorage.getItem("createOrganizationId")) {
      dispatch(
        openOrganizationFunc(localStorage.getItem("createOrganizationId"), true)
      );
    }
    if (localStorage.getItem("createProjectRoomId")) {
      dispatch(
        openProjectRoomFunc(localStorage.getItem("createProjectRoomId"), true)
      );
    }

    if (localStorage.getItem("createOrganizationPostEdit") === "true") {
      localStorage.removeItem("createOrganizationPostEdit");
    }
    localStorage.removeItem("createOrganizationId");

    if (localStorage.getItem("createProjectRoomPostEdit") === "true") {
      localStorage.removeItem("createProjectRoomPostEdit");
    }
    localStorage.removeItem("createProjectRoomId");
  };
  const pagesData =
    type === "projectRoom"
      ? [
          // {
          //   title: t("createProjectRoomPage0aTitle"),
          //   mobileTitle: t("createProjectRoomPage0aMobileTitle"),
          //   subTitle: t("createProjectRoomPage0aSubTitle"),
          // },

          {
            title: t("createProjectRoomPage0bTitle"),
            mobileTitle: t("createProjectRoomPage0bMobileTitle"),
            subTitle: t("createProjectRoomPage0bSubTitle"),
          },

          {
            title: t("createProjectRoomPage1Title"),
            subTitle: t("createProjectRoomPage1SubTitle"),
          },
          {
            title: t("createProjectRoomPage2Title"),
            subTitle: t("createProjectRoomPage2SubTitle"),
          },
          {
            title: t("createProjectRoomPage3Title"),
            subTitle: t("createProjectRoomPage3SubTitle"),
          },
          {
            title: t("createProjectRoomPage4Title"),
            subTitle: t("createProjectRoomPage4SubTitle"),
          },
          {
            title: t("createProjectRoomPage5Title"),
            subTitle: t("createProjectRoomPage5SubTitle"),
          },

          {
            title: t("createProjectRoomPage7Title"),
            subTitle: t("createProjectRoomPage7SubTitle"),
          },
        ]
      : [
          {
            title: t("createOrganizationPage0aTitle"),
            mobileTitle: t("createOrganizationPage0aMobileTitle"),
            subTitle: t("createOrganizationPage0aSubTitle"),
          },
          {
            title: t("createOrganizationPage0bTitle"),
            subTitle: t("createOrganizationPage0bSubTitle"),
          },
          {
            title: t("createOrganizationPage1Title"),
            subTitle: t("createOrganizationPage1SubTitle"),
          },
          {
            title: t("createOrganizationPage2Title"),
            subTitle: t("createOrganizationPage2SubTitle"),
          },
          {
            title: t("createOrganizationPage3Title"),
            subTitle: t("createOrganizationPage3SubTitle"),
          },
          {
            title: t("createOrganizationPage4Title"),
            subTitle: t("createOrganizationPage4SubTitle"),
          },
          {
            title: t("createOrganizationPage5Title"),
            subTitle: t("createOrganizationPage5SubTitle"),
          },
          {
            title: t("createOrganizationPage6Title"),
            subTitle: t("createOrganizationPage6SubTitle"),
            subTitle2: t("createOrganizationPage6SubTitle2"),
          },
          {
            title: t("createOrganizationPage7Title"),
            subTitle: t("createOrganizationPage7SubTitle"),
          },
        ];

  const pages =
    type === "projectRoom"
      ? [
          // ({ style }) => (
          //   <PageWrapper>
          //     <CreateProjectPage0a
          //       onClickNext={onClickNext}
          //       pagesData={pagesData}
          //       index={index}
          //     />
          //   </PageWrapper>
          // ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage0b
                onClickNext={onClickNext}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage1
                onClickNext={onClickNext}
                set={set}
                pagesData={pagesData}
                index={index}
                setTitle={setProjectRoomTitle}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage2
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper
            /* style={{
              ...style,
            }} */
            >
              <CreateProjectPage3
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage4
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPage5
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateProjectPagePreview
                onClickPrev={onClickPrev}
                setClose={setClose}
                set={set}
                pagesData={pagesData}
                listItems={pagesData.slice(1, -1)}
                index={index}
                projectRoomTitle={projectRoomTitle}
              />
            </PageWrapper>
          ),
        ]
      : [
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage0a
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage0b
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage1
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                setTitle={setOrganizationTitle}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage2
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage3
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage4
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage5
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPage6
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                set={set}
                pagesData={pagesData}
                index={index}
              />
            </PageWrapper>
          ),
          ({ style }) => (
            <PageWrapper>
              <CreateOrganizationPagePreview
                onClickNext={onClickNext}
                onClickPrev={onClickPrev}
                setClose={setClose}
                set={set}
                pagesData={pagesData}
                listItems={pagesData.slice(1, -1)}
                index={index}
              />
            </PageWrapper>
          ),
        ];

  const currentStep = (100 / (pages.length - 1)) * index;

  return (
    <div style={{ height: "2000px", maxHeight: "100%" }}>
      <TopNavigation
        currentStep={currentStep}
        index={index}
        pagesData={pagesData}
        title={type === "projectRoom" ? projectRoomTitle : organizationTitle}
        setClose={setClose}
        type={type}
      />

      {transitions((style, i) => {
        const Page = pages[i];
        return <Page style={style} />;
      })}
    </div>
  );
};

export default CreateProjectDialog;
