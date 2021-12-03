/** @format */

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function OptionsMyProjects() {
  const { t } = useTranslation();
  const projects = useSelector((state) => state.data.projects);
  const organizationId = useSelector((state) => state.user.organizationId);
  const orgData_organizationId = organizationId;

  const myProjects = projects.filter(({ organizationId }) =>
    orgData_organizationId.includes(organizationId)
  );

  const optionsProjectsArray = myProjects
    ?.sort(function (a, b) {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    })
    .map((project) => ({
      name: project.project,
      label: project.title,
      img: project.imgUrl,
    }));

  return optionsProjectsArray;
}
