import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';

function useAuthenticator() {
	const [user, setUser] = useState(null);
	const [loadingUser, setLoadingUser] = useState(true);
	const navigate = useNavigate();

	const login = async (data) => {
		localStorage.removeItem('token');
		const response = await axios.post(`${urlProvider.urlBackend}/users/login`, data);
		console.log(response.data);
		setUser({
			id: response.data.sub,
			username: response.data.username,
			role: response.data.role,
		});
		localStorage.setItem('token', response.data.token);
	};

	const autoLogin = async () => {
		if (auth.user) {
			setLoadingUser(false);
			return;
		}
		if (!localStorage.getItem('token')) {
			setLoadingUser(false);
			return;
		} else {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/users/autologin`,
					config
				);
				toast.success(`Bienvenido ${response.data.username}`);
				setUser({
					id: response.data.sub,
					username: response.data.username,
					role: response.data.role,
				});
			} catch (error) {
				console.log(error);
			} finally {
				setLoadingUser(false);
			}
		}
	};

	const getUserLogged = async () => {
		if (!auth.user || !localStorage.getItem('token')) {
			toast.error('Usuario no encontrado');
			return null;
		} else {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/users/user-logged`,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				return null;
			}
		}
	};

	const register = async (data) => {
		await axios.post(`${urlProvider.urlBackend}/users/register`, data);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('token');
		navigate('/');
	};

	const isAdmin = () => {
		if (auth.user.role === 'ADMIN') {
			return true;
		}
	};

	const getToken = () => {
		return localStorage.getItem('token');
	};

	const changePassword = async (data) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken()}`,
			},
		};
		const response = await axios.patch(
			`${urlProvider.urlBackend}/users/change-password`,
			data,
			config
		);
		console.log(response.data);
	};

	const sendRecovery = async (data) => {
		try {
			await axios.post(`${urlProvider.urlBackend}/users/recovery`, {
				...data,
				domain: window.location.host,
			});
		} catch (error) {}
	};

	const recoveryPassword = async (data) => {
		await axios.post(`${urlProvider.getUrlBackend()}/users/recovery/change-password`, {
			...data,
		});
	};

	const sendValidateEmail = async (data) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken()}`,
			},
		};
		await axios.post(
			`${urlProvider.urlBackend}/users/send-validate-email`,
			{
				domain: window.location.host,
			},
			config
		);
	};

	const validateEmail = async (data) => {
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${getToken()}`,
			},
		};
		console.log(config);
		await axios.post(
			`${urlProvider.urlBackend}/users/validate-email`,
			{
				...data,
			},
			config
		);
	};

	useEffect(() => {
		autoLogin();
	}, []);

	const auth = {
		user,
		loadingUser,
		login,
		sendRecovery,
		recoveryPassword,
		register,
		logout,
		isAdmin,
		getToken,
		getUserLogged,
		changePassword,
		sendValidateEmail,
		validateEmail,
	};

	return auth;
}

export { useAuthenticator };
