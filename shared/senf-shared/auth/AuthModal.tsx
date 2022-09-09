import React, { useState, useEffect } from "react";

import { Auth } from "senf-atomic-design-system";
import { useAuthContext } from "./AuthProvider";

const providerId = {
	google: Math.random().toString(36).substring(2, 15),
	facebook: Math.random().toString(36).substring(2, 15),
	email: Math.random().toString(36).substring(2, 15),
}

const AuthModal: FC<{ success: () => void, error: () => void, handleClose: () => void }> = ({ success, error, handleClose }) => {
	const [page, setPage] = useState('');

	const { user, signIn, signOut, createUser, loading, errorMessage } = useAuthContext();

	const [facebookLoading, setFacebookLoading] = useState(false)
	const [googleLoading, setGoogleLoading] = useState(false)
	const [emailLoading, setEmailLoading] = useState(false)

	useEffect(() => {
		setPage('authOptions')
	}, [])

	useEffect(() => {
		const loadingProvider = Object.keys(providerId).find(key => providerId[key] === loading) || loading
		console.log(loadingProvider)
		setFacebookLoading(loadingProvider === "facebook")
		setGoogleLoading(loadingProvider === "google")
		setEmailLoading(loadingProvider === "email")
	}, [loading])


	const authHandler = {
		signIn: {
			facebook: () => signIn({ provider: 'facebook', id: providerId.facebook }).then(success).catch(error),
			google: () => signIn({ provider: 'google', id: providerId.google }).then(success).catch(error),
			email: (email, password) => signIn({ email, password, id: providerId.email }).then(success).catch(error),
		},
		loadingAuth: loading,
		loading: {
			facebook: facebookLoading,
			google: googleLoading,
			email: emailLoading,
		},
		signOut,
		createUser
	}

	return <Auth
		errorMessage={errorMessage}
		user={user}
		authHandler={authHandler}

		// handleSubmitRegister={(formikRegisterStore) =>
		// 	createUserWithEmailAndPassword(formikRegisterStore)
		// }

		// handleImageUpload={handleImageUpload}
		// uploadingImage={uploadingImage}
		// handleSubmitEditDetails={(userDetails) =>
		// 	handleSubmitEditDetails(userDetails)
		// }
		setPage={setPage}
		page={page}
		handleClose={handleClose}
	/>;
};

export { AuthModal };
