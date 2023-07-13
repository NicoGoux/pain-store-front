import React, { useEffect, useState } from 'react';
import { Loader } from '../../../components/loader/Loader';
import { urlProvider } from '../../../config/urlProvider';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Outlet, useNavigate } from 'react-router';
import { useAuthService } from '../../../contexts/UserContext';
import { useCartService } from '../../../hooks/useCartService';

function Cart() {
	const { user } = useAuthService();

	const [total, setTotal] = useState(0);

	const [productDetail, setProductDetail] = useState(null);

	const navigate = useNavigate();

	const cartService = useCartService();

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	const onClickProductRow = (product) => {
		setProductDetail(product);
		navigate({
			pathname: `/account/cart/${product._id.toString()}`,
		});
	};

	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	const onClickRemoveButton = (product) => {
		cartService.removeProductToCart(product);
	};

	const onClickBuyButton = () => {
		navigate('/order/summary', {
			state: { productList: [...cartService.userProductCart.products] },
		});
	};

	useEffect(() => {
		if (!cartService.loadingProductCart) {
			let totalPrice = 0;
			cartService.userProductCart.products.forEach((productInCart) => {
				totalPrice += productInCart.price;
			});
			setTotal(totalPrice);
		}
	}, [cartService.userProductCart]);

	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-[600px]  border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold'>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
						<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
							Mi carrito
						</h2>
						<h3 className='text-3xl'>{user.username}</h3>
					</div>
					{cartService.loadingProductCart ? (
						<div className='flex items-center justify-center h-[200px]'>
							<Loader />
						</div>
					) : (
						<>
							{cartService.userProductCart.products.length === 0 ? (
								<div className='flex items-center justify-center h-24'>
									<h3 className='text-xl'>
										No se encuentran productos en el carrito
									</h3>
								</div>
							) : (
								<>
									<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
										{cartService.userProductCart.products.map(
											(productInCart) => (
												<div
													key={productInCart._id}
													className='relative flex items-center w-full max-w-xl h-20 p-2 text-secondary-font-color cursor-pointer'
												>
													<div
														className='flex items-center gap-6 w-full'
														onClick={() =>
															onClickProductRow(productInCart)
														}
													>
														<div className='absolute left-0 w-full h-full -z-10 bg-card-background-color opacity-70 rounded-lg' />
														<figure className='w-[80px] h-full'>
															<img
																className='w-full h-full'
																src={urlProvider.getImageUrl(
																	productInCart
																)}
																alt=''
																onError={onImageError}
															/>
														</figure>
														<div>
															<p className='text-base w-40 mr-6 xsm:w-52 truncate'>
																{productInCart.name}
															</p>
															<p className='text-sm w-fit'>
																{priceFormat.format(
																	productInCart.price
																)}
															</p>
														</div>
													</div>

													<button
														className='absolute right-1 h-full focus:outline-none'
														onClick={() => {
															onClickRemoveButton(productInCart);
														}}
													>
														<XMarkIcon className='w-6 text-error-color' />
													</button>
												</div>
											)
										)}
									</div>
									<div className='flex flex-wrap items-center justify-center w-full px-12 gap-x-12 gap-y-2'>
										<h3 className='text-xl xsm:text-3xl text-secondary-font-color w-fit'>
											Total: {priceFormat.format(total)}
										</h3>
										<button
											type='button'
											className='primary-button w-44 h-12'
											onClick={onClickBuyButton}
										>
											COMPRAR
										</button>
									</div>
								</>
							)}
						</>
					)}
				</div>
			</div>
			{!cartService.loadingProductCart && (
				<Outlet
					context={[
						productDetail,
						setProductDetail,
						cartService.userProductCart.products,
						null,
						cartService,
						'/account/cart',
					]}
				/>
			)}
		</section>
	);
}

export { Cart };
