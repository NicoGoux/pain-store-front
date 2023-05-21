import React, { useEffect, useState } from 'react';

function NameFilter({ filters, setFilters }) {
	const [nameFilter, setNameFilter] = useState('');

	const onNameFilterChange = (event) => {
		setNameFilter(event.target.value);
	};

	useEffect(() => {
		if (nameFilter === '') {
			setFilters((prevState) => ({ ...prevState, name: '' }));
		} else {
			setFilters((prevState) => ({ ...prevState, name: `name=${nameFilter}` }));
		}
	}, [nameFilter]);

	useEffect(() => {
		if (filters.name === '') {
			setNameFilter('');
		}
	}, [filters]);

	return (
		<input
			placeholder='Nombre Producto'
			type='text'
			className='secondary-input text-center w-full'
			value={nameFilter}
			onChange={onNameFilterChange}
		></input>
	);
}

export { NameFilter };
