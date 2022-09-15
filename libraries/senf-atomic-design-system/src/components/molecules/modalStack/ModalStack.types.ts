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
  beforeOpen?: () => Promise<void>;
  afterOpen?: () => Promise<void>;
  beforeClose?: () => Promise<void>;
  afterClose?: () => Promise<void>;
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
  stack: ModalProps[]
  /**
   * Opens a modal using the provided component, clearing all open modals
   */
  setModal: (
    modal: React.ComponentElement<ModalProps, React.Component<ModalProps>>,
    options?: ModalOptions
  ) => Promise<ModalProps[]>
  /**
   * Opens a modal using the provided component, on top of the stack
   */
  openModal: (
    modal: React.ComponentElement<ModalProps, React.Component<ModalProps>>,
    options?: ModalOptions
  ) => Promise<ModalProps[]>

  /**
   * Closes the active modal
   */
  closeModal: () => Promise<ModalProps[]>

  /**
   * Closes the number of modals
   */
  closeModals: (amount?: number) => ModalProps[]

  /**
   * Closes all modals
   */
  closeAllModals: () => ModalProps[]
}

