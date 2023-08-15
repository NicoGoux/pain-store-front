import { CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';

function ProductStatusItem({ productStatus, filters, setFilters, searching }) {
	const [isSelected, setIsSelected] = useState(false);

	const onClickConditionOption = () => {
		if (isSelected) {
			setFilters((prevState) => ({
				...prevState,
				productStatus: '',
			}));
		} else {
			setFilters((prevState) => ({
				...prevState,
				productStatus: productStatus.productStatusString,
			}));
		}
	};

	useEffect(() => {
		if (
			filters.productStatus.toLowerCase() === productStatus.productStatusString.toLowerCase()
		) {
			setIsSelected(true);
		} else {
			setIsSelected(false);
		}
	}, [filters]);

	const showName =
		productStatus.productStatusString.charAt(0).toUpperCase() +
		productStatus.productStatusString.toLowerCase().slice(1);

	return (
		<li
			key={productStatus._id}
			className={`flex gap-2 ${
				isSelected
					? 'underline decoration-border-color decoration-2 font-semibold text-lg cursor-pointer'
					: 'hover:underline hover:text-lg cursor-pointer'
			}`}
			onClick={!searching && onClickConditionOption}
		>
			<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
			<p>{showName}</p>
			{isSelected && <CheckIcon className={'w-5 text-secondary-font-color'} />}
		</li>
	);
}

export { ProductStatusItem };
