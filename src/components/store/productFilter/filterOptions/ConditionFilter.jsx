import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

function ConditionFilter({ conditions }) {
	return (
		<div className='flex w-full text-base'>
			<ul className='flex flex-col gap-2'>
				{conditions.length === 0 ? (
					<p className='text-error-label-color'>Categorias no encontradas</p>
				) : (
					conditions.map((condition) => {
						const showName = `${condition.skinConditionString} (${condition.initials})`;
						return (
							<li key={condition._id} className='flex gap-2'>
								<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
								<p>{showName}</p>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
}

export { ConditionFilter };
