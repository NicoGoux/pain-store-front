import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';

function useGetProductStatuses() {
	const [statusList, setStatusList] = useState([]);
	const [loadingStatuses, setLoadingStatuses] = useState(true);

	useEffect(() => {
		setLoadingStatuses(true);
		const getProductStatuses = async () => {
			try {
				const response = await axios.get(
					`${urlProvider.urlBackend}/products/product-statuses`
				);
				setStatusList(response.data);
			} catch (error) {
				toast.error('No pudieron cargarse los estados de producto');
			} finally {
				setLoadingStatuses(false);
			}
		};
		getProductStatuses();
	}, []);

	const productStatusService = {
		statusList,
		loadingStatuses,
	};

	return productStatusService;
}

export { useGetProductStatuses };
