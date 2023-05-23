import React, { useEffect, useState } from 'react';
import { ProductFilter } from '../../../components/store/productFilter/ProductFilter';
import { ProductGrid } from '../../../components/store/ProductGrid/ProductGrid';
import { useGetCategories } from '../../../hooks/useGetCategories';
import { useGetConditions } from '../../../hooks/useGetConditions';
import { Loader } from '../../../components/loader/Loader';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';
import tailwindConfig from '../../../../tailwind.config';

function Store() {
	const [loading, setLoading] = useState(true);

	const { categories, loadingCategories } = useGetCategories();

	const { conditions, loadingConditions } = useGetConditions();

	const matches = useMediaQuery(tailwindConfig.theme.screens.md);

	useEffect(() => {
		if (!loadingCategories && !loadingConditions) {
			setLoading(false);
		}
	}, [loadingCategories, loadingConditions]);

	const [filters, setFilters] = useState({
		name: '',
		price: '',
		category: '',
		float: '',
		condition: '',
		nonTradeLock: '',
	});

	useEffect(() => {
		let string = '?';
		for (const key in filters) {
			if (filters[key] != '') {
				string = string + `&${filters[key]}`;
			}
		}
	}, [filters]);

	return (
		<main className={`main-container py-4 md:gap-14 ${matches && 'block'}`}>
			{loading ? (
				<Loader />
			) : (
				<>
					<ProductFilter
						categories={categories}
						conditions={conditions}
						filters={filters}
						setFilters={setFilters}
						matches={matches}
					/>
					<ProductGrid filters={filters} />
				</>
			)}
		</main>
	);
}

export { Store };
