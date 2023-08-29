import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useProductStatusService } from '../../../contexts/AppContext';

function ProductStatusSelector({ defaultValue, onChange, enabled }) {
	const { statusList, loadingStatuses } = useProductStatusService();
	return (
		<>
			<ChevronDownIcon className='absolute right-0 w-6' focusable={false} />
			<select
				name='productStatus'
				id='productStatus'
				disabled={enabled}
				defaultValue={defaultValue}
				className='flex items-center h-fit pr-6 primary-input max-w-md px-2 py-1 appearance-none'
				onChange={onChange}
			>
				{!loadingStatuses &&
					statusList.map((status) => (
						<option key={status._id} value={status.productStatusString}>
							{status.productStatusString}
						</option>
					))}
			</select>
		</>
	);
}

export { ProductStatusSelector };
