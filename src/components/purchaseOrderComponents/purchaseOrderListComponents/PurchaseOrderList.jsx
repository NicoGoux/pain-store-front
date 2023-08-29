import React from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';
import tailwindConfig from '../../../../tailwind.config';
import { PurchaseOrderItem } from './PurchaseOrderItem';

function PurchaseOrderList({ purchaseOrderList }) {
	const matches = useMediaQuery(tailwindConfig.theme.screens.xsm);

	let purchaseOrderElement = 0;
	return (
		<div className='flex w-full h-full items-center justify-center pt-4'>
			{purchaseOrderList.length === 0 ? (
				<div className='flex items-center justify-center h-24'>
					<h3 className='text-xl'>No se encuentran pedidos de compra del usuario</h3>
				</div>
			) : (
				<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
					<table className='text-base text-center text-secondary-font-color'>
						<thead className='sticky top-0'>
							<tr className='bg-card-background-color'>
								<th className='py-4 px-4'>N°</th>
								<th className='py-4 px-4'>Precio</th>
								<th className='py-4 px-4'>Estado</th>
								{!matches && <th className='py-4 px-4'>Fecha</th>}
							</tr>
						</thead>
						<tbody>
							{purchaseOrderList.map((purchaseOrder) => {
								purchaseOrderElement++;
								return (
									<PurchaseOrderItem
										key={purchaseOrder._id}
										purchaseOrder={purchaseOrder}
										matches={matches}
										purchaseOrderElement={purchaseOrderElement}
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
