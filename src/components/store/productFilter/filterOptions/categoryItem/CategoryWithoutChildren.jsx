import React, { useEffect, useState } from 'react';
import { CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';

function CategoryWithoutChildren({ category, filters, setFilters }) {
	const [isSelected, setIsSelected] = useState(false);

	const onClickCategoryOption = () => {
		if (isSelected) {
			setFilters((prevState) => ({ ...prevState, category: '' }));
		} else {
			setFilters((prevState) => ({ ...prevState, category: `category=${category.name}` }));
		}
	};

	useEffect(() => {
		if (filters.category != null) {
			if (filters.category.toLowerCase().includes(category.name.toLowerCase())) {
				setIsSelected(true);
			} else {
				setIsSelected(false);
			}
		}
	}, [filters]);

	const showName = category.name.charAt(0) + category.name.toLowerCase().slice(1);
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
