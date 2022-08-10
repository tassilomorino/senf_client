import React, { FC } from "react";
import styled from "styled-components";
import SwipeWrapper from "./SwipeWrapper";
import ModalHandle from "./ModalHandle";
import { ModalContext } from "./ModalProvider";
import ModalWrapperProps from "./ModalWrapper.types";
import Typography from "../../atoms/typography/Typography";
import Box from "../../atoms/box/Box";
import Button from "../../atoms/buttons/Button";


import theme from "../../../styles/theme";


interface SheetProps {
  index: number,
  total: number,
  swipe: boolean,
  size: string
}


const Sheet = styled.div<SheetProps>`
  /* animation: opacityAndPointerEventsAnimation 300ms; */
  /* position: fixed; */
  /* max-height: 52vh; */
  opacity: ${({ index }) => Math.min(1, index)};
  pointer-events: ${({ index }) => index === 1 ? "auto" : "none"};
  transform-origin: 0%;
  transform:
    scale(${({ index }) => 1 - (index - 1) / 10})
    translate(
      -50%,
      calc(${({ index, swipe }) => index === 0 && swipe ? "150%" : `${(index - 1) * -40}px - ${swipe ? 0 : 50}%`})
    );
  z-index: ${({ index }) => index === 1 ? 10 : index * -1};
  box-sizing: border-box;
  overflow: ${({ overflow }) => overflow || "scroll"};
  -webkit-overflow-scrolling: touch;
  background-color: ${({ theme }) => theme.colors.greyscale.greyscale100};
  border-radius: ${({ theme }) => theme.radii[4]}px;
  box-shadow: ${({ theme }) => theme.shadows[0]}
    ${({ theme }) => theme.colors.black.black30tra};
  transition: 300ms;
`;

const Content = styled.div<{ index: number }>`
  z-index: 10;
  position: fixed;
  left: 50%;
  top: 50%;
`;
const Background = styled.div<{ index: number }>`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
const Toner = styled.div<{ padding: number, size: string, index: number, swipe: boolean }>`
  display: flex;
  flex-direction: column;
  padding: ${({ padding }) => padding && `${padding}px`};

  padding-bottom: ${({ swipe }) => swipe && "120px"};
  padding-top: ${({ swipe }) => swipe && "40px"};

  opacity: ${({ index }) => 1 / index};
  height: ${({ height }) => height ? `${height}px` : '100%'};
  max-width: 100vw;
  min-height: 120px;
  max-height: ${({ maxHeight }) => maxHeight ? `${maxHeight}px` : 'calc(100vh - 80px)'}; 
  width: ${({ size }) => {
    switch (size) {
      case "full": return "max(calc(100vw - 40px), min(983px, 100vw))";
      case "xl": return "983px";
      case "l": case "lg": return "614px";
      case "s": case "sm": return "240px";
      case "m": case "md": default: return "384px";
    }
  }};
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor === "primary"
      ? theme.colors.primary.primary100
      : backgroundColor === "beige"
        ? theme.colors.beige.beige20
        : "white"};
  transition: 300ms;
  overflow-x: hidden;
`;

const ModalWrapper: FC<ModalWrapperProps> = ({
  size,
  title,
  description,
  swipe,
  index,
  children,
  height,
  padding,
  setOpacity,
  onSubmit,
  submitDisabled,
  submitText,
  cancelText,
  onBeforeOpen,
  onAfterOpen,
  onBeforeClose,
  onAfterClose,
}) => {
  const [triggerOpen, setOpen] = React.useState(0);
  const {
    handleModal,
    modalStack,
    beforeOpen,
    beforeClose,
    afterOpen,
    afterClose,
  } = React.useContext(ModalContext) || {};

  React.useEffect(() => {
    setOpen(modalStack)
  }, [modalStack])

  const close = () => {
    handleModal("pop")
  }
  const Wrapper = swipe ? SwipeWrapper : Content;
  const [innerHeight, setInnerHeight] = React.useState(null);
  const [overflowing, setOverflowing] = React.useState(null);
  const content = React.useRef(null)
  const sheet = React.useRef(null)

  React.useEffect(() => {
    setTimeout(() => {
      setInnerHeight(content.current?.scrollHeight)
      setOverflowing(sheet.current?.scrollHeight < innerHeight)
    }, 0)
  })


  React.useEffect(() => {
    if (beforeOpen && onBeforeOpen) onBeforeOpen()
  }, [beforeOpen])
  React.useEffect(() => {
    if (beforeClose && onBeforeClose) onBeforeClose()
  }, [beforeClose])
  React.useEffect(() => {
    if (afterOpen && onAfterOpen) onAfterOpen()
  }, [afterOpen])
  React.useEffect(() => {
    if (afterClose && onAfterClose) onAfterClose()
  }, [afterClose])



  return (
    <Wrapper
      height={height || innerHeight || 320}
      size={size}
      triggerOpen={triggerOpen}
      onDrag={(e) => (modalStack === 3) && setOpacity(e)}
      onClose={close}
      index={index}
      overflowing={overflowing}
    >
      <Background onClick={close} />
      <Sheet index={index} total={modalStack} swipe={swipe} ref={sheet}>
        <Toner size={size} index={index} height={height || innerHeight} maxHeight={height} padding={padding} swipe={swipe} ref={content}>
          <ModalHandle swipe={swipe} onClose={close} />
          {(title || description) && <Box flexDirection="column" gap="5px" marginBottom="20px">
            {title && <Typography variant="h3">{title}</Typography>}
            {description && <Typography variant="bodyBg" color={theme.colors.greyscale.greyscale100}>{description}</Typography>}
          </Box>}
          <div style={{ marginBottom: "auto" }}>{children}</div>
          {(cancelText || submitText) &&
            <Box
              width="100%"
              gap="8px"
              marginTop="20px"
            >
              {cancelText &&
                <Button
                  variant="secondary"
                  fillWidth="max"
                  onClick={close}
                  text={cancelText}
                />
              }
              {submitText &&
                <Button
                  variant="primary"
                  fillWidth="max"
                  onClick={() => { onSubmit().then(() => close()) }}
                  disabled={!!submitDisabled}
                  text={submitText}
                />
              }
            </Box>}
        </Toner>
      </Sheet>
    </Wrapper>);
};

export default ModalWrapper;