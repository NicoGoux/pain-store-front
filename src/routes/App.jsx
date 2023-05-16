import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Menu';
import { Store } from './store/Store';

function App() {
	return (
		<BrowserRouter>
			<Menu />

			<Routes>
				<Route path='/' element={<Navigate to={'/store'} replace={true} />}></Route>
				<Route path='/store' element={<Store />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
