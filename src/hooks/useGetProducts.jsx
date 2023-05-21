import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-hot-toast';
function useGetProducts() {
	const { urlProvider } = useContext(AppContext);
	const [products, setProducts] = useState([]);
	const [loadingProducts, setLoadingProducts] = useState(true);

	useEffect(() => {
		setLoadingProducts(true);
		const getProducts = async () => {
			try {
				const response = await axios.get(`${urlProvider.getUrlBackend()}/products`);
				setProducts(response.data);
			} catch (error) {
				toast.error('No pudieron cargarse los productos');
			} finally {
				setLoadingProducts(false);
			}
		};
		getProducts();
	}, []);

	return { products, loadingProducts };
}

export { useGetProducts };
