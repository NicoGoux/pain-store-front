import { CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';

function ConditionItem({ condition, filters, setFilters }) {
	const [isSelected, setIsSelected] = useState(false);

	const onClickConditionOption = () => {
		setFilters((prevState) => ({
			...prevState,
			condition: `condition=${condition.skinConditionString}`,
		}));
	};

	useEffect(() => {
		if (filters.condition != null) {
			if (
				filters.condition
					.toLowerCase()
					.includes(condition.skinConditionString.toLowerCase())
			) {
				setIsSelected(true);
			} else {
				setIsSelected(false);
			}
		}
	}, [filters]);

	const showName = `${condition.skinConditionString} (${condition.initials})`;
	return (
		<li
			key={condition._id}
			className={`flex gap-2 ${
				isSelected
					? 'underline decoration-border-color decoration-2 font-semibold text-lg'
					: 'hover:underline hover:text-lg cursor-pointer'
			}`}
			onClick={onClickConditionOption}
		>
			<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
			<p>{showName}</p>
			{isSelected && <CheckIcon className={'w-5 text-secondary-font-color'} />}
		</li>
	);
}

export { ConditionItem };
