import axios from 'axios';
import { urlProvider } from '../config/urlProvider';
import { useAuthService } from '../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { data } from 'autoprefixer';

function usePurchaseOrderService() {
	const auth = useAuthService();

	const createPurchaseOrder = async (data) => {
		try {
			const purchaseOrderData = {
				userData: {
					firstName: data.firstName,
					lastName: data.lastName,
					tradeLink: data.tradeLink,
				},
				products: data.products,
				paymentMethodType: data.paymentMethodType.paymentMethodTypeString,
				isCart: data.isCart,
			};

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			const response = await axios.post(
				`${urlProvider.urlBackend}/purchase-orders`,
				purchaseOrderData,
				config
			);

			return response.data;
		} catch (error) {
			throw new Error('No pudo realizarse el pedido de compra');
		}
	};

	const getUserPurchaseOrders = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			const response = await axios.get(
				`${urlProvider.urlBackend}/purchase-orders/user-purchase-orders`,
				config
			);
			return response.data;
		} catch (error) {
			console.log(error);
			toast.error('No pudieron obtenerse los pedidos de compra');
		}
	};

	const getPurchaseOrders = async (filters) => {
		if (auth.user && auth.isAdmin()) {
			let filterString = '?';
			for (const key in filters) {
				if (filters[key] && filters[key] != '') {
					filterString = filterString + `&${key}=${filters[key]}`;
				}
			}
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/purchase-orders/${filterString}`,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				toast.error('No pudieron obtenerse los pedidos de compra');
			}
		}
	};

	const getPurchaseOrder = async (id) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			let url = '/user-purchase-orders/';
			if (auth.isAdmin()) {
				url = '/';
			}
			const response = await axios.get(
				`${urlProvider.urlBackend}/purchase-orders${url}${id}`,
				config
			);
			return response.data;
		} catch (error) {
			toast.error('No pudo obtenerse el pedido de compra');
		}
	};

	const getPurchaseOrderByProduct = async (data) => {
		if (auth.user && auth.isAdmin()) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/purchase-orders/product-purchase-order/${data}`,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				toast.error('No pudo obtenerse el pedido de compra asociado');
			}
		}
	};

	const rejectPurchaseOrder = async (data) => {
		try {
			const purchaseOrderData = {
				purchaseOrderId: data,
			};

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			console.log(purchaseOrderData);
			const response = await axios.post(
				`${urlProvider.urlBackend}/purchase-orders/reject-purchase-order`,
				purchaseOrderData,
				config
			);
			return response.data;
		} catch (error) {
			console.log(error);
			toast.error('No pudo cancelarse el pedido de compra');
		}
	};

	const changeOrderStatus = async (data, state) => {
		if (auth.user && auth.isAdmin()) {
			try {
				const purchaseOrderData = {
					purchaseOrderId: data,
					purchaseOrderStatus: state,
				};

				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.post(
					`${urlProvider.urlBackend}/purchase-orders/update-order-status`,
					purchaseOrderData,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				toast.error('No pudo actualizarse el pedido de compra');
			}
		}
	};

	const purchaseOrderService = {
		createPurchaseOrder,
		getUserPurchaseOrders,
		getPurchaseOrders,
		getPurchaseOrder,
		getPurchaseOrderByProduct,
		rejectPurchaseOrder,
		changeOrderStatus,
	};

	return purchaseOrderService;
}

export { usePurchaseOrderService };
