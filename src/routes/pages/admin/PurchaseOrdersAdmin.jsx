import React from 'react';
import { PurchaseOrdersAdminComponent } from '../../../components/adminComponents/PurchaseOrdersAdminComponent';

function PurchaseOrdersAdmin() {
	return (
		<div className='flex flex-col items-center justify-center h-fit xsm:pt-20 pb-8'>
			<h2 className='text-4xl font-bold text-secondary-font-color text-center'>
				Lista de pedidos
			</h2>
			<PurchaseOrdersAdminComponent />
		</div>
	);
}

export { PurchaseOrdersAdmin };
