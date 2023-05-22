import React, { useEffect, useState } from 'react';

function FloatFilter({ filters, setFilters }) {
	const [minFloat, setMinFloat] = useState('');

	const [maxFloat, setMaxFloat] = useState('');

	const onChangeMinFloatValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-9]+(\.[0-9]*)?$/;
		// Only numeric values
		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setMinFloat(event.target.value);
		}
	};

	const onChangeMaxFloatValue = (event) => {
		event.target.value = event.target.value.replace(',', '.');

		const numericRegex = /^[0-9]+(\.[0-9]*)?$/;

		if (event.target.value == '' || numericRegex.test(event.target.value)) {
			setMaxFloat(event.target.value);
		}
	};

	useEffect(() => {
		if (Number.parseFloat(minFloat) > 1) {
			setMinFloat('1');
			return;
		} else if (Number.parseFloat(maxFloat) > 1) {
			setMaxFloat('1');
			return;
		} else if (minFloat != '' && maxFloat != '') {
			if (Number.parseFloat(minFloat) > Number.parseFloat(maxFloat)) {
				setMinFloat(maxFloat);
				return;
			}

			setFilters((prevState) => ({
				...prevState,
				float: `min-float=${minFloat}&max-float=${maxFloat}`,
			}));
		} else if (minFloat != '') {
			setFilters((prevState) => ({
				...prevState,
				float: `min-float=${minFloat}`,
			}));
		} else if (maxFloat != '') {
			setFilters((prevState) => ({
				...prevState,
				float: `max-float=${maxFloat}`,
			}));
		} else {
			setFilters((prevState) => ({ ...prevState, float: '' }));
		}
	}, [minFloat, maxFloat]);

	useEffect(() => {
		if (filters.float === '') {
			setMinFloat('');
			setMaxFloat('');
		}
	}, [filters]);

	return (
		<div className='flex flex-col justify-center items-center gap-3 w-full'>
			<div className='flex justify-between w-fit gap-4'>
				<input
					placeholder='min. 0'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={minFloat}
					onChange={onChangeMinFloatValue}
				/>
				-
				<input
					placeholder='max. 1'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
					value={maxFloat}
					onChange={onChangeMaxFloatValue}
				/>
			</div>
		</div>
	);
}

export { FloatFilter };
