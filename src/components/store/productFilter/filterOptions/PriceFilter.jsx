import React, { useEffect } from 'react';

function PriceFilter({ filters, setFilters }) {
	const onChangeMinPriceValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-9]+(\.[0-9]*)?$/;
		// Only numeric values
		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setFilters((prevState) => ({
				...prevState,
				minPrice: event.target.value,
			}));
		}
	};

	const onChangeMaxPriceValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-9]+(\.[0-9]*)?$/;
		// Only numeric values
		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setFilters((prevState) => ({
				...prevState,
				maxPrice: event.target.value,
			}));
		}
	};

	useEffect(() => {
		if (!filters.minPrice && !filters.maxPrice) {
			return;
		}

		if (filters.minPrice != '' && filters.maxPrice != '') {
			const minPriceNumber = Number.parseFloat(filters.minPrice.replace(',', '.'));
			const maxPriceNumber = Number.parseFloat(filters.maxPrice.replace(',', '.'));
			if (minPriceNumber > maxPriceNumber) {
				setFilters((prevState) => ({
					...prevState,
					minPrice: filters.maxPrice,
				}));
				return;
			}
		}
	}, [filters.minPrice, filters.maxPrice]);

	return (
		<div className='flex flex-col justify-center items-center gap-3 w-full'>
			<div className='flex justify-between w-fit gap-4'>
				<input
					placeholder='0 ARS'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={filters.minPrice.replace('.', ',')}
					onChange={onChangeMinPriceValue}
				/>
				-
				<input
					placeholder='1000 ARS'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={filters.maxPrice.replace('.', ',')}
					onChange={onChangeMaxPriceValue}
				/>
			</div>
		</div>
	);
}

export { PriceFilter };
