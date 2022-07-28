import React from "react";
import Button from "../../atoms/buttons/Button";
import { ModalContext } from "./ModalProvider";


const ModalButton = ({children, ...props}) => {
  const { handleModal } = React.useContext(ModalContext) || {};
  return (<Button onClick={() => handleModal("push", children)} {...props} />)
};

export default ModalButton;