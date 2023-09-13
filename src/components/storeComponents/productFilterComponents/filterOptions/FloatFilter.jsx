import React, { useEffect } from 'react';

function FloatFilter({ filters, setFilters }) {
	const onChangeMinFloatValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-1]{1}(\.[0-9]*)?$/;
		// Only numeric values
		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setFilters((prevState) => ({
				...prevState,
				minFloat: event.target.value,
			}));
		}
	};

	const onChangeMaxFloatValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-1]{1}(\.[0-9]*)?$/;

		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setFilters((prevState) => ({
				...prevState,
				maxFloat: event.target.value,
			}));
		}
	};

	useEffect(() => {
		if (!filters.minFloat && !filters.maxFloat) {
			return;
		}
		if (Number.parseFloat(filters.minFloat) > 1) {
			setFilters((prevState) => ({
				...prevState,
				minFloat: '1',
			}));
			return;
		} else if (Number.parseFloat(filters.maxFloat) > 1) {
			setFilters((prevState) => ({
				...prevState,
				maxFloat: '1',
			}));
			return;
		}
	}, [filters.minFloat, filters.maxFloat]);

	return (
		<div className='flex flex-col justify-center items-center gap-3 w-full'>
			<div className='flex justify-between w-fit gap-4'>
				<input
					placeholder='min. 0'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={filters.minFloat.replace('.', ',')}
					onChange={onChangeMinFloatValue}
				/>
				-
				<input
					placeholder='max. 1'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={filters.maxFloat.replace('.', ',')}
					onChange={onChangeMaxFloatValue}
				/>
			</div>
		</div>
	);
}

export { FloatFilter };
