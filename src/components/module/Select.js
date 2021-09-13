/** @format */

import React from "react";
import {
  MuiThemeProvider,
  NativeSelect,
  createMuiTheme,
} from "@material-ui/core";

//Images
import Arrow from "../../images/icons/arrow.png";
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

//Initialvalue =  Allgemein (Alle Ideen)

const Select = ({ name, value, initialValue, valuesArray, handleDropdown }) => {
  const { t } = useTranslation();

  return (
    <MuiThemeProvider theme={theme}>
      <NativeSelect
        value={value}
        onChange={handleDropdown}
        name={name}
        className="selectCustom" //not yet defined
        inputProps={{ "aria-label": name }}
        id={name}
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
        {initialValue && <option value="">{initialValue}</option>}

        {valuesArray}
      </NativeSelect>
    </MuiThemeProvider>
  );
};

export default Select;
