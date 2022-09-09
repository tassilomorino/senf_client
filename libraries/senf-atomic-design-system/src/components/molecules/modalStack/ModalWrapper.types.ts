/** @format */

import React from "react";

export interface ModalOptions {
  title?: string;
  description?: string;
  onSubmit?: () => void;
  onClose?: () => void;
  setOpacity?: (opacity: number) => void;
  index?: number;
  submitDisabled?: boolean;
  submitText?: string;
  submitLoading?: boolean;
  cancelText?: string;
  size?: "full" | "xl" | "lg" | "md" | "sm";
  children?: React.ReactNode | React.ReactNodeArray;
  height?: number;
  swipe?: boolean;
  style?: React.CSSProperties;
  replace?: boolean,
  beforeOpen?: () => void;
  afterOpen?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
}
export interface ModalProps {
  type: React.ComponentType;
  props: React.HTMLProps;
  options: ModalOptions;
}

export interface ModalStackValue {
  /**
   * Opens a modal using the provided component, clearing all open modals
   */
  setModal: (
    modal: React.Component,
    options?: ModalOptions
  ) => any
  /**
   * Opens a modal using the provided component, on top of the stack
   */
  openModal: (
    modal: React.Component,
    options?: ModalOptions
  ) => any

  /**
   * Closes the active modal
   */
  closeModal: () => void

  /**
   * Closes the number of modals
   */
  closeModals: (amount?: number) => void

  /**
   * Closes all modals
   */
  closeAllModals: () => void

  stack: ModalProps[]
}

