/** @format */

import React from "react";
import {
  MuiThemeProvider,
  NativeSelect,
  createMuiTheme,
} from "@material-ui/core";

//Images
import Arrow from "../../images/icons/sort.png";
import { useTranslation } from "react-i18next";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&&&&:before": {
          borderBottom: "1px solid rgba(0, 0, 0, 0)",
        },
        "&&&&:after": {
          borderBottom: "1px solid rgba(255, 255, 255, 0)",
        },
      },
    },
    MuiNativeSelect: {
      icon: {
        opacity: 0,
      },
    },
  },
});
const SortingSelect = ({ dropdown, handleDropdown }) => {
  const { t } = useTranslation();
  return (
    <MuiThemeProvider theme={theme}>
      <NativeSelect
        value={dropdown}
        onChange={handleDropdown}
        name="dropdown"
        className="formControl"
        inputProps={{ "aria-label": "dropdown" }}
        id="dropdown"
        IconComponent={() => (
          <img
            src={Arrow}
            width="20px"
            style={{
              marginTop: "0px",
              marginLeft: "-24px",
              pointerEvents: "none",
            }}
          ></img>
        )}
      >
        <option value={10}>{t("newest")}</option>
        <option value={20}>{t("hottest")}</option>
      </NativeSelect>
    </MuiThemeProvider>
  );
};

export default SortingSelect;
