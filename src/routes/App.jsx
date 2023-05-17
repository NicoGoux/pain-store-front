import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Menu';
import { Store } from './pages/Store';
import { ProductFilter } from '../components/store/ProductFilter';
import { ProductGrid } from '../components/store/ProductGrid';
import { Login } from './pages/Login';

function App() {
	return (
		<HashRouter>
			<Menu />

			<Routes>
				<Route path='/' element={<Navigate to={'/store'} replace={true} />} />
				<Route
					path='/store'
					element={
						<Store>
							<ProductFilter />
							<ProductGrid />
						</Store>
					}
				/>
				<Route path='/login' element={<Login />} />
			</Routes>
		</HashRouter>
	);
}

export default App;
