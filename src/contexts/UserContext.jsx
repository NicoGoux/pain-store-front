import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useGetProductCart } from '../hooks/useGetProductCart';
import { useAuthenticator } from '../hooks/useAuthenticator';

const UserContext = React.createContext();

function UserProvider({ children }) {
	const auth = useAuthenticator();
	const cart = useGetProductCart(auth);

	return <UserContext.Provider value={{ auth, cart }}>{children}</UserContext.Provider>;
}

function useAuthService() {
	const { auth } = useContext(UserContext);
	return auth;
}

function useCartService() {
	const { cart } = useContext(UserContext);
	return cart;
}

function AuthRoute({ children }) {
	const auth = useAuthService();
	if (!auth.user) {
		return <Navigate to='/login'></Navigate>;
	}

	return children;
}

function LoggedInRoute({ children }) {
	const auth = useAuthService();
	if (auth.user) {
		return <Navigate to='/account/profile'></Navigate>;
	}

	return children;
}

function AdminRoute({ children }) {
	const auth = useAuthService();
	if (!auth.user || !auth.isAdmin()) {
		return <Navigate to='/unauthorized'></Navigate>;
	}

	return children;
}

export { AuthRoute, LoggedInRoute, AdminRoute, UserProvider, useAuthService, useCartService };
