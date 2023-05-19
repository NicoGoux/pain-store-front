import React from 'react';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';

function CategoryWithoutChildren({ category }) {
	const showName = category.name.charAt(0) + category.name.toLowerCase().slice(1);
	return (
		<li className='flex gap-2'>
			<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
			<p>{showName}</p>
		</li>
	);
}

export { CategoryWithoutChildren };
