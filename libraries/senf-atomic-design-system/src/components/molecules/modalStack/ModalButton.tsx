import React, { FC } from "react";
import Button from "../../atoms/buttons/Button";
import { ButtonProps } from "../../atoms/buttons/Button.types";
import { ModalOptions } from "./ModalStack.types";
import { useModals } from "./ModalProvider";

interface ModalButtonProps extends ButtonProps {
  options: ModalOptions,
  children: React.ReactNode | React.ReactNode[]
  button?: React.Node
}

const ModalButton: FC<ModalButtonProps> = ({ children, options, button, ...props }) => {
  const { openModal } = useModals();
  const CustomButton = button || Button;
  return (<CustomButton onClick={() => openModal(children, options)} {...props} />)
};

export default ModalButton