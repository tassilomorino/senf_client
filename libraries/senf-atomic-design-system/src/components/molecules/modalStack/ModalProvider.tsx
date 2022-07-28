import React from "react";
import { useSpring, config } from "@react-spring/web";
import ModalStack from "./ModalStack";

const useModal = () => {
  const modalComponents = React.useRef([]);
  const [modalStack, setModalStack] = React.useState([]);
  const [bgOpacity, setBgOpacity] = React.useState(0);
  React.useEffect(() => {
    if (modalComponents.current.length === 0) {
      setBgOpacity(0);
    } else {
      setBgOpacity(1);
    }
  }, [modalComponents.current.length]);
  
  const handleModal = (action, modal = null) => {
    switch (action) {
      case "push":
        modalComponents.current = [...modalComponents.current, modal];
        break;
      case "pop":
        modalComponents.current = modalComponents.current.slice(0, modalComponents.current.length - 1);
        break;
      case "set":
        modalComponents.current = modal;
        break;
      case "clear":
        modalComponents.current = [];
        break;
      default:
        break;
      }
      setModalStack(modalComponents.current.length);
  };
  return { bgOpacity, setBgOpacity, modalStack, modalComponents, handleModal };
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