import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Header';
import { Store } from './pages/Store';
import { Login } from './pages/auth/Login';
import { AuthProvider } from '../contexts/AuthContext';
import { Register } from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
import Recovery from './pages/auth/Recovery';
import { RecoveryPassword } from './pages/auth/RecoveryPassword';
import { AppProvider } from '../contexts/AppContext';

function App() {
	return (
		<div className='pb-4'>
			<div>
				<Toaster />
			</div>
			<HashRouter>
				<AppProvider>
					<AuthProvider>
						<Menu />

						<Routes>
							//TODO
							<Route path='/' element={<Navigate to={'/store'} replace={true} />} />
							<Route path='/' />
							<Route path='/store' element={<Store />} />
							<Route path='/contact' />
							<Route path='/login' element={<Login />} />
							<Route path='/login/recovery' element={<Recovery />} />
							<Route path='/login/recovery/password' element={<RecoveryPassword />} />
							<Route path='/register' element={<Register />} />
						</Routes>
					</AuthProvider>
				</AppProvider>
			</HashRouter>
		</div>
	);
}

export default App;
