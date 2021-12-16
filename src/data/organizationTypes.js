/** @format */
import React from "react";
import { Translation } from "react-i18next";

const organizationTypes = [
  {
    name: "Vereine", //  Association
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_association")}</span>}
      </Translation>
    ),
    color: "#f8a9a0",
  },
  {
    name: "Initiativen", //  Initiatives
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_initiatives")}</span>}
      </Translation>
    ),
    color: "#d2a6e5",
  },
  {
    name: "Planungsbüros", //  Planners
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_planners")}</span>}
      </Translation>
    ),
    color: "#92b7b2",
  },
  {
    name: "Politik", //  Politics
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_politics")}</span>}
      </Translation>
    ),
    color: "#ffc473",
  },
  {
    name: "Stadverwaltung", //  Administration
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_administration")}</span>}
      </Translation>
    ),
    color: "#d92d46",
  },
  {
    name: "Presse", //  Press
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_press")}</span>}
      </Translation>
    ),
    color: "#7293b9",
  },
  {
    name: "Sonstige", //  Others
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_other")}</span>}
      </Translation>
    ),
    color: "#f1cb00",
  },
];

export default organizationTypes;
