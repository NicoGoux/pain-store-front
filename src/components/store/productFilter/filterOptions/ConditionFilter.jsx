import { CheckIcon, ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';
import { ConditionItem } from './conditionItem/ConditionItem';

function ConditionFilter({ conditions, filters, setFilters }) {
	return (
		<div className='flex w-full text-base'>
			<ul className='flex flex-col gap-2'>
				{conditions.length === 0 ? (
					<p className='text-error-label-color'>condiciones de skin no encontradas</p>
				) : (
					conditions.map((condition) => (
						<ConditionItem
							condition={condition}
							filters={filters}
							setFilters={setFilters}
						/>
					))
				)}
			</ul>
		</div>
	);
}

export { ConditionFilter };
