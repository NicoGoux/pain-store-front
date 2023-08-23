import axios from 'axios';
import { urlProvider } from '../config/urlProvider';
import { useAuthService } from '../contexts/UserContext';
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
			console.log(error);
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
			throw new Error('No pudieron obtenerse las ordenes de compra');
		}
	};

	const purchaseOrderService = { createPurchaseOrder, getUserPurchaseOrders };

	return purchaseOrderService;
}

export { usePurchaseOrderService };
