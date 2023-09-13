import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';
function useGetConditions() {
	const [conditionList, setConditionList] = useState([]);
	const [loadingConditions, setLoadingConditions] = useState(true);

	useEffect(() => {
		setLoadingConditions(true);
		const getConditions = async () => {
			try {
				const response = await axios.get(
					`${urlProvider.urlBackend}/products/skin-conditions`
				);
				setConditionList(response.data);
			} catch (error) {
				toast.error('No pudieron cargarse las condiciones');
			} finally {
				setLoadingConditions(false);
			}
		};
		getConditions();
	}, []);

	const conditionService = {
		conditionList,
		loadingConditions,
	};

	return conditionService;
}

export { useGetConditions };
