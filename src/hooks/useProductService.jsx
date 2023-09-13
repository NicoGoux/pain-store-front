import { useState } from 'react';
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

	const updateProduct = async (id, patch, state) => {
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
			getProductList({ productStatus: state });
			return;
		}
	};

	const createProduct = async (productData) => {
		const newProduct = {
			name: productData.name,
			marketHash: {
				marketHashString: productData.marketHash,
				category: {
					name: productData.category,
				},
			},
			price: productData.price,
		};

		if (productData.skinCondition && productData.skinCondition != '') {
			newProduct.skinCondition = { skinConditionString: productData.skinCondition };
		}

		if (productData.float && productData.float != '') {
			newProduct.float = productData.float;
		}

		if (productData.tradeLock && productData.tradeLock != '') {
			newProduct.tradeLock = productData.tradeLock;
		}

		if (auth.user && auth.isAdmin()) {
			const axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};

			await axios.post(
				`${urlProvider.urlBackend}/products/`,
				{ product: { ...newProduct } },
				axiosConfig
			);
			getProductList();
			return;
		}
	};

	const checkAvailability = async (products) => {
		try {
			const axiosConfig = {
				headers: {
					'Content-Type': 'application/json',
				},
			};
			const response = await axios.post(
				`${urlProvider.urlBackend}/products/check-availability`,
				{ products: products },
				axiosConfig
			);

			const nonAvailableProducts = products.filter(
				(product) =>
					!response.data.some((productAvailable) => productAvailable._id === product._id)
			);

			return nonAvailableProducts;
		} catch (error) {
			console.log(error);
			throw new Error('No pudo verificarse el estado de los productos');
		} finally {
			setLoadingProductList(false);
		}
	};

	const productService = {
		productList,
		loadingProductList,
		getProductList,
		updateProduct,
		createProduct,
		checkAvailability,
	};

	return productService;
}

export { useProductService };
