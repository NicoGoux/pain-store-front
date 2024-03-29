import React, { useEffect, useState } from 'react';
import { CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import { capitalize } from '../../../../../config/capitalize';

function CategoryWithoutChildren({ category, filters, setFilters }) {
	const [isSelected, setIsSelected] = useState(false);

	const onClickCategoryOption = () => {
		if (isSelected) {
			setFilters((prevState) => ({ ...prevState, category: '' }));
		} else {
			setFilters((prevState) => ({ ...prevState, category: category.name }));
		}
	};

	useEffect(() => {
		if (filters.category.toLowerCase() === category.name.toLowerCase()) {
			setIsSelected(true);
		} else {
			setIsSelected(false);
		}
	}, [filters]);

	const showName = capitalize(category.name);
	return (
		<li
			className={`flex gap-2 ${
				isSelected
					? 'underline decoration-border-color decoration-2 font-semibold text-lg cursor-pointer'
					: 'hover:underline hover:text-lg cursor-pointer'
			}`}
			onClick={onClickCategoryOption}
		>
			<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
			<p>{showName}</p>
			{isSelected && <CheckIcon className={'w-5 text-secondary-font-color'} />}
		</li>
	);
}

export { CategoryWithoutChildren };
