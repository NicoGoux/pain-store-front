import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { urlProvider } from '../../../config/urlProvider';
import { useAuthService } from '../../../contexts/UserContext';

function Summary() {
	const navigate = useNavigate();

	const { state } = useLocation();

	const productList = state.productList;

	if (!productList || productList.length === 0) {
		navigate('/store');
	}

	const [total, setTotal] = useState(0);

	const [productDetail, setProductDetail] = useState(null);

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	// const onClickProductRow = (product) => {
	// 	setProductDetail(product);
	// 	navigate({
	// 		pathname: `/account/cart/${product._id.toString()}`,
	// 	});
	// };

	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	// useEffect(() => {
	// 	if (!cartService.loadingProductCart) {
	// 		let totalPrice = 0;
	// 		cartService.userProductCart.products.forEach((productInCart) => {
	// 			totalPrice += productInCart.price;
	// 		});
	// 		setTotal(totalPrice);
	// 	}
	// }, [cartService.userProductCart]);

	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-[600px]  border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold'>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
						<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
							Resumen de pedido
						</h2>
					</div>
					<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
						{productList.map((product) => (
							<div
								key={product._id}
								className='relative flex items-center w-full max-w-xl h-20 p-2 text-secondary-font-color cursor-pointer'
							>
								<div
									className='flex items-center gap-6 w-full'
									onClick={() => onClickProductRow(product)}
								>
									<div className='absolute left-0 w-full h-full -z-10 bg-card-background-color opacity-70 rounded-lg' />
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
						Total: {priceFormat.format(total)}
					</h3>
					<div className='flex items-center justify-center w-full gap-4'>
						<button type='button' className='secondary-button w-44 h-12'>
							CANCELAR
						</button>
						<button type='button' className='primary-button w-44 h-12'>
							CONTINUAR
						</button>
					</div>
				</div>
			</div>
			{/* <Outlet
				context={[
					productDetail,
					setProductDetail,
					cartService.userProductCart.products,
					null,
					cartService,
					'/account/cart',
				]}
			/> */}
		</section>
	);
}

export { Summary };
