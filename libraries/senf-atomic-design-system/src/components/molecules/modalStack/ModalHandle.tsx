import React from "react";
import styled from "styled-components";

import RoundedButton from "../../atoms/buttons/RoundedButton";
import { Plus } from "../../../assets/icons";

const HandleContainer = styled.div<{ position: string }>`
	position: absolute;
	top: 0;
	left: ${({ position }) => position === "left" ? "0" : position === "center" ? "50%" : "initial"};
	right: ${({ position }) => position === "right" ? "0" : "initial"};
	transform: translateX(${({ position }) => position === "center" && "-50%"});
	width: 50px;
	padding: 10px;
	box-sizing: content-box;
	cursor: pointer;
`
const Handle = styled.div`
	height: 5px;
	width: 100%;
	border-radius: 20px;
	background-color: ${({theme}) => theme.colors.greyscale.greyscale100};
	box-shadow: 0 0 0 5px ${({theme}) => theme.colors.white.white80tra};
`

const ModalHandle = ({ swipe, onClose, ...props }) => {
	return <HandleContainer onClick={onClose} position={swipe ? "center" : "right"} {...props}>{
		swipe ? <Handle /> : <RoundedButton icon={<Plus transform="rotate(45)" />} />
	}</HandleContainer>;
}
export default ModalHandle;