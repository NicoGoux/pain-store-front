import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';
function useGetProductCart(auth) {
	const [userProductCart, setUserProductCart] = useState(null);
	const [loadingProductCart, setLoadingProductCart] = useState(true);

	const getUserProductCart = () => {
		if (auth.user) {
			const getProductCart = async () => {
				try {
					const axiosConfig = {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${auth.getToken()}`,
						},
					};
					const response = await axios.get(
						`${urlProvider.urlBackend}/users/cart`,
						axiosConfig
					);
					setUserProductCart({ ...response.data });
				} catch (error) {
					toast.error('No pudo cargarse el carrito');
				} finally {
					setLoadingProductCart(false);
				}
			};
			getProductCart();
			return;
		}
		setUserProductCart(null);
	};

	const addProductToCart = (product) => {
		let added = false;
		if (auth.user) {
			setLoadingProductCart(true);
			const addProduct = async () => {
				try {
					const axiosConfig = {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${auth.getToken()}`,
						},
					};
					await toast.promise(
						axios.post(
							`${urlProvider.urlBackend}/users/cart`,
							{ productId: product._id.toString() },
							axiosConfig
						),
						{
							loading: 'Agregando al carrito...',
							success: 'Producto agregado al carrito',
							error: 'No pudo agregarse el producto al carro',
						}
					);
					await getUserProductCart();
					added = true;
				} catch (err) {
					console.log(err);
				}
			};
			addProduct();
		} else {
			toast.error('Inicie sesión para continuar');
		}
		return added;
	};

	//TODO problema en back
	const removeProductToCart = (product) => {
		if (auth.user) {
			setLoadingProductCart(true);
			const addProduct = async () => {
				try {
					const axiosConfig = {
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${auth.getToken()}`,
						},
					};
					await toast.promise(
						axios.post(
							`${urlProvider.urlBackend}/users/cart/remove`,
							{ productId: product._id.toString() },
							axiosConfig
						),
						{
							loading: 'Removiendo del carrito...',
							success: 'Producto eliminado del carrito',
							error: 'No pudo removerse el producto del carro',
						}
					);
					await getUserProductCart();
				} catch (err) {
					console.log(err);
				}
			};
			addProduct();
		} else {
			toast.error('Inicie sesión para continuar');
		}
	};

	const isInCart = (product) => {
		if (auth.user && userProductCart) {
			return userProductCart.products.some((productInCart) => {
				return productInCart._id.toString() === product._id.toString();
			});
		}
		return false;
	};

	if (auth) {
		useEffect(() => {
			getUserProductCart();
		}, [auth.user]);
	}

	return { userProductCart, loadingProductCart, addProductToCart, removeProductToCart, isInCart };
}

export { useGetProductCart };
