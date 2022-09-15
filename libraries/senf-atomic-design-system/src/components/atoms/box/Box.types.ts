/** @format */

import { MouseEventHandler } from "react";

export interface BoxProps {
  onClick?: () => void;
  display?: "flex" | "inline-flex" | "inline" | "block" | "none";
  flexDirection?: "column" | "row";
  gap?: string;
  height?: string;
  width?: string;
  maxWidth?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginBlock?: string;
  marginInline?: string;
  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingBlock?: string;
  paddingInline?: string;
  top?: string;
  bottom?: string;
  transform?: string;
  pointerEvents?: "auto" | "none";
  transition?: string;
  left?: string | number;
  right?: string | number;
  zIndex?: string | number;
  alignItems?: "flex-start" | "center" | "flex-end";
  justifyContent?: "flex-start" | "center" | "flex-end";
  flexWrap?: "nowrap" | "wrap" | "wrap-reverse";
  position?: "fixed" | "absolute" | "relative" | "sticky";
  onclick?: MouseEventHandler;
}
