/** @format */

import React from "react";

export interface ModalOptions {
  title?: string;
  description?: string;
  onSubmit?: () => any | void;
  onClose?: () => void;
  setOpacity?: (opacity: number) => void;
  index?: number;
  submitDisabled?: boolean;
  submitText?: string;
  submitLoading?: boolean;
  cancelText?: string;
  size?: "full" | "xl" | "lg" | "md" | "sm" | "l" | "m" | "s";
  children?: React.ReactNode | React.ReactNode[];
  height?: number;
  swipe?: boolean;
  style?: React.CSSProperties;
  replace?: boolean,
  beforeOpen?: () => void;
  afterOpen?: () => void;
  beforeClose?: () => void;
  afterClose?: () => void;
  isMobile?: boolean;
  maxHeight?: number;
}

export interface ModalProps {
  type: React.ComponentType;
  props: React.HTMLProps<HTMLElement>;
  options?: ModalOptions;
}

export interface ModalContainerProps {
  item: ModalProps,
  index: number,
  style?: React.CSSProperties & { shading: number, y: number },
  closeModal: () => void,

}
export interface ModalStackValue {
  /**
   * Opens a modal using the provided component, clearing all open modals
   */
  setModal: (
    modal: React.ComponentElement<ModalProps, React.Component<ModalProps>>,
    options?: ModalOptions
  ) => any
  /**
   * Opens a modal using the provided component, on top of the stack
   */
  openModal: (
    modal: React.ComponentElement<ModalProps, React.Component<ModalProps>>,
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

