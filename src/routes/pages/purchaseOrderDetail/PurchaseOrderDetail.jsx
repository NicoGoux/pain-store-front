import React from 'react';
import { PurchaseOrderDetailComponent } from '../../../components/purchaseOrderComponents/purchaseOrderDetailComponents/PurchaseOrderDetailComponent';

function PurchaseOrderDetail() {
	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-fit md:min-w-[600px] border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold'>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<PurchaseOrderDetailComponent />
			</div>
		</section>
	);
}

export { PurchaseOrderDetail };
