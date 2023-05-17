import React from 'react';
import { ProductFilter } from '../../components/store/ProductFilter';
import { ProductGrid } from '../../components/store/ProductGrid';

function Store({ children }) {
	return (
		<main className='main-container overflow-y-scroll scroll pt-4 md:gap-14'>{children}</main>
	);
}

export { Store };
