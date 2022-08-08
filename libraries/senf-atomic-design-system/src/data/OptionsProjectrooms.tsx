/** @format */

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function OptionsProjectrooms(projectrooms) {
  const { t } = useTranslation();

  const optionsProjectsArray = projectrooms

    .map((project) => ({
      value: project.projectRoomId,
      label: project.title,
      img: project.imgUrl,
    }))
    .sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    });
  const optionsProjectrooms = [
    { value: "", label: t("all_ideas") },
    ...optionsProjectsArray,
  ];

  return optionsProjectrooms;
}
