/** @format */

import React from "react";

export interface ModalWrapperProps {
  title?: string;
  description?: string;
  onSubmit?: () => void;
  setOpacity?: (opacity: number) => void;
  index?: number;
  submitDisabled?: boolean;
  submitText?: string;
  cancelText?: string;
  size?: "full" | "xl" | "lg" | "md" | "sm";
  children?: React.ReactNode | React.ReactNodeArray;
  height?: number;
  swipe?: boolean;
}