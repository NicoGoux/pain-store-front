import { createContext, useContext } from 'react';
import { useGetConditions } from '../hooks/useGetConditions';
import { useGetCategories } from '../hooks/useGetCategories';
import { useGetProductStatuses } from '../hooks/useGetProductStatuses';

const AppContext = createContext({});

function AppProvider(props) {
	const categoryService = useGetCategories();

	const conditionService = useGetConditions();

	const productStatusService = useGetProductStatuses();

	return (
		<AppContext.Provider
			value={{
				categoryService,
				conditionService,
				productStatusService,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

const useCategoryService = () => {
	const { categoryService } = useContext(AppContext);
	return categoryService;
};

const useConditionService = () => {
	const { conditionService } = useContext(AppContext);
	return conditionService;
};

const useProductStatusService = () => {
	const { productStatusService } = useContext(AppContext);
	return productStatusService;
};

export {
	AppContext,
	AppProvider,
	useCategoryService,
	useConditionService,
	useProductStatusService,
};
