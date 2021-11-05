/** @format */

import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const ErrorBackground = ({ loading }) => {
  const { t } = useTranslation();
  const errors = useSelector((state) => state.UI.errors);
  return (
    !loading &&
    errors && (
      <div className="errorBackground">
             <div className="homeHeader"> Ooops! </div>
        <br />
        <span className="oopsText">{t("something_went_wrong")}</span>
      </div>
    )
  );
};

export default ErrorBackground;
