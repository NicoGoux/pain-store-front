import React, { useEffect, useState } from 'react';
import { ProductFilter } from '../../../components/storeComponents/productFilterComponents/ProductFilter';
import { ProductGrid } from '../../../components/storeComponents/ProductGridComponents/ProductGrid';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';
import tailwindConfig from '../../../../tailwind.config';
import { useSearchParams } from 'react-router-dom';
import { productStatusStrings } from '../../../config/productStatusStrings';

function Store() {
	const [searching, setSearching] = useState(false);

	const [searchParams, setSearchParams] = useSearchParams();

	const matches = useMediaQuery(tailwindConfig.theme.screens.md);

	const [filters, setFilters] = useState({
		name: '',
		minPrice: '',
		maxPrice: '',
		category: '',
		minFloat: '',
		maxFloat: '',
		condition: '',
		productStatus: productStatusStrings.DISPONIBLE,
		nonTradeLock: false,
	});

	useEffect(() => {
		if (searchParams.size != 0) {
			const newFilterObject = {};
			for (const key in filters) {
				if (searchParams.get(key)) {
					newFilterObject[key] = searchParams.get(key);
				}
			}
			setFilters((prevState) => ({ ...prevState, ...newFilterObject }));
		} else {
			setFilters((prevState) => ({
				...prevState,
				...{
					name: '',
					minPrice: '',
					maxPrice: '',
					category: '',
					minFloat: '',
					maxFloat: '',
					condition: '',
					nonTradeLock: false,
				},
			}));
		}
		setSearching(true);
	}, [searchParams, filters.productStatus]);

	return (
		<main className={`main-container py-4 md:gap-14 ${matches && 'block'}`}>
			<>
				<ProductFilter
					filters={filters}
					setFilters={setFilters}
					setSearchParams={setSearchParams}
					matches={matches}
					searching={searching}
				/>
				<ProductGrid filters={filters} searching={searching} setSearching={setSearching} />
			</>
		</main>
	);
}

export { Store };
