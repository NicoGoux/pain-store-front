import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { DateTime, Interval } from 'luxon';
import { FloatBar } from '../../../../assets/FloatBar';
import { FloatSelector } from '../../../../assets/FloatSelector';
import { useCart } from '../../../../contexts/UserContext';

import { urlProvider } from '../../../../config/urlProvider';

function ProductDetailUser({ productDetail, closeModal }) {
	const [floatSelectorPosition, setFloatSelectorPosition] = useState(0);
	const [isInCart, setIsInCart] = useState(false);
	const cart = useCart();

	useEffect(() => {
		setIsInCart(cart.isInCart(productDetail));
	}, [cart.userProductCart]);

	useEffect(() => {
		if (productDetail.float) {
			setFloatSelectorPosition(productDetail.float * 100);
		}
	}, []);

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	const [productName] = productDetail.marketHash.marketHashString.split('|');

	const dateNow = DateTime.now();
	const endTradeLock = DateTime.fromISO(productDetail.tradeLock);
	const days = Interval.fromDateTimes(dateNow, endTradeLock).length('days');

	let tradeLock;
	if (isNaN(days)) {
		tradeLock = 'Disponible';
	} else {
		tradeLock = `${Math.round(days)} dias`;
	}

	let imageUrl = productDetail.imageUrl;

	if (!imageUrl) {
		imageUrl = urlProvider.getImageUrl(productDetail);
	}

	const floatFormat = new Intl.NumberFormat('es-ES');
	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	return (
		<>
			<div className='flex items-center justify-between  w-full'>
				<p>{productName.trim()}</p>
				{productDetail.skinCondition && (
					<p>{productDetail.skinCondition.skinConditionString.replace('-', ' ')}</p>
				)}
			</div>
			<h3 className='font-bold text-xl sm:text-2xl md:text-3xl'>
				{productDetail.marketHash.marketHashString.trim().toUpperCase()}
			</h3>

			<figure className='relative w-full max-w-sm h-full'>
				<div className='absolute w-full h-full -z-10 bg-image-container' />
				<img className='w-full h-full' src={imageUrl} alt='' onError={onImageError} />
			</figure>
			<div className='flex items-center justify-between  w-full'>
				<p className='whitespace-break-spaces'>
					{productDetail.float && `Float: ${floatFormat.format(productDetail.float)}`}
				</p>
				<p className='whitespace-break-spaces'>Trade lock: {tradeLock}</p>
			</div>
			{productDetail.float && (
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
			)}

			<h3 className='font-semibold text-xl sm:text-2xl md:text-3xl py-3'>
				{`${priceFormat.format(productDetail.price)}`}
			</h3>

			<div className='flex flex-wrap items-center justify-center w-full gap-6'>
				<button className='absolute top-0 right-0 focus:outline-none' onClick={closeModal}>
					<XMarkIcon className='text-error-color w-12' />
				</button>
				{isInCart ? (
					<button
						type='button'
						className='secondary-button w-52 h-12'
						onClick={() => cart.removeProductToCart(productDetail)}
					>
						REMOVER DEL CARRO
					</button>
				) : (
					<button
						type='button'
						className='secondary-button w-52 h-12'
						onClick={() => cart.addProductToCart(productDetail)}
					>
						AGREGAR AL CARRO
					</button>
				)}

				<button type='button' className='primary-button w-52 h-12' onClick={closeModal}>
					COMPRAR
				</button>
			</div>
		</>
	);
}

export { ProductDetailUser };
