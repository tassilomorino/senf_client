import React from "react";
import styled from "styled-components";
import { ModalContext } from "./ModalProvider";
import ModalWrapper from "./ModalWrapper";

interface StackProps {
  stack: number
}

const Background = styled.div<StackProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 1;
  transition: 300ms;
  pointer-events: ${({ stack }) => stack < 2 ? "none" : "auto"};
`;

const Stack = styled.div<StackProps>`
z-index: 999999;
`

const ModalStack = () => {
  const { modalComponents, modalStack, handleModal } = React.useContext(ModalContext) || {};
  const [opacity, setOpacity] = React.useState(0.0001);

  React.useEffect(() => {
    if (modalStack < 3) {
      setOpacity(0.0001);
    } else {
      setOpacity(1);
    }
  }, [modalStack]);

  return (<>
    <Stack>
      {modalComponents.map(({ modal, options }, index, { length }) => (
        (modal?.$$typeof || modal?.length > 0 || options?.title) &&
        <ModalWrapper
          key={index}
          index={length - index - 1}
          setOpacity={setOpacity}
          {...options}
        >
          {modal}
        </ModalWrapper>
      ))}
    </Stack>
    <Background
      onClick={handleModal.bind(null, 'pop')}
      stack={modalStack}
      style={{
        backgroundColor: `rgba(0, 0, 0, ${opacity / 2})`,
      }}
    />
  </>);
};

export default ModalStack;