import React from 'react';
import { ProductFilter } from '../../components/store/productFilter/ProductFilter';
import { ProductGrid } from '../../components/store/productGrid/ProductGrid';

function Store() {
	return (
		<main className='relative flex items-center justify-center h-4/5 overflow-y-scroll scroll pt-4 md:gap-14'>
			<ProductFilter />
			<ProductGrid />
		</main>
	);
}

export { Store };
