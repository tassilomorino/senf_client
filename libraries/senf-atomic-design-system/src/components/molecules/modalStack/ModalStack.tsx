import styled from "styled-components";
import { useTransition, config } from "@react-spring/web";
import ModalContainer from './ModalContainer'


import { ModalProps, ModalOptions, ModalContainerProps } from "./ModalStack.types";
import { isMobileCustom } from "../../../hooks/customDeviceDetect";

const StackWrapper = styled.div<ModalOptions>`
	z-index: 9999;
	position: fixed;
	bottom: ${({ isMobile }) => isMobile ? 0 : "50%"};
	left: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
`

const Stack = ({ stack, closeModal }: { stack: ModalProps[], closeModal: () => void }) => {
	const isMobile = isMobileCustom()
	const modalIndex = (item: ModalProps) => (stack.length - stack.indexOf(item)) - 1
	const away = (item: ModalProps) => ({ opacity: 0, shading: 1, y: item.options?.swipe ? 1000 : 30, scale: 1.1 })
	const modalStackTransition = useTransition(stack, {
		from: item => away(item),
		leave: item => away(item),
		enter: { opacity: 1, shading: 1, y: 0, scale: 1 },
		update: item => [{
			shading: Math.min(1 / (modalIndex(item) + 1), 1),
			y: modalIndex(item) * -40,
			scale: 1 - modalIndex(item) / 7,
		}],
		config: config.gentle
	})


	return <StackWrapper isMobile={isMobile}>
		{modalStackTransition((style, item) => <ModalContainer item={item} style={style as ModalContainerProps['style']} closeModal={closeModal} index={modalIndex(item)} />)}
	</StackWrapper>
}
export default Stack