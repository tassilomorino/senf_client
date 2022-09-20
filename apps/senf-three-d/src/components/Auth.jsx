/** @format */

import { useEffect, memo } from "react";
import { useModals } from "senf-atomic-design-system";
import {
	AuthModal,
	useAuthContext,
} from "senf-shared";

const Auth = ({ ...props }) => {
	const { closeModal, setModal } = useModals();
	const { user } = useAuthContext();

	const Modal = <AuthModal
		success={() => closeModal()}
		error={(err) => console.error(err)}
		handleClose={() => closeModal()}
		{...props}
	/>

	useEffect(() => {
		const timeoutID = setTimeout(() => !user && setModal(Modal), 500);
		return () => clearTimeout(timeoutID);
	}, [user])

	return null
};

export default memo(Auth);
