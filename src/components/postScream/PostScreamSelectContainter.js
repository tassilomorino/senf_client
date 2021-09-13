/** @format */

import React from "react";
import _ from "lodash";
import { useTranslation } from "react-i18next";
import { isMobileCustom } from "../../util/customDeviceDetect";
import Select from "../module/Select";

const PostScreamSelectContainter = ({
  classes,
  locationDecided,
  handleLocationDecided,
  handleLocationDecidedNoLocation,
  project,
  address,
  handleDropdownProject,
  open,
  loadingProjects,
  projectsData,
}) => {
  const { t } = useTranslation();

  const projectsArray =
    open && !loadingProjects ? (
      <>
        {_.orderBy(projectsData, "createdAt", "desc").map((projects) => (
          <option value={projects.project} className={classes.formText}>
            +{projects.title}
          </option>
        ))}
      </>
    ) : null;

  return (
    <div
      className="selectLocationContainer"
      style={
        !isMobileCustom && locationDecided
          ? { zIndex: 1 }
          : !isMobileCustom && !locationDecided
          ? { zIndex: 5 }
          : isMobileCustom && locationDecided
          ? {
              position: "fixed",
              bottom: "calc(90vh - 50px)",
              display: "none",
            }
          : {
              position: "fixed",
              bottom: "20px",
              display: "block",
            }
      }
    >
      {!isMobileCustom && (
        <div
          onClick={handleLocationDecided}
          style={
            locationDecided
              ? {
                  display: "block",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#000000",
                  position: "absolute",
                  zIndex: 99999,
                  opacity: 0.6,
                  borderRadius: "19px",
                }
              : {
                  display: "none",
                }
          }
        ></div>
      )}
      <div className="projectSelectContainer">
        <span className={classes.boldText}> {t("to")} </span>

        <Select
          name={"project"}
          value={project}
          initialValue={"Allgemein (Alle Ideen)"}
          valuesArray={projectsArray}
          handleDropdown={handleDropdownProject}
        />
      </div>
      <br />
      <button
        className={
          project !== ""
            ? "buttonWide buttonSelectLocationNo_hide"
            : "buttonWide buttonSelectLocationNo"
        }
        onClick={handleLocationDecidedNoLocation}
      >
        {t("withoutLocationShort")}
      </button>
      <button
        className={
          address === "Ohne Ortsangabe"
            ? "buttonWide buttonSelectLocation_hide"
            : "buttonWide buttonSelectLocation"
        }
        onClick={handleLocationDecided}
      >
        {t("confirmLocation")}
      </button>
    </div>
  );
};

export default PostScreamSelectContainter;
