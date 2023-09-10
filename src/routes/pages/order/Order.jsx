import React from 'react';
import { OrderComponent } from '../../../components/purchaseOrderComponents/purchaseOrderProcessComponents/OrderComponent';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Order() {
	return (
		<section onScroll={handleMainContainerScroll} className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-fit border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold '>
				<OrderComponent />
			</div>
		</section>
	);
}

export { Order };
