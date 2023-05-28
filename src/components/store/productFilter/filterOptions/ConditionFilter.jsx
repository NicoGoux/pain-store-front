import React from 'react';
import { ConditionItem } from './conditionItem/ConditionItem';
import { useConditionService } from '../../../../contexts/AppContext';
import { Loader } from '../../../loader/Loader';

function ConditionFilter({ filters, setFilters }) {
	const { conditionList, loadingConditions } = useConditionService();

	return (
		<>
			{loadingConditions ? (
				<div>
					<Loader />
				</div>
			) : (
				<div className='flex w-full text-base'>
					<ul className='flex flex-col gap-2'>
						{conditionList.length === 0 ? (
							<p className='text-error-color'>condiciones de skin no encontradas</p>
						) : (
							conditionList.map((condition) => (
								<ConditionItem
									key={condition._id}
									condition={condition}
									filters={filters}
									setFilters={setFilters}
								/>
							))
						)}
					</ul>
				</div>
			)}
		</>
	);
}

export { ConditionFilter };
