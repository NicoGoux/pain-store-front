import React from 'react';
import { PaymentMethodOptions } from './PaymentMethodOptions';

function PaymentMethodItem({ paymentMethod, paymentMethodService, setUpdating }) {
	const data = paymentMethod.paymentMethodData;
	let dataComponents = [];
	for (const key in data) {
		dataComponents.push(
			<p key={key} className='w-full break-words'>
				<span className='text-secondary-font-color'>
					{key.toUpperCase().replace('_', '/')}:{' '}
				</span>
				{data[key]}
			</p>
		);
	}

	return (
		<div className='relative flex min-w-[450px] text-lg break-all pb-4 rounded-3xl bg-card-background-color py-4 pl-8 pr-10'>
			<div className='flex flex-col gap-1'>
				{dataComponents}
				<p className='flex items-center gap-2 w-fit break-words'>
					<span className='text-secondary-font-color'>Habilitado: </span>
					<input
						type='checkbox'
						className='w-4 h-4 appearance-none border rounded checked:bg-correct-color'
						checked={paymentMethod.isActive}
						disabled={true}
					/>
				</p>
			</div>

			<PaymentMethodOptions
				paymentMethod={paymentMethod}
				paymentMethodService={paymentMethodService}
				setUpdating={setUpdating}
			/>
		</div>
	);
}

export { PaymentMethodItem };
