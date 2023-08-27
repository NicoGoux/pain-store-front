import React from 'react';
import { ArsPriceFormat } from '../../config/priceFormat';

function PurchaseOrderItem({ purchaseOrder, matches, purchaseOrderElement }) {
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
				console.log(purchaseOrder);
			}}
		>
			<td className='py-6 px-4'>{purchaseOrder.orderNumber}</td>
			<td className='py-6 px-4'>{ArsPriceFormat.format(purchaseOrder.totalPrice)}</td>
			<td className='py-6 px-4'>
				{purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString}
			</td>
			{/* Asume que status es el atributo del estado */}

			{!matches && (
				<td className='py-6 px-4'>
					{date
						? `${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`
						: '-'}
				</td>
			)}

			{/* Asume que date es el atributo de la fecha */}
		</tr>
	);
}

export { PurchaseOrderItem };
