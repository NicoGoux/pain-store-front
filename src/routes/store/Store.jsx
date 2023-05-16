import React from 'react';
import { ProductFilter } from '../../components/store/productFilter/ProductFilter';

function Store() {
	return (
		<main className='flex items-center justify-center h-4/5 p-6'>
			<ProductFilter></ProductFilter>
			<div className='w-5/6'></div>
		</main>
	);
}

export { Store };
