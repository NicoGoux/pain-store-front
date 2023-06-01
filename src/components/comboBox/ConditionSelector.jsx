import React from 'react';
import { useConditionService } from '../../contexts/AppContext';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

function ConditionSelector({ defaultValue, onChange, enabled }) {
	const { conditionList, loadingConditions } = useConditionService();
	return (
		<>
			<ChevronDownIcon className='absolute right-0 w-6' focusable={false} />
			<select
				name='skinCondition'
				id='skinCondition'
				disabled={enabled}
				defaultValue={defaultValue}
				className='flex items-center h-fit pr-6 primary-input max-w-md px-2 py-1 appearance-none'
				onChange={onChange}
			>
				<option value=''>Ninguno seleccionado</option>
				{!loadingConditions &&
					conditionList.map((skinCondition) => (
						<option key={skinCondition._id} value={skinCondition.skinConditionString}>
							{skinCondition.skinConditionString}
						</option>
					))}
			</select>
		</>
	);
}

export { ConditionSelector };
