import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { urlProvider } from '../config/urlProvider';
function useGetCategories() {
	const [categoryList, setCategoryList] = useState([]);
	const [loadingCategories, setLoadingCategories] = useState(true);

	useEffect(() => {
		setLoadingCategories(true);
		const getCategories = async () => {
			try {
				const response = await axios.get(`${urlProvider.urlBackend}/products/categories`);
				setCategoryList(response.data);
			} catch (error) {
				console.log(error);
				toast.error('No pudieron cargarse las categorias');
			} finally {
				setLoadingCategories(false);
			}
		};
		getCategories();
	}, []);

	const categoryService = { categoryList, loadingCategories };

	return categoryService;
}

export { useGetCategories };
