import React from "react";
import ModalStack from "./ModalStack";

const useModal = () => {
  const modalComponents = React.useRef([{}]);
  const [modalStack, setModalStack] = React.useState(modalComponents.current.length);

  // @todo: Hooks still don't work
  const [beforeOpen, setBeforeOpen] = React.useState(false);
  const [beforeClose, setBeforeClose] = React.useState(false);
  const [afterOpen, setAfterOpen] = React.useState(false);
  const [afterClose, setAfterClose] = React.useState(false);

  const handleModal = (action, modal = null, options = null) => {


    switch (action) {
      case "push":
        setBeforeOpen(true)
        modalComponents.current = [...modalComponents.current, { modal, options }];
        setModalStack(modalComponents.current.length);
        setTimeout(() => {
          modalComponents.current = [...modalComponents.current, {}];
          setModalStack(modalComponents.current.length);
          setAfterOpen(true)
        }, 0)
        break;
      case "pop":
        setBeforeClose(true)
        modalComponents.current = modalComponents.current.slice(0, -1);
        setTimeout(() => {
          modalComponents.current = modalComponents.current.slice(0, -1);
          setModalStack(modalComponents.current.length + 1);
          setModalStack(modalComponents.current.length);
          setAfterClose(true)
        }, 150)

        break;
      case "set":
        modalComponents.current = {
          modal,
          options
        };
        break;
      case "clear":
        modalComponents.current = [{}];
        break;
      default:
        break;
    }
    setTimeout(() => {
      setModalStack(modalComponents.current.length);
      setBeforeOpen(false)
      setAfterOpen(false)
      setBeforeClose(false)
      setAfterClose(false)
    }, 0)

  };
  return {
    modalStack,
    modalComponents: modalComponents.current,
    handleModal,
    beforeOpen,
    beforeClose,
    afterOpen,
    afterClose,
  };
};



const ModalContext = React.createContext();
const { Provider } = ModalContext

const ModalProvider = ({ children }) => {
  const {
    modalStack,
    modalComponents,
    handleModal,
    beforeOpen,
    beforeClose,
    afterOpen,
    afterClose,
  } = useModal();
  return (
    <Provider value={{
      modalStack,
      modalComponents,
      handleModal,
      beforeOpen,
      beforeClose,
      afterOpen,
      afterClose,
    }}>
      <ModalStack />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };