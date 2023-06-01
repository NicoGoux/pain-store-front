import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Header';
import { Store } from './pages/store/Store';
import { Login } from './pages/auth/Login';
import { AuthRoute, LoggedInRoute, UserProvider } from '../contexts/UserContext';
import { Register } from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
import Recovery from './pages/auth/Recovery';
import { RecoveryPassword } from './pages/auth/RecoveryPassword';
import { AppProvider } from '../contexts/AppContext';
import { ProductDetailContainer } from './pages/store/ProductDetailContainer';
import { Profile } from './pages/user/Profile';
import { EmailValidate } from './pages/user/EmailValidate';
import { Cart } from './pages/user/Cart';

function App() {
	return (
		<>
			<div>
				<Toaster />
			</div>
			<HashRouter>
				<AppProvider>
					<UserProvider>
						<Menu />

						<Routes>
							<Route path='/' element={<Navigate to={'/store'} replace={true} />} />
							<Route path='/' />
							{/* Store routes */}
							<Route path='/store' element={<Store />}>
								<Route path=':id' element={<ProductDetailContainer />} />
							</Route>
							<Route path='/contact' />
							{/* Auth routes */}
							<Route
								path='/login'
								element={
									<LoggedInRoute>
										<Login />
									</LoggedInRoute>
								}
							/>
							<Route
								path='/login/recovery'
								element={
									<LoggedInRoute>
										<Recovery />
									</LoggedInRoute>
								}
							/>
							<Route
								path='/login/recovery/password'
								element={
									<LoggedInRoute>
										<RecoveryPassword />
									</LoggedInRoute>
								}
							/>
							<Route
								path='/logout'
								element={<Navigate to={'/store'} replace={true} />}
							></Route>
							<Route
								path='/register'
								element={
									<LoggedInRoute>
										<Register />
									</LoggedInRoute>
								}
							/>
							{/* User routes */}
							<Route
								path='/account'
								element={<Navigate to={'/account/profile'} replace={true} />}
							/>
							<Route
								path='/account/profile'
								element={
									<AuthRoute>
										<Profile />
									</AuthRoute>
								}
							/>
							<Route
								path='/account/validate-email'
								element={<EmailValidate />}
							></Route>
							<Route
								path='/account/cart'
								element={
									<AuthRoute>
										<Cart />
									</AuthRoute>
								}
							/>
							<Route path='/account/shopping' element={<AuthRoute></AuthRoute>} />
							<Route />
						</Routes>
					</UserProvider>
				</AppProvider>
			</HashRouter>
		</>
	);
}

export default App;
