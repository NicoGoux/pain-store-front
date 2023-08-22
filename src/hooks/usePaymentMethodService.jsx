import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';
import { useAuthService } from '../contexts/UserContext';
function usePaymentMethodService() {
	const auth = useAuthService();

	const getAvailablePaymentMethodTypes = async () => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.getToken()}`,
				},
			};
			const response = await axios.get(
				`${urlProvider.urlBackend}/payment-methods/available-payment-method-types`,
				config
			);
			return response.data;
		} catch (error) {
			console.log(error);
			toast.error('No pudieron cargarse los metodos de pago');
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
				`${urlProvider.urlBackend}/payment-methods/${paymentMethodType}`,
				config
			);
			return response.data;
		} catch (error) {
			console.log(error);
			toast.error(
				'No pudieron obtenerse los detalles para el pago, comuníquese con nosotros para brindarle los detalles '
			);
		}
	};

	const paymentMethodService = { getAvailablePaymentMethodTypes, getAvailablePaymentMethods };

	return paymentMethodService;
}

export { usePaymentMethodService };
