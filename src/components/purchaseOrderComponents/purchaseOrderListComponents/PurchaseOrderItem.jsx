import React from 'react';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { useNavigate } from 'react-router-dom';

function PurchaseOrderItem({ purchaseOrder, purchaseOrderElement, isAdmin }) {
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
			<td className='py-6 px-3'>{purchaseOrder.orderNumber}</td>
			<td className='py-6 px-3'>{ArsPriceFormat.format(purchaseOrder.totalPrice)}</td>
			{isAdmin && <td className='py-6 px-3'>{purchaseOrder.user.username}</td>}
			<td className='py-6 px-3'>
				{purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString}
			</td>

			<td className='py-6 px-3'>
				{date ? `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}` : '-'}
			</td>
		</tr>
	);
}

export { PurchaseOrderItem };
