/** @format */

import React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import _ from "lodash";

export function OptionsProjects() {
  const { projects } = useSelector((state) => state.data);
  const { t } = useTranslation();

  const optionsProjectsInitial = [
    { name: "", label: "Allgemein (Alle Ideen)" },
  ];
  const optionsProjectsArray = _.orderBy(projects, "createdAt", "desc").map(
    (project) => ({
      name: project.project,
      label: project.title,
      img: project.imgUrl,
    })
  );

  var optionsProjects = [...optionsProjectsInitial, ...optionsProjectsArray];

  return optionsProjects;
}
