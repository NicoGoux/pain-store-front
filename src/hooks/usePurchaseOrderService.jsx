import axios from 'axios';
import { urlProvider } from '../config/urlProvider';
import { useAuthService } from '../contexts/UserContext';
import { toast } from 'react-hot-toast';
import { purchaseOrderStatusStrings } from '../config/purchaseOrderStatusStrings';
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

	const getPurchaseOrders = async () => {
		if (auth.user && auth.isAdmin()) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/purchase-orders`,
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
			const response = await axios.get(
				`${urlProvider.urlBackend}/purchase-orders/user-purchase-orders/${id}`,
				config
			);
			return response.data;
		} catch (error) {
			toast.error('No pudo obtenerse el pedido de compra');
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
			const response = await axios.post(
				`${urlProvider.urlBackend}/purchase-orders/reject-purchase-order`,
				purchaseOrderData,
				config
			);
			return response.data;
		} catch (error) {
			console.log(error);
			throw new Error('No pudo cancelarse el pedido de compra');
		}
	};

	const purchaseOrderService = {
		createPurchaseOrder,
		getUserPurchaseOrders,
		getPurchaseOrders,
		getPurchaseOrder,
		rejectPurchaseOrder,
	};

	return purchaseOrderService;
}

export { usePurchaseOrderService };
