import React from 'react';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { useLocation } from 'react-router-dom';

function Detail() {
	const { state } = useLocation();

	const purchaseOrder = state.purchaseOrder;

	const paymentMethod = state.paymentMethod;

	console.log(paymentMethod);

	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	let optionNumber = 0;

	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-fit border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold '>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col gap-2 text-xl xsm:text-2xl font-extrabold w-full text-center border-b-2 p-8 pt-4 border-border-color'>
						<p className='w-full'>TU PEDIDO A SIDO REALIZADO. EL NUMERO DE PEDIDO ES</p>
						<p className='text-3xl xsm:text-4xl text-secondary-font-color secondary-text-shadow'>
							PEDIDO N°: {purchaseOrder.orderNumber}
						</p>
					</div>

					<div className='flex flex-col gap-2 text-2xl font-bold w-full py-4 p-8'>
						<p className='w-full text-center mb-4'>
							DETALLES DE PAGO:{' '}
							<span className='text-secondary-font-color'>{paymentMethod.type}</span>
						</p>
						{paymentMethod.options &&
							paymentMethod.options.map((paymentMethod) => {
								optionNumber++;
								const data = paymentMethod.paymentMethodData;
								let dataComponents = [];
								for (const key in data) {
									dataComponents.push(
										<p className='w-full break-words'>
											<span className='text-secondary-font-color'>
												{key.toUpperCase().replace('_', '/')}:{' '}
											</span>
											{data[key]}
										</p>
									);
								}

								return (
									<div className='flex flex-col gap-2 w-full text-lg xsm:text-2xl break-all border-b border-border-color pb-4'>
										<p className='w-full break-words text-secondary-font-color'>
											OPCIÓN {optionNumber}:
										</p>
										{dataComponents}
									</div>
								);
							})}
					</div>
				</div>
			</div>
		</section>
	);
}

export { Detail };
