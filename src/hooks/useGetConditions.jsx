import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-hot-toast';
function useGetConditions() {
	const { urlProvider } = useContext(AppContext);
	const [conditions, setConditions] = useState([]);
	const [loadingConditions, setLoadingConditions] = useState(true);

	useEffect(() => {
		setLoadingConditions(true);
		const getConditions = async () => {
			try {
				const response = await axios.get(
					`${urlProvider.getUrlBackend()}/products/skin-conditions`
				);
				setConditions(response.data);
			} catch (error) {
				toast.error('No pudieron cargarse las condiciones');
			} finally {
				setLoadingConditions(false);
			}
		};
		getConditions();
	}, []);

	return { conditions, loadingConditions };
}

export { useGetConditions };