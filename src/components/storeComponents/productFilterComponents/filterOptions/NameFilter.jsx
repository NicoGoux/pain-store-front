import React from 'react';

function NameFilter({ filters, setFilters }) {
	const onNameFilterChange = (event) => {
		setFilters((prevState) => ({ ...prevState, name: event.target.value }));
	};

	return (
		<input
			placeholder='Nombre Producto'
			type='text'
			className='secondary-input text-center w-full'
			value={filters.name}
			onChange={onNameFilterChange}
		/>
	);
}

export { NameFilter };
