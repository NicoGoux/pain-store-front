import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-hot-toast';
function useGetProducts(searching, filters) {
	const { urlProvider } = useContext(AppContext);
	const [products, setProducts] = useState([]);
	const [loadingProducts, setLoadingProducts] = useState(true);

	const getProducts = async () => {
		setLoadingProducts(true);
		let string = '?';
		for (const key in filters) {
			if (filters[key] && filters[key] != '') {
				string = string + `&${key}=${filters[key]}`;
			}
		}
		try {
			const response = await axios.get(`${urlProvider.getUrlBackend()}/products${string}`);
			setProducts(response.data);
		} catch (error) {
			console.log(error);
			toast.error('No pudieron cargarse los productos');
		} finally {
			setLoadingProducts(false);
		}
	};

	useEffect(() => {
		if (searching != false) {
			getProducts();
		}
	}, [searching]);

	return { products, loadingProducts };
}

export { useGetProducts };
