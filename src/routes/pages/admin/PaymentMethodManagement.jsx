import React from 'react';
import { PaymentMethodManagementComponent } from '../../../components/adminComponents/PaymentMethodManagementComponent';

function PaymentMethodManagement() {
	return (
		<div className='flex flex-col gap-8 items-center justify-center h-fit xsm:pt-20 pb-8'>
			<h2 className='text-4xl font-bold text-secondary-font-color text-center'>
				Métodos de pago
			</h2>
			<PaymentMethodManagementComponent />
		</div>
	);
}

export { PaymentMethodManagement };
