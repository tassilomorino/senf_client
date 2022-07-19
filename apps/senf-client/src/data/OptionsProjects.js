/** @format */

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function OptionsProjects() {
  const projects = useSelector((state) => state.data.projects);
  const { t } = useTranslation();

  const optionsProjectsInitial = [{ value: "", label: t("all_ideas") }];
  const optionsProjectsArray = projects
    ?.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    })
    .map((project) => ({
      value: project.projectRoomId,
      label: project.title,
      img: project.imgUrl,
    }));

  const optionsProjects = [...optionsProjectsInitial, ...optionsProjectsArray];

  return optionsProjects;
}
