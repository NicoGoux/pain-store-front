import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { DateTime, Interval } from 'luxon';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { FloatBar } from '../../../assets/FloatBar';
import { FloatSelector } from '../../../assets/FloatSelector';
import { useCart } from '../../../contexts/UserContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AppContext } from '../../../contexts/AppContext';

function ProductDetail({ productDetail, setProductDetail }) {
	const [floatSelectorPosition, setFloatSelectorPosition] = useState(0);
	const [isInCart, setIsInCart] = useState(false);
	const { urlProvider } = useContext(AppContext);
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const cart = useCart();

	useEffect(() => {
		setIsInCart(cart.isInCart(productDetail));
	}, [cart.userProductCart]);

	const closeModal = () => {
		setProductDetail(null);
		navigate({ pathname: '/store', search: searchParams.toString() });
	};

	const [weapon] = productDetail.marketHash.marketHashString.split('|');
	const skinCondition = productDetail.skinCondition.skinConditionString.replace('-', ' ');

	const dateNow = DateTime.now();
	const endTradeLock = DateTime.fromISO(productDetail.tradeLock);
	const days = Interval.fromDateTimes(dateNow, endTradeLock).length('days');

	let tradeLock;
	if (isNaN(days)) {
		tradeLock = 'Disponible';
	} else {
		tradeLock = `${Math.round(days)} dias`;
	}

	const imageUrl = urlProvider.getImageUrl(productDetail);

	useEffect(() => {
		setFloatSelectorPosition(productDetail.float * 100);
	}, []);

	const floatFormat = new Intl.NumberFormat('es-ES');
	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	return (
		<>
			<Transition appear show={true} as={Fragment}>
				<Dialog as='div' className='z-10' onClose={closeModal}>
					<div className='fixed top-0 flex items-center justify-center w-full min-h-fit h-full z-50'>
						<div className='fixed inset-0 bg-background-color opacity-40 w-full h-full overflow-y-auto scroll' />
						<div className='fixed inset-0 overflow-y-auto scroll'>
							<div className='flex min-h-full items-center justify-center p-4 text-center'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'
								>
									<Dialog.Panel
										className='relative flex flex-col gap-4 h-full items-center justify-center w-full max-w-fit 
                                                transform overflow-hidden rounded-2xl border-2 border-border-color 
                                                bg-background-color p-12 shadow-xl transition-all text-lg text-secondary-font-color
												overflow-y-auto scroll'
									>
										<div className='flex items-center justify-between  w-full'>
											<p>{weapon.trim()}</p>
											<p>{skinCondition}</p>
										</div>
										<h3 className='font-bold text-xl sm:text-2xl md:text-3xl'>
											{productDetail.marketHash.marketHashString
												.trim()
												.toUpperCase()}
										</h3>

										<figure className='relative w-full max-w-sm h-full'>
											<div className='absolute w-full h-full -z-10 bg-image-container' />
											<img className='w-full h-full' src={imageUrl} alt='' />
										</figure>
										<div className='flex items-center justify-between  w-full'>
											<p className='whitespace-break-spaces'>
												Float: {floatFormat.format(productDetail.float)}
											</p>
											<p className='whitespace-break-spaces'>
												Trade lock: {tradeLock}
											</p>
										</div>
										<div className='relative flex items-center justify-between  w-full mt-3'>
											<div
												style={{
													position: 'absolute',
													top: '-20px',
													left: `${floatSelectorPosition}%`,
												}}
												className='w-5 h-5'
											>
												<div className='relative w-full h-full -left-2'>
													<FloatSelector />
												</div>
											</div>
											<div className='w-full h-full'>
												<FloatBar />
											</div>
										</div>
										<h3 className='font-semibold text-xl sm:text-2xl md:text-3xl py-3'>
											{`
										${priceFormat.format(productDetail.price)}`}
										</h3>

										<div className='flex flex-wrap items-center justify-center w-full gap-6'>
											<button
												className='absolute top-0 right-0 focus:outline-none'
												onClick={closeModal}
											>
												<XMarkIcon className='text-error-color w-12' />
											</button>
											{isInCart ? (
												<button
													type='button'
													className='secondary-button w-52 h-12'
													onClick={() =>
														cart.removeProductToCart(productDetail)
													}
												>
													REMOVER DEL CARRO
												</button>
											) : (
												<button
													type='button'
													className='secondary-button w-52 h-12'
													onClick={() =>
														cart.addProductToCart(productDetail)
													}
												>
													AGREGAR AL CARRO
												</button>
											)}

											<button
												type='button'
												className='primary-button w-52 h-12'
												onClick={closeModal}
											>
												COMPRAR
											</button>
										</div>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export { ProductDetail };
