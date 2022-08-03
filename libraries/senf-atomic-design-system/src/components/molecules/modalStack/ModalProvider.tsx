import React from "react";
import ModalStack from "./ModalStack";

const useModal = () => {
  const modalComponents = React.useRef([{}]);
  const [modalStack, setModalStack] = React.useState(modalComponents.current.length);
  const handleModal = (action, modal = null, options = null) => {
    switch (action) {
      case "push":
        modalComponents.current = [...modalComponents.current, { modal, options }];
        setModalStack(modalComponents.current.length);
        setTimeout(() => {
          modalComponents.current = [...modalComponents.current, {}];
          setModalStack(modalComponents.current.length);
        }, 0)
        break;
      case "pop":
        modalComponents.current = modalComponents.current.slice(0, -1);
        setTimeout(() => {
          modalComponents.current = modalComponents.current.slice(0, -1);
          setModalStack(modalComponents.current.length + 1);
          setModalStack(modalComponents.current.length);
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
    setModalStack(modalComponents.current.length);
  };
  return { modalStack, modalComponents: modalComponents.current, handleModal };
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