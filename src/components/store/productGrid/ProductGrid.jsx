import React from 'react';
import { ProductCard } from './product/ProductCard';

function ProductGrid() {
	const products = [
		{
			name: 'AK-47 | Fire Serpent',
			marketHash: 'AK-47 | Fire Serpent (Factory New)',
			float: 0.0382,
			tradeLock: null,
			price: 4500,
		},
		{
			name: 'M4A4 | Howl',
			marketHash: 'M4A4 | Howl (Minimal Wear)',
			float: 0.0812,
			tradeLock: '2023-05-18',
			price: 3200,
		},
		{
			name: 'AWP | Dragon Lore',
			marketHash: 'AWP | Dragon Lore (Field-Tested)',
			float: 0.1765,
			tradeLock: '2023-05-20',
			price: 7800,
		},
		{
			name: 'Glock-18 | Fade',
			marketHash: 'Glock-18 | Fade (Factory New)',
			float: 0.0099,
			tradeLock: null,
			price: 1200,
		},
		{
			name: 'USP-S | Kill Confirmed',
			marketHash: 'USP-S | Kill Confirmed (Minimal Wear)',
			float: 0.0956,
			tradeLock: '2023-05-19',
			price: 2200,
		},
		{
			name: 'Desert Eagle | Blaze',
			marketHash: 'Desert Eagle | Blaze (Minimal Wear)',
			float: 0.3548,
			tradeLock: '2023-05-17',
			price: 1600,
		},
		{
			name: 'AK-47 | Vulcan',
			marketHash: 'AK-47 | Vulcan (Well-Worn)',
			float: 0.4021,
			tradeLock: '2023-05-16',
			price: 1800,
		},
		{
			name: 'AWP | Medusa',
			marketHash: 'AWP | Medusa (Minimal Wear)',
			float: 0.0817,
			tradeLock: null,
			price: 6000,
		},
		{
			name: 'M4A1-S | Knight',
			marketHash: 'M4A1-S | Knight (Factory New)',
			float: 0.0078,
			tradeLock: null,
			price: 2800,
		},
		{
			name: 'Karambit | Doppler',
			marketHash: '★ Karambit | Case Hardened (Factory New)',
			float: 0.4256,
			tradeLock: '2023-05-22',
			price: 4200,
		},
		{
			name: 'M4A1-S | Knight',
			marketHash: 'M4A1-S | Knight (Factory New)',
			float: 0.0078,
			tradeLock: null,
			price: 2800,
		},
		{
			name: 'Karambit | Doppler',
			marketHash: '★ Karambit | Case Hardened (Factory New)',
			float: 0.4256,
			tradeLock: '2023-05-22',
			price: 4200,
		},
		{
			name: 'M4A1-S | Knight',
			marketHash: 'M4A1-S | Knight (Factory New)',
			float: 0.0078,
			tradeLock: null,
			price: 2800,
		},
		{
			name: 'Karambit | Doppler',
			marketHash: '★ Karambit | Case Hardened (Factory New)',
			float: 0.4256,
			tradeLock: '2023-05-22',
			price: 4200,
		},
	];

	return (
		<section
			id='productGridSection'
			className='grid gap-x-8 gap-y-12 xsm:grid-cols-2 xl:grid-cols-4 h-full px-2 w-full md:w-5/6 md:px-0 md:pr-6'
		>
			{products.map((product) => (
				<ProductCard product={product} />
			))}
		</section>
	);
}

export { ProductGrid };
