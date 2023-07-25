import React from 'react';

function Detail() {
	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-fit border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold '>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col gap-2 text-xl xsm:text-2xl font-extrabold w-full text-center border-b-2 p-8 pt-4 border-border-color'>
						<p className='w-full'>TU PEDIDO A SIDO REALIZADO. EL NUMERO DE PEDIDO ES</p>
						<p className='text-3xl xsm:text-4xl text-secondary-font-color secondary-text-shadow'>
							PEDIDO N°: 11111
						</p>
					</div>

					<div className='flex flex-col gap-2 text-2xl font-bold w-full py-4 p-8'>
						<p className='w-full text-center mb-4'>
							DETALLES DE PAGO:{' '}
							<span className='text-secondary-font-color'>CRYPTOMONEDA </span>
						</p>
						{false ? (
							<div className='flex flex-col gap-2 w-full text-lg xsm:text-2xl break-all'>
								<p className='w-full break-words'>
									<span className='text-secondary-font-color'>ALIAS: </span>
									ngx.mp
								</p>
								<p className='w-full break-words'>
									<span className='text-secondary-font-color'>CVU: </span>
									0000003100004197207455
								</p>
							</div>
						) : (
							<div className='flex flex-col gap-2 w-full text-lg xsm:text-2xl break-all'>
								<p>
									<span className='text-secondary-font-color'>BILLETERA: </span>
									0x02a080412b3ab8cb349a90b576c47ba7b2d678c7
								</p>

								<p>
									<span className='text-secondary-font-color'>RED: </span>
									BEP20
								</p>

								<p>
									<span className='text-secondary-font-color'>TOTAL: </span>
									{priceFormat.format(250000)}
									{/* TODO CONVERTIR EL PRECIO AL VALOR DE LA CRYPTO */}
								</p>
								<p className='text-base text-center max-w-2xl break-normal'>
									El precio no incluye el impuesto incluido en la transferencia de
									cryptomonedas, deberá tenerlo en cuenta a la hora de considerar
									el monto final a transferir
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

export { Detail };
