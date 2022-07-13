/** @format */

import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export function OptionsProjectrooms({ projectrooms }) {
  const { t } = useTranslation();

  const optionsProjectsInitial = [{ name: "", label: t("all_ideas") }];
  const optionsProjectsArray = projectrooms
    ?.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      }
      return 0;
    })
    .map((project) => ({
      name: project.projectRoomId,
      label: project.title,
      img: project.imgUrl,
    }));

  const optionsProjectrooms = [
    ...optionsProjectsInitial,
    ...optionsProjectsArray,
  ];

  return optionsProjectrooms;
}
