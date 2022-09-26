/** @format */

import React, { FC, useState, useRef } from "react";
import styled from "styled-components";
import { useModals } from "../../molecules/modalStack/ModalProvider";

// Components
import useOnClickOutside from "../../../hooks/useOnClickOutside";
import Button from "../buttons/Button"
import DropdownListContainer from "./DropdownListContainer";
import DropdownList from "./DropdownList";

import { ButtonProps } from "../buttons/Button.types"
import { DropdownListContainerProps } from "./ContentDropdown.types";


const Wrapper = styled.div`
  position: relative;
`;

export interface DropdownButtonProps extends ButtonProps, DropdownListContainerProps {
	button?: React.FC,
}

const DropdownButton: FC<DropdownButtonProps> = ({
	data,
	button,
	options,
	...props
}) => {
	const outerRef = useRef(null);
	const { openModal, closeModal } = useModals();
	const [open, setOpen] = useState(false)
	const CustomButton = button || Button;
	useOnClickOutside(outerRef, () => setOpen(false));

	const handleClick = () => {
		setOpen(!open)
		if (options?.modal) {
			if (!open) {
				closeModal()
				return
			}
			openModal(<DropdownList data={data} options={{ ...options, open, setOpen }} />, { swipe: true, title: options?.title, style: { padding: 20 } })
		}
	}


	return (
		<Wrapper ref={outerRef}>
			<CustomButton onClick={handleClick} {...props} />
			{!options?.modal && <DropdownListContainer options={{ ...options, open, setOpen }} data={data} />}
		</Wrapper>
	);
};

export default DropdownButton;
