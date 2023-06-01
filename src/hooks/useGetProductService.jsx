import axios from 'axios';
import { urlProvider } from '../config/urlProvider';
import { useAuthService } from '../contexts/UserContext';
function useGetProductService() {
	const auth = useAuthService();
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
			return;
		}
	};

	const productService = { updateProduct };

	return productService;
}

export { useGetProductService };
