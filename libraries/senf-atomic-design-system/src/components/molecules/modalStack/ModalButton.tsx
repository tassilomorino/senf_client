import React, { FC } from "react";
import Button from "../../atoms/buttons/Button";
import { ButtonProps } from "../../atoms/buttons/Button.types";
import { ModalWrapperProps } from "./ModalWrapper.types";
import { ModalContext } from "./ModalProvider";

interface ModalButtonProps extends ButtonProps {
  options: ModalWrapperProps,
  children: React.ReactNode | React.ReactNode[]
  button?: React.Node
}

const ModalButton: FC<ModalButtonProps> = ({ children, options, button, ...props }) => {

  const { handleModal } = React.useContext(ModalContext) || {};
  const MButton = button || Button;
  return (<MButton onClick={() => handleModal("push", children, options)} {...props} />)
};

export default ModalButton