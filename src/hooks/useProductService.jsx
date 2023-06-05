import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlProvider } from '../config/urlProvider';
import { toast } from 'react-hot-toast';
import { useAuthService } from '../contexts/UserContext';
function useProductService() {
	const [productList, setProductList] = useState([]);
	const [loadingProductList, setLoadingProductList] = useState(true);
	const auth = useAuthService();

	const getProductList = async (filters) => {
		setLoadingProductList(true);
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
				setProductList(response.data);
			} else {
				const response = await axios.get(
					`${urlProvider.urlBackend}/products/available${filterString}`
				);
				setProductList(response.data);
			}
		} catch (error) {
			console.log(error);
			toast.error('No pudieron cargarse los productos');
		} finally {
			setLoadingProductList(false);
		}
	};

	const updateProduct = async (id, patch) => {
		if (auth.user && auth.isAdmin()) {
			const axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			await axios.patch(
				`${urlProvider.urlBackend}/products/${id}`,
				{ patch: { ...patch } },
				axiosConfig
			);
			getProductList();
			return;
		}
	};

	const productService = { productList, loadingProductList, getProductList, updateProduct };

	return productService;
}

export { useProductService };
