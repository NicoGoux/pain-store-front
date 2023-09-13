import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';
import { useAuthService } from '../contexts/UserContext';
function usePaymentMethodService() {
	const auth = useAuthService();

	const insertPaymentMethod = async (data) => {
		if (auth.user && auth.isAdmin()) {
			console.log(data);
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.post(
					`${urlProvider.urlBackend}/payment-methods`,
					data,
					config
				);
				return response.data;
			} catch (error) {
				throw error;
			}
		}
	};

	const getAvailablePaymentMethodTypes = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			const response = await axios.get(
				`${urlProvider.urlBackend}/payment-methods/payment-method-types/available-payment-method-types`,
				config
			);
			return response.data;
		} catch (error) {
			toast.error('No pudieron cargarse los métodos de pago');
		}
	};

	const getPaymentMethodTypes = async () => {
		if (auth.user && auth.isAdmin()) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/payment-methods/payment-method-types`,
					config
				);
				return response.data;
			} catch (error) {
				toast.error('No pudieron cargarse los métodos de pago');
			}
		}
	};

	const getAvailablePaymentMethods = async (data) => {
		try {
			const paymentMethodType = data.paymentMethodType.paymentMethodTypeString;
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			const response = await axios.get(
				`${urlProvider.urlBackend}/payment-methods/available-payment-methods/${paymentMethodType}`,
				config
			);
			return response.data;
		} catch (error) {
			toast.error(
				'No pudieron obtenerse los detalles para el pago, comuníquese con nosotros para brindarle los detalles'
			);
		}
	};

	const getPaymentMethods = async (data) => {
		if (auth.user && auth.isAdmin()) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/payment-methods/${data}`,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				toast.error('No pudieron obtenerse los métodos de pago');
			}
		}
	};

	const toggleIsActivePaymentMethod = async (data) => {
		if (auth.user && auth.isAdmin()) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.get(
					`${urlProvider.urlBackend}/payment-methods/toggle-active-method/${data}`,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				toast.error('No pudo modificarse el estado del método de pago');
			}
		}
	};

	const deletePaymentMethod = async (data) => {
		if (auth.user && auth.isAdmin()) {
			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.getToken()}`,
					},
				};
				const response = await axios.delete(
					`${urlProvider.urlBackend}/payment-methods/${data}`,
					config
				);
				return response.data;
			} catch (error) {
				console.log(error);
				toast.error('No pudo eliminarse el método de pago');
			}
		}
	};

	const paymentMethodService = {
		insertPaymentMethod,
		getAvailablePaymentMethodTypes,
		getPaymentMethodTypes,
		getAvailablePaymentMethods,
		getPaymentMethods,
		toggleIsActivePaymentMethod,
		deletePaymentMethod,
	};

	return paymentMethodService;
}

export { usePaymentMethodService };
