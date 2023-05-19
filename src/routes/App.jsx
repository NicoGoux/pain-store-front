import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Header';
import { Store } from './pages/Store';
import { ProductFilter } from '../components/store/ProductFilter';
import { ProductGrid } from '../components/store/ProductGrid';
import { Login } from './pages/auth/Login';
import { AuthProvider } from '../contexts/AuthContext';
import { Register } from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
import Recovery from './pages/auth/Recovery';
import { RecoveryPassword } from './pages/auth/RecoveryPassword';

function App() {
	return (
		<>
			<div>
				<Toaster />
			</div>
			<HashRouter>
				<AuthProvider>
					<Menu />

					<Routes>
						//TODO
						<Route path='/' element={<Navigate to={'/store'} replace={true} />} />
						<Route path='/' />
						<Route
							path='/store'
							element={
								<Store>
									<ProductFilter />
									<ProductGrid />
								</Store>
							}
						/>
						<Route path='/contact' />
						<Route path='/login' element={<Login />} />
						<Route path='/login/recovery' element={<Recovery />} />
						<Route path='/login/recovery/password' element={<RecoveryPassword />} />
						<Route path='/register' element={<Register />} />
					</Routes>
				</AuthProvider>
			</HashRouter>
		</>
	);
}

export default App;
