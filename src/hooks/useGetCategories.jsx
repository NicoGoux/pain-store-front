import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../contexts/AppContext';
import { toast } from 'react-hot-toast';
function useGetCategories() {
	const { urlBack } = useContext(AppContext);
	const [categories, setCategories] = useState([]);
	const [loadingCategories, setLoadingCategories] = useState(true);

	useEffect(() => {
		setLoadingCategories(true);
		const getCategories = async () => {
			try {
				const response = await axios.get(`${urlBack}/products/categories`);
				setCategories(response.data);
			} catch (error) {
				toast.error('No pudieron cargarse las categorias');
			} finally {
				setLoadingCategories(false);
			}
		};
		getCategories();
	}, []);

	return { categories, loadingCategories };
}

export { useGetCategories };
