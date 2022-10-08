/** @format */
import { ThemeProvider } from "styled-components";
import { addDecorator } from "@storybook/react";
import { withThemes } from "@react-theming/storybook-addon";
import GlobalStyle from "../src/styles/globals";
import theme from "../src/styles/theme";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import ModalProvider from "../src/components/molecules/modalStack/ModalProvider";

import i18n from "../src/util/i18n";
import React from "react";
import { I18nextProvider, useTranslation } from "react-i18next";

export const decorators = [
  (Story) => (
    <React.Suspense fallback="Loading">
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <ModalProvider>
            <GlobalStyle />
            <Story />
            <div id="portal-root-modal" />
            <div id="portal-root-dialog" />
          </ModalProvider>
        </ThemeProvider>
      </I18nextProvider>
    </React.Suspense>
  ),
];

const backgrounds = [
  "grey-300",
  "white",
  "primary",
  "blend-shade-primary-bg"
]

export const parameters = {
  i18n,
  locale: "de",
  locales: {
    en: { title: "English", left: "🇺🇸" },
    de: { title: "German", left: "🇩🇪" },
  },
  actions: { argTypesRegex: "^on[A-Z].*" },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
  layout: "fullscreen",
  backgrounds: {
    default: backgrounds[0],
    values: backgrounds.map(e => ({ name: e, value: theme.colors.palette[e] }))
  },
};
