import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-hot-toast';

function useAuthenticator() {
	const { urlProvider } = useContext(AppContext);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const login = async (data) => {
		localStorage.removeItem('token');
		const response = await axios.post(`${urlProvider.getUrlBackend()}/users/login`, data);
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
			return;
		}
		if (!localStorage.getItem('token')) {
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
					'https://pain-store.vercel.app/api/v1/users/autologin',
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
					'https://pain-store.vercel.app/api/v1/users/user-logged',
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
		await axios.post(`${urlProvider.getUrlBackend()}/users/register`, data);
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
			`${urlProvider.getUrlBackend()}/users/change-password`,
			data,
			config
		);
		console.log(response.data);
	};

	const sendRecovery = async (data) => {
		try {
			await axios.post(`${urlProvider.getUrlBackend()}/users/recovery`, {
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
			`${urlProvider.getUrlBackend()}/users/send-validate-email`,
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
			`${urlProvider.getUrlBackend()}/users/validate-email`,
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
