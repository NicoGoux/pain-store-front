import React from 'react';
import { PaymentMethodItem } from './PaymentMethodItem';
import { Loader } from '../../auxComponents/loader/Loader';

function PaymentMethodList({ paymentMethods, loading, paymentMethodService, setUpdating }) {
	const tableHeader = [];

	if (paymentMethods && paymentMethods.length != 0) {
		for (const key in paymentMethods[0].paymentMethodData) {
			tableHeader.push(key);
		}
	}
	return (
		<>
			{loading ? (
				<div className='flex items-center justify-center h-[200px] w-[350px]'>
					<Loader />
				</div>
			) : (
				<>
					{paymentMethods && paymentMethods.length != 0 ? (
						<div className='flex flex-col gap-4 w-full h-fit xsm:px-4 xsm:max-h-[45vh] overflow-x-hidden xsm:overflow-y-auto xsm:scroll'>
							{paymentMethods.map((paymentMethod) => {
								return (
									<PaymentMethodItem
										key={paymentMethod._id}
										paymentMethod={paymentMethod}
										paymentMethodService={paymentMethodService}
										setUpdating={setUpdating}
									/>
								);
							})}
						</div>
					) : (
						<div className='flex items-center justify-center h-24'>
							<h3 className='text-xl'>No se encuentran métodos de pago</h3>
						</div>
					)}
				</>
			)}
		</>
	);
}

export { PaymentMethodList };
