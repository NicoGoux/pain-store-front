import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { urlProvider } from '../config/urlProvider';
import { toast } from 'react-hot-toast';
import { useAuth } from '../contexts/UserContext';
function useGetProducts(searching, filters) {
	const [products, setProducts] = useState([]);
	const [loadingProducts, setLoadingProducts] = useState(true);
	const auth = useAuth();

	const getProducts = async () => {
		setLoadingProducts(true);
		let filterString = '?';
		for (const key in filters) {
			if (filters[key] && filters[key] != '') {
				filterString = filterString + `&${key}=${filters[key]}`;
			}
		}
		try {
			if (auth.user && auth.isAdmin()) {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/products${filterString}`,
					config
				);
				setProducts(response.data);
			} else {
				const response = await axios.get(
					`${urlProvider.urlBackend}/products/available${filterString}`
				);
				setProducts(response.data);
			}
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
