import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { urlProvider } from '../../../config/urlProvider';

function Preorder() {
	const navigate = useNavigate();

	const { state } = useLocation();

	if (!state || state.productList.length == 0) {
		return <Navigate to={'/store'} />;
	}

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	let totalPrice = 0;
	state.productList.forEach((product) => {
		totalPrice += product.price;
	});

	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-[600px]  border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold '>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col gap-2 w-full items-center justify-center pb-10 border-b border-border-color'>
						<p className='text-2xl font-bold text-center'>
							Estas por realizar un pedido por los siguientes productos
						</p>
						<p className='text-2xl text-secondary-font-color secondary-text-shadow font-extrabold text-center'>
							¿Seguro que desea continuar?
						</p>
					</div>
					<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
						{state.productList.map((product) => (
							<div
								key={product._id}
								className='relative flex items-center w-full max-w-xl h-20 p-2 text-secondary-font-color bg-card-background-color bg-opacity-70 rounded-lg'
							>
								<div className='flex items-center gap-6 w-full'>
									<figure className='w-[80px] h-full'>
										<img
											className='w-full h-full'
											src={urlProvider.getImageUrl(product)}
											alt=''
											onError={onImageError}
										/>
									</figure>
									<div>
										<p className='text-base w-40 mr-6 xsm:w-52 truncate'>
											{product.name}
										</p>
										<p className='text-sm w-fit'>
											{priceFormat.format(product.price)}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className='flex flex-col items-center justify-center w-full px-12 gap-x-12 gap-y-2'>
					<h3 className='text-xl xsm:text-3xl mb-2 text-secondary-font-color w-fit'>
						Total: {priceFormat.format(totalPrice)}
					</h3>
					<div className='flex items-center flex-wrap justify-center w-full gap-4'>
						<button
							type='button'
							className='secondary-button w-44 h-12'
							onClick={() => {
								navigate(-1);
							}}
						>
							CANCELAR
						</button>
						<button
							type='button'
							className='primary-button w-44 h-12'
							onClick={() => {
								navigate('/order', {
									state: {
										productList: [...state.productList],
										isCart: true,
									},
								});
							}}
						>
							CONTINUAR
						</button>
					</div>
				</div>
			</div>
		</section>
	);
}

export { Preorder };
