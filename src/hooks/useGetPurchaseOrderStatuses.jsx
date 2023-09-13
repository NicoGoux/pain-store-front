import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';

function useGetPurchaseOrderStatuses() {
	const [statusList, setStatusList] = useState([]);
	const [loadingStatuses, setLoadingStatuses] = useState(true);

	useEffect(() => {
		setLoadingStatuses(true);
		const getPurchaseOrderStatuses = async () => {
			try {
				const response = await axios.get(
					`${urlProvider.urlBackend}/purchase-orders/purchase-order-statuses`
				);
				setStatusList(response.data);
			} catch (error) {
				toast.error('No pudieron cargarse los estados de pedidos');
			} finally {
				setLoadingStatuses(false);
			}
		};
		getPurchaseOrderStatuses();
	}, []);

	const purchaseOrderStatusService = {
		statusList,
		loadingStatuses,
	};

	return purchaseOrderStatusService;
}

export { useGetPurchaseOrderStatuses };
