import { BrowserRouter, Routes } from 'react-router-dom';
import { Menu } from '../components/menu/Menu';

function App() {
	return (
		<>
			<BrowserRouter>
				<Menu />

				<Routes></Routes>
			</BrowserRouter>
		</>
	);
}

export default App;
