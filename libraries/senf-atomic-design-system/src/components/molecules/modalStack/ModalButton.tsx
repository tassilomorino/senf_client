import React from "react";
import Button from "../../atoms/buttons/Button";
import { ModalContext } from "./ModalProvider";


const ModalButton = ({ children, options, ...props }) => {
  const { handleModal } = React.useContext(ModalContext) || {};
  return (<Button onClick={() => handleModal("push", children, options)} {...props} />)
};

export default ModalButton;