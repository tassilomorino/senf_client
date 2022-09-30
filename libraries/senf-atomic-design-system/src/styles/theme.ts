/** @format */
import type { Theme } from "styled-system";
import { generateThemeColors, logColors } from "./helpers";

export type Color = {
  h: number;
  s: number;
  l: number;
};

export type ColorPallet = {
  [key: string]: Color;
};

const colors: ColorPallet = {
  primary: { h: 46, s: 100, l: 71 },
  shade: { h: 37, s: 100, l: 30 },
  grey: { h: 44, s: 15, l: 46 },
  text: { h: 36, s: 27, l: 11 },
};
const transparent: ColorPallet = {
  white: { h: 0, s: 0, l: 100 },
};
const categories: ColorPallet = {
  bike: { h: 227, s: 70, l: 68 },
  traffic: { h: 194, s: 75, l: 70 },
  social: { h: 10, s: 68, l: 70 },
  sports: { h: 27, s: 83, l: 77 },
  utilities: { h: 262, s: 85, l: 78 },
  environment: { h: 154, s: 50, l: 70 },
  other: { h: 42, s: 91, l: 78 },
};
const signal: ColorPallet = {
  red: { h: 2, s: 80, l: 60 },
  green: { h: 145, s: 100, l: 30 },
  blue: { h: 242, s: 81, l: 60 },
  orange: { h: 38, s: 100, l: 57 },
};
const luminance = [100, 75, 50, 25, 15, 10, 5];

const themeColors = {
  ...generateThemeColors(colors, luminance),
  ...generateThemeColors(transparent, luminance, false),
};
const categoryColors = generateThemeColors(categories, [100, 50]);
const signalColors = generateThemeColors(signal, [100, 85], [0, 0, 0]);

// for testing
// logColors({ ...themeColors, ...categoryColors, ...signalColors })

/**
 * @todo I think we should decide whether we return variables with a unit or without. My proposal is that we return units as numbers and assume pixel values. We can then provide a px-to-rem function and devs can transform the values to rem as well
 * @todo I also think the keys should be singular because I think it is more intuitive to use `theme.color.primary-100` or `theme.radius[0]
 */

const theme: Theme = {
  fontFamily: "Nunito",

  // SPACE are not complete/verified
  space: [0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44].map(
    (numInPX) => `${numInPX / 16}rem`
  ),

  // font sizes converted from px to default browsers rem (16 px base)
  fontSizes: [12, 14, 16, 20, 24, 32].map((numInPX) => numInPX / 16),
  fontWeights: [500, 600, 700, 800],

  lineHeight: [1.2, 1.3, 1.4, 1.5],
  letterSpacings: [0],

  // input and button height
  inputHeight: (size) => {
    switch (size) {
      case "sm":
      case "small":
        return "36px";
      case "md":
      case "medium":
        return "44px";
      case "lg":
      case "large":
      default:
        return "50px";
    }
  },
  inputPadding: (size) => {
    switch (size) {
      case "sm":
      case "small":
        return "0.5rem";
      case "md":
      case "medium":
        return "0.75rem";
      case "lg":
      case "large":
      default:
        return "0.875rem";
    }
  },

  // what exactly is SIZES? Do we need that?
  sizes: [],

  // should we split up BORDERS?? Is borderstyles really necessary? Bestpractices?
  borders: [],
  borderWidths: [0, 1, 2, 3],
  borderStyles: ["dashed", "solid"],

  // RADII are not complete/verified
  radii: [8, 10, 14, 18, 20, 24, 28, 30],

  // OPACITIES are not complete/verified
  opacities: [0.4, 0.6, 0.75],

  shadows: [
    "0px 12px 18px -8px",
    "0px 4px 6px -2px",
    "0px -4px 10px 4px",
    "0px -2px 5px 2px",
    "0px 12px 18px -10px",
    "0px 6px 8px -1px",
  ],

  // Does Louis define the TRANSITIONS??
  transitions: [],

  // bestpractice for ZINDICES??
  zIndices: [0, 1],

  colors: {
    ...themeColors,
    categories: categoryColors,
    signals: signalColors,
    primary: {
      primary160: "#d6ab00",
      primary140: "#e8ba02",
      primary120: "#f2c71c",
      primary100: "#fed957",
      primary75: "#fee381",
      primary50: "#feecab",
      primary35: "#fff2c4",
      primary20: "#fff7dd",
    },
    beige: {
      beige100: "#e2b736",
      beige75: "#e9c968",
      beige50: "#f0db9a",
      beige35: "#f5e6b9",
      beige20: "#f9f1d7",
      beige10: "#fcf8eb",
      beige75tra: "rgba(226, 183, 54, 0.75)",
      beige50tra: "rgba(226, 183, 54, 0.5)",
      beige35tra: "rgba(226, 183, 54, 0.35)",
      beige20tra: "rgba(226, 183, 54, 0.2)",
      beige10tra: "rgba(226, 183, 54, 0.1)",
    },
    shade: {
      shade100: "#",
      shade75: "#",
      shade50: "#",
      shade35: "#",
      shade20: "#",
      shade10: "#",
      shade75tra: "",
      shade50tra: "",
      shade35tra: "",
      shade20tra: "",
      shade10tra: "rgba(155, 95, 0, 0.1)",
    },
    brown: {
      brown100: "#baa04f",
      brown75: "#cbb87b",
      brown50: "#dccfa7",
      brown35: "#e7dec2",
      brown20: "#f1ecdc",
      brown10: "#F8F5ED",
      brown7: "#faf8f3",
      brown4: "#fcfbf8",
      brown75tra: "rgba(186, 160, 79, 0.75)",
      brown50tra: "rgba(186, 160, 79, 0.5)",
      brown35tra: "rgba(186, 160, 79, 0.35)",
      brown20tra: "rgba(186, 160, 79, 0.2)",
      brown10tra: "rgba(186, 160, 79, 0.1)",
      brown7tra: "rgba(186, 160, 79, 0.07)",
      brown4tra: "rgba(186, 160, 79, 0.04)",
    },
    greyscale: {
      greyscale100: "#c3baa2",
      greyscale75: "#d2cbb9",
      greyscale50: "#e1dcd0",
      greyscale35: "#eae7df",
      greyscale20: "#f3f1ec",
      greyscale10: "#f8f7f5",
      greyscale8: "#fafaf9",
      greyscale5: "#fcfcfb",
      greyscale75tra: "rgba(195, 186, 162, 0.75)",
      greyscale50tra: "rgba(195, 186, 162, 0.5)",
      greyscale35tra: "rgba(195, 186, 162, 0.35)",
      greyscale20tra: "rgba(195, 186, 162, 0.2)",
      greyscale10tra: "rgba(195, 186, 162, 0.11)",
      greyscale8tra: "rgba(192, 188, 175, 0.08)",
      greyscale5tra: "rgba(192, 188, 175, 0.05)",
    },
    black: {
      black100: "rgba(0, 0, 0, 1)",
      black80tra: "rgba(0, 0, 0, 0.8)",
      black60tra: "rgba(0, 0, 0, 0.6)",
      black40tra: "rgba(0, 0, 0, 0.4)",
      black30tra: "rgba(0, 0, 0, 0.3)",
    },
    white: {
      white100: "rgba(255, 255, 255, 1)",
      white80tra: "rgba(255, 255, 255, 0.8)",
      white60tra: "rgba(255, 255, 255, 0.6)",
      white50tra: "rgba(255, 255, 255, 0.5)",
      white40tra: "rgba(255, 255, 255, 0.4)",
      white30tra: "rgba(255, 255, 255, 0.3)",
      white20tra: "rgba(255, 255, 255, 0.2)",
    },
    signal: {
      redDark: "#ca3336",
      red: "#ff3c3e",
      greenDark: "#00857b",
      green: "#009a8e",
      blueDark: "#241ebe",
      blue: "#322bf3",
    },
    primaryHoverLayerShadowColor: "rgba(235, 184, 0, 0.5)",
  },
};

export default theme;
