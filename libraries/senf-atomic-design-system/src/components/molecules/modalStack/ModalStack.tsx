import React from "react";
import styled from "styled-components";
import { ModalContext } from "./ModalProvider";
import ModalWrapper from "./ModalWrapper";


interface StackProps {
  index: number
}

const Background = styled.div<{ opacity: number}>`
  animation: opacityAndPointerEventsAnimation 0.5s;
  position: fixed;
  background-color: rgba(0, 0, 0, ${({ opacity }) => opacity / 2 || 0.5});
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 300ms;
`;

const Stack = styled.div<StackProps>`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  z-index: 10;
`
const ModalStack = () => {
  const { modalComponents, handleModal } = React.useContext(ModalContext) || {};
  const [ triggerClose, setClose ] = React.useState(false);
  const [ opacity, setOpacity ] = React.useState(0);
  const close = (e) => {
    setClose(true)
    // setTimeout(() => setClose(false), 300);
    console.log(e)
  }
  const hide = () => {
    setClose(true)
  }
  return (<>
    {modalComponents.current.length > 0 &&
      <>
        <Stack>{modalComponents.current.map((modal, index) => (
          <ModalWrapper
            key={index}
            index={modalComponents.current.length - index - 1}
            swipe={true}
            height={550}
            className={modalComponents.current.length - 1 === index && triggerClose ? "hide" : ""}
            triggerClose={modalComponents.current.length - 1 === index && triggerClose}
            onTransitionEnd={handleModal.bind(null, 'pop')}
            setOpacity={setOpacity}
          >
            {modal}
          </ModalWrapper>))}
        </Stack>
        <Background onClick={handleModal.bind(null, 'pop')} opacity={opacity} />
      </>
    }
  </>);
};

export default ModalStack;