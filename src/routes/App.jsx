import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Menu';
import { Store } from './pages/Store';
import { ProductFilter } from '../components/store/ProductFilter';
import { ProductGrid } from '../components/store/ProductGrid';
import { Login } from './pages/Login';
import { AuthProvider } from '../contexts/AuthContext';
import { Register } from './pages/Register';

function App() {
	return (
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
					<Route path='/register' element={<Register />} />
				</Routes>
			</AuthProvider>
		</HashRouter>
	);
}

export default App;
