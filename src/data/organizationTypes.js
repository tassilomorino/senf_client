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
    color: "#bd98f6",
  },
  {
    name: "Initiativen", //  Initiatives
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_initiatives")}</span>}
      </Translation>
    ),
    color: "#91dff4",
  },
  {
    name: "Planungsbüros", //  Environment and Green
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_ecoAndGreen")}</span>}
      </Translation>
    ),
    color: "#8dd9b8",
  },
  {
    name: "Politik", //  Bicycle
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_bike")}</span>}
      </Translation>
    ),
    color: "#929df6",
  },
  {
    name: "Stadverwaltung", //  Inclusion / Social
    label: (
      <Translation>
        {(t, { i18n }) => (
          <span>{t("organizationTypes_inclusionAndSocial")}</span>
        )}
      </Translation>
    ),
    color: "#e8907e",
  },
  {
    name: "Presse", //  Sports / Leisure
    label: (
      <Translation>
        {(t, { i18n }) => (
          <span>{t("organizationTypes_sportsAndLeisure")}</span>
        )}
      </Translation>
    ),
    color: "#f6c095",
  },
  {
    name: "Sonstige", //  Others
    label: (
      <Translation>
        {(t, { i18n }) => <span>{t("organizationTypes_other")}</span>}
      </Translation>
    ),
    color: "#f9db95",
  },
];

export default organizationTypes;
