import React, { useEffect, useState } from 'react';

function PriceFilter({ filters, setFilters }) {
	const [minPrice, setMinPrice] = useState('');

	const [maxPrice, setMaxPrice] = useState('');

	const onChangeMinPriceValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-9]+(\.[0-9]*)?$/;
		// Only numeric values
		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setMinPrice(event.target.value);
		}
	};

	const onChangeMaxPriceValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-9]+(\.[0-9]*)?$/;
		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setMaxPrice(event.target.value);
		}
	};

	useEffect(() => {
		if (minPrice != '' && maxPrice != '') {
			if (Number.parseFloat(minPrice) > Number.parseFloat(maxPrice)) {
				setMinPrice(maxPrice);
				return;
			}
			setFilters((prevState) => ({
				...prevState,
				price: `min-price=${minPrice}&max-price=${maxPrice}`,
			}));
		} else if (minPrice != '') {
			setFilters((prevState) => ({
				...prevState,
				price: `min-price=${minPrice}`,
			}));
		} else if (maxPrice != '') {
			setFilters((prevState) => ({
				...prevState,
				price: `max-price=${maxPrice}`,
			}));
		} else {
			setFilters((prevState) => ({ ...prevState, price: '' }));
		}
	}, [minPrice, maxPrice]);

	useEffect(() => {
		if (filters.price === '') {
			setMinPrice('');
			setMaxPrice('');
		}
	}, [filters]);

	return (
		<div className='flex flex-col justify-center items-center gap-3 w-full'>
			<div className='flex justify-between w-fit gap-4'>
				<input
					placeholder='0 ARS'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={minPrice}
					onChange={onChangeMinPriceValue}
				/>
				-
				<input
					placeholder='1000 ARS'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={maxPrice}
					onChange={onChangeMaxPriceValue}
				/>
			</div>
		</div>
	);
}

export { PriceFilter };
