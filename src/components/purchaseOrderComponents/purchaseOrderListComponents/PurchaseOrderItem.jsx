import React from 'react';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { useNavigate } from 'react-router-dom';

function PurchaseOrderItem({ purchaseOrder, matches, purchaseOrderElement }) {
	const navigate = useNavigate();
	let date;

	if (purchaseOrder.createdAt) {
		date = new Date(purchaseOrder.createdAt);
	}

	return (
		<tr
			key={purchaseOrder._id}
			className={`cursor-pointer my-2 bg-card-background-color ${
				purchaseOrderElement % 2 == 0 ? 'bg-opacity-100' : 'bg-opacity-70'
			}`}
			onClick={() => {
				navigate(`./${purchaseOrder._id}`);
			}}
		>
			<td className='py-6 px-4'>{purchaseOrder.orderNumber}</td>
			<td className='py-6 px-4'>{ArsPriceFormat.format(purchaseOrder.totalPrice)}</td>
			<td className='py-6 px-4'>
				{purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString}
			</td>

			{!matches && (
				<td className='py-6 px-4'>
					{date
						? `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
						: '-'}
				</td>
			)}
		</tr>
	);
}

export { PurchaseOrderItem };
