/** @format */
import React from "react";
import { Translation } from "react-i18next";
import Image from "../images/insightsCovers/agegroups-cover.jpg";
import InitiativesIcon from "../images/icons/organizationTypes/initiatives.png";

const organizationTypes = [
  {
    name: "Vereine", //  Association
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_association")}</span>}
      </Translation>
    ),
    color: "#f8a9a0",
    img: Image,
    icon: InitiativesIcon,
    svgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path
          d="M 2.161 4 L 13.839 4 C 13.946 4 14.046 3.949 14.109 3.862 C 14.172 3.776 14.189 3.665 14.156 3.563 C 13.467 1.467 10.939 0 8 0 C 5.061 0 2.533 1.467 1.844 3.563 C 1.811 3.665 1.828 3.776 1.891 3.862 C 1.954 3.949 2.054 4 2.161 4 Z M 15.5 16 C 15.776 16 16 15.776 16 15.5 C 16 15.224 15.776 15 15.5 15 L 15.177 15 C 15.06 15 14.952 14.939 14.891 14.838 L 14.286 13.829 C 14.226 13.728 14.117 13.667 14 13.667 L 2 13.667 C 1.883 13.667 1.774 13.728 1.714 13.829 L 1.109 14.838 C 1.048 14.939 0.94 15 0.823 15 L 0.5 15 C 0.224 15 0 15.224 0 15.5 C 0 15.776 0.224 16 0.5 16 Z"
          fill="rgb(0,0,0)"
        ></path>
        <path
          d="M 2.333 13 C 2.149 13 2 12.851 2 12.667 L 2 8.333 C 2 8.149 2.149 8 2.333 8 L 3.667 8 C 3.851 8 4 8.149 4 8.333 L 4 12.667 C 4 12.851 3.851 13 3.667 13 Z"
          fill="rgb(0,0,0)"
        ></path>
        <path
          d="M 5.667 13 C 5.483 13 5.333 12.851 5.333 12.667 L 5.333 8.333 C 5.333 8.149 5.483 8 5.667 8 L 7 8 C 7.184 8 7.333 8.149 7.333 8.333 L 7.333 12.667 C 7.333 12.851 7.184 13 7 13 Z"
          fill="rgb(0,0,0)"
        ></path>
        <path
          d="M 9 13 C 8.816 13 8.667 12.851 8.667 12.667 L 8.667 8.333 C 8.667 8.149 8.816 8 9 8 L 10.333 8 C 10.517 8 10.667 8.149 10.667 8.333 L 10.667 12.667 C 10.667 12.851 10.517 13 10.333 13 Z"
          fill="rgb(0,0,0)"
        ></path>
        <path
          d="M 12.333 13 C 12.149 13 12 12.851 12 12.667 L 12 8.333 C 12 8.149 12.149 8 12.333 8 L 13.667 8 C 13.851 8 14 8.149 14 8.333 L 14 12.667 C 14 12.851 13.851 13 13.667 13 Z"
          fill="rgb(0,0,0)"
        ></path>
        <path
          d="M 1.275 6.878 C 1.366 7.15 1.62 7.333 1.907 7.333 L 14.093 7.333 C 14.38 7.333 14.635 7.15 14.726 6.877 L 15.17 5.544 C 15.238 5.341 15.204 5.117 15.078 4.944 C 14.953 4.77 14.752 4.667 14.538 4.667 L 1.462 4.667 C 1.248 4.667 1.047 4.77 0.922 4.944 C 0.796 5.117 0.762 5.341 0.83 5.544 Z"
          fill="rgb(0,0,0)"
        ></path>
      </svg>
    ),
  },
  {
    name: "Initiativen", //  Initiatives
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_initiatives")}</span>}
      </Translation>
    ),
    color: "#d2a6e5",
    img: Image,
    svgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14">
        <path
          d="M 3 0 C 4.657 0 6 1.343 6 3 C 6 4.657 4.657 6 3 6 C 1.343 6 0 4.657 0 3 C 0 1.343 1.343 0 3 0 Z M 11 0 C 12.657 0 14 1.343 14 3 C 14 4.657 12.657 6 11 6 C 9.343 6 8 4.657 8 3 C 8 1.343 9.343 0 11 0 Z M 3 8 C 4.657 8 6 9.343 6 11 C 6 12.657 4.657 14 3 14 C 1.343 14 0 12.657 0 11 C 0 9.343 1.343 8 3 8 Z M 11 8 C 12.657 8 14 9.343 14 11 C 14 12.657 12.657 14 11 14 C 9.343 14 8 12.657 8 11 C 8 9.343 9.343 8 11 8 Z"
          fill="hsl(0, 0%, 0%)"
        ></path>
      </svg>
    ),
  },
  {
    name: "Planungsbüros", //  Planners
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_planners")}</span>}
      </Translation>
    ),
    color: "#92b7b2",
    img: Image,
  },
  {
    name: "Politik", //  Politics
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_politics")}</span>}
      </Translation>
    ),
    color: "#ffc473",
    img: Image,
  },
  {
    name: "Stadverwaltung", //  Administration
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_administration")}</span>}
      </Translation>
    ),
    color: "#d92d46",
    img: Image,
  },
  {
    name: "Presse", //  Press
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_press")}</span>}
      </Translation>
    ),
    color: "#7293b9",
    img: Image,
  },
  {
    name: "Sonstige", //  Others
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_other")}</span>}
      </Translation>
    ),
    color: "#f1cb00",
    img: Image,
  },
];

export default organizationTypes;
