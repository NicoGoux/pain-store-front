import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';

const AuthContext = React.createContext();

function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	const login = async (data) => {
		localStorage.removeItem('token');
		const response = await axios.post('https://pain-store.vercel.app/api/v1/users/login', data);
		console.log(response.data);
		setUser({
			id: response.data.sub,
			username: response.data.username,
			role: response.data.role,
		});
		localStorage.setItem('token', response.data.token);
	};

	const sendRecovery = async (data) => {
		const response = await axios.post(
			'https://pain-store.vercel.app/api/v1/users/recovery',
			data
		);
		console.log(response.data);
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
						Authorization: `Bearer ${localStorage.getItem('token')}`,
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
			} catch (error) {}
		}
	};

	const register = async (data) => {
		const response = await axios.post(
			'https://pain-store.vercel.app/api/v1/users/register',
			data
		);
		console.log(response.data);
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem('token');
		navigate('/');
	};

	const auth = { user, login, sendRecovery, register, logout };

	useEffect(() => {
		console.log(user);
	}, []);

	useEffect(() => {
		autoLogin();
	}, []);

	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

function useAuth() {
	const auth = useContext(AuthContext);
	return auth;
}

function AuthRoute({ children }) {
	const auth = useAuth();
	if (!auth.user) {
		return <Navigate to='/login'></Navigate>;
	}

	return children;
}

export { AuthRoute, AuthProvider, useAuth };
