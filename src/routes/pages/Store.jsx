import React, { useEffect, useState } from 'react';
import { ProductFilter } from '../../components/store/productFilter/ProductFilter';
import { ProductGrid } from '../../components/store/ProductGrid';
import { useGetCategories } from '../../hooks/useGetCategories';
import { useGetConditions } from '../../hooks/useGetConditions';

function Store() {
	const [loading, setLoading] = useState(true);

	const { categories, loadingCategories } = useGetCategories();

	const { conditions, loadingConditions } = useGetConditions();

	useEffect(() => {
		if (!loadingCategories && !loadingConditions) {
			setLoading(false);
		}
	}, [loadingCategories, loadingConditions]);

	const [filters, setFilters] = useState({
		name: null,
		price: null,
		category: null,
		float: null,
		condition: null,
		tradeLock: null,
	});

	return (
		<main className='main-container py-4 md:gap-14'>
			<ProductFilter
				categories={categories}
				conditions={conditions}
				setFilters={setFilters}
			/>
			<ProductGrid filters={filters} />
		</main>
	);
}

export { Store };
