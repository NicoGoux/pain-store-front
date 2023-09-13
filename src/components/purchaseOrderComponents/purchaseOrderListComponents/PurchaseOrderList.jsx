import React from 'react';
import { PurchaseOrderItem } from './PurchaseOrderItem';
import { useAuthService } from '../../../contexts/UserContext';

function PurchaseOrderList({ purchaseOrderList }) {
	const authService = useAuthService();

	let purchaseOrderElement = 0;
	return (
		<div className='flex w-full h-full items-center justify-center px-4'>
			{purchaseOrderList.length === 0 ? (
				<div className='flex items-center justify-center h-24'>
					<h3 className='text-xl'>No se encuentran pedidos de compra</h3>
				</div>
			) : (
				<div className='flex flex-col gap-4 w-full h-fit xsm:px-4 xsm:max-h-[45vh] overflow-x-hidden xsm:overflow-y-auto xsm:scroll'>
					<table className='text-base text-center text-secondary-font-color'>
						<thead className='sticky top-0 '>
							<tr className='bg-card-background-color'>
								<th className='py-4 px-3'>N°</th>
								<th className='py-4 px-3'>Precio</th>
								{authService.isAdmin() && <th className='py-4 px-3'>Usuario</th>}
								<th className='py-4 px-3'>Estado</th>
								<th className='py-4 px-3'>Fecha</th>
							</tr>
						</thead>
						<tbody>
							{purchaseOrderList.map((purchaseOrder) => {
								purchaseOrderElement++;
								return (
									<PurchaseOrderItem
										key={purchaseOrder._id}
										purchaseOrder={purchaseOrder}
										purchaseOrderElement={purchaseOrderElement}
										isAdmin={authService.isAdmin()}
									/>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}

export { PurchaseOrderList };
