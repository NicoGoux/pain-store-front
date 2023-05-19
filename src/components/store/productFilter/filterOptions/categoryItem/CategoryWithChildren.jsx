import React, { useState } from 'react';
import {
	ChevronDoubleRightIcon,
	ChevronRightIcon,
	ChevronDownIcon,
} from '@heroicons/react/20/solid';

function CategoryWithChildren({ category, childrenCategories }) {
	const [openSubCategories, setOpenSubCategories] = useState(false);

	const showName = category.name.charAt(0) + category.name.toLowerCase().slice(1);
	return (
		<li className='flex flex-col'>
			<div className='flex gap-2 mb-2'>
				<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
				<p>{showName}</p>
				{!openSubCategories ? (
					<ChevronRightIcon
						className='w-5 text-secondary-font-color cursor-pointer'
						onClick={() => setOpenSubCategories(true)}
					/>
				) : (
					<ChevronDownIcon
						className='w-5 text-secondary-font-color cursor-pointer'
						onClick={() => setOpenSubCategories(false)}
					/>
				)}
			</div>
			{openSubCategories && (
				<ul className='flex flex-col gap-1 ml-4'>{childrenCategories}</ul>
			)}
		</li>
	);
}

export { CategoryWithChildren };
