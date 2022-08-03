import React from "react";
import ModalStack from "./ModalStack";

const useModal = () => {
  const modalComponents = React.useRef([{}]);
  const [modalStack, setModalStack] = React.useState(modalComponents.current.length);
  const [bgStyle, setBgStyle] = React.useState({});
  const handleModal = (action, modal = null, options = null) => {
    switch (action) {
      case "push":
        modalComponents.current[modalComponents.current.length - 1] = { modal, options };
        modalComponents.current = [...modalComponents.current, {}];
        break;
      case "pop":
        modalComponents.current = modalComponents.current.slice(0, modalComponents.current.length - 1);
        setTimeout(() => {
          modalComponents.current[modalComponents.current.length - 1] = {};
          setModalStack(modalComponents.current.length - 1);
          setModalStack(modalComponents.current.length);
        }, 300);
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
    setModalStack(modalComponents.current.length);
  };
  return { modalStack, modalComponents: modalComponents.current, handleModal, bgStyle, setBgStyle };
};



const ModalContext = React.createContext();
const { Provider } = ModalContext

const ModalProvider = ({ children }) => {
  const { bgOpacity, setBgOpacity, modalStack, modalComponents, handleModal } = useModal();
  return (
    <Provider value={{ bgOpacity, setBgOpacity, modalStack, modalComponents, handleModal }}>
      <ModalStack />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };