import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useGetPurchaseOrderStatuses } from '../../../hooks/useGetPurchaseOrderStatuses';

function PurchaseOrderStatusSelector({ defaultValue, onChange, enabled }) {
	const { statusList, loadingStatuses } = useGetPurchaseOrderStatuses();

	return (
		<>
			<ChevronDownIcon className='absolute right-0 w-6' focusable={false} />
			<select
				name='paymentMethodType'
				id='paymentMethodType'
				disabled={enabled}
				defaultValue={defaultValue}
				className='flex items-center secondary-input text-center h-fit w-full px-2 py-1 appearance-none'
				onChange={onChange}
			>
				<option value={''}>Estado del pedido</option>
				{!loadingStatuses &&
					statusList.map((purchaseOrderStatus) => (
						<option
							key={purchaseOrderStatus._id}
							value={purchaseOrderStatus.purchaseOrderStatusString}
						>
							{purchaseOrderStatus.purchaseOrderStatusString}
						</option>
					))}
			</select>
		</>
	);
}

export { PurchaseOrderStatusSelector };
