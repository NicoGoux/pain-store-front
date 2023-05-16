import React from 'react';
import { ProductFilter } from '../../components/store/productFilter/ProductFilter';
import { ProductGrid } from '../../components/store/productGrid/ProductGrid';

function Store() {
	return (
		<main className='flex items-center justify-center gap-14 h-4/5 px-6'>
			<ProductFilter />
			<ProductGrid />
		</main>
	);
}

export { Store };
