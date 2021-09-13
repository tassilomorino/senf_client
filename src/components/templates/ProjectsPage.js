/** @format */

import React from "react";
import { useTranslation } from "react-i18next";

//Icons
import AddIcon from "../../images/icons/plus_grey.png";

//Components
import ProjectCards from "../projectComponents/ProjectCards";

import _ from "lodash";

const ProjectsPage = ({ loadingProjects, order, projects }) => {
  const { t } = useTranslation();
  const createProject = () => {
    var link =
      "mailto:dein@senf.koeln" +
      "?subject=" +
      escape("Projektraum-Anfrage") +
      "&body=" +
      escape(
        "Projektraum-Titel:" +
          "\n" +
          "\n" +
          "Worum geht's:" +
          "\n" +
          "\n" +
          "Projektzeitraum:" +
          "\n" +
          "\n" +
          "Logo + Cover-Bild:"
      );
    window.location.href = link;
  };

  return (
    <div className="MainAnimationChannels">
      {order === 2 && (
        <div>
          <div className="homeHeadermain"></div>

          <div className="MainAnimation">
            <div
              style={{
                fontSize: "14pt",
                color: "#414345",
                width: "90%",

                textAlign: "left",
                marginLeft: "5%",
                paddingBottom: "15px",
                zIndex: 0,
              }}
            >
              {t("projectrooms_description")}
            </div>
            <br />
            {!loadingProjects ? (
              _.orderBy(projects, "createdAt", "desc").map((projects) => (
                <ProjectCards key={projects.project} project={projects} />
              ))
            ) : (
              <div className="MainAnimation">
                <div className="no-ideas-yet">{t("projectrooms_loader")}</div>
              </div>
            )}
            {!loadingProjects && projects.length === 0 && (
              <div className="MainAnimation">
                <div className="no-ideas-yet">
                  {t("projectrooms_loading_error")}
                </div>
              </div>
            )}
            <br />
            <br />
            <br />

            <div className="projectCard" onClick={createProject}>
              <div className="leftWrapper" style={{ opacity: 0.5 }}>
                <img
                  src={AddIcon}
                  alt="profile"
                  className="profile-image"
                  width="50%"
                  style={{ width: "50%", marginLeft: "25%" }}
                />
              </div>
              <div className="rightWrapper">
                <div className="owner">
                  {" "}
                  {t("projectrooms_request_overTitle")}{" "}
                </div>
                <div className="title"> {t("projectrooms_request_title")}</div>
                <div className="date">{t("projectrooms_request_subTitle")}</div>
              </div>
            </div>

            <br />
            <br />
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
