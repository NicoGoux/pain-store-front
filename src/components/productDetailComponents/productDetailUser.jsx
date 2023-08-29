import React, { useEffect, useState } from 'react';
import { DateTime, Interval } from 'luxon';
import { FloatBar } from '../../assets/FloatBar';
import { FloatSelector } from '../../assets/FloatSelector';

import { urlProvider } from '../../config/urlProvider';
import { useNavigate } from 'react-router-dom';
import { ArsPriceFormat } from '../../config/priceFormat';

function ProductDetailUser({ productDetail, closeModal, cartService }) {
	const [floatSelectorPosition, setFloatSelectorPosition] = useState(0);
	const [isInCart, setIsInCart] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		setIsInCart(cartService.isInCart(productDetail));
	}, [cartService.userProductCart]);

	useEffect(() => {
		if (productDetail.float) {
			setFloatSelectorPosition(productDetail.float * 100);
		}
	}, []);

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	const onClickBuyButton = () => {
		closeModal();
		navigate('/preorder', {
			state: { productList: [productDetail], isCart: false },
		});
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

	const floatFormat = new Intl.NumberFormat('es-ES');

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
				<img
					className='w-full h-full'
					src={urlProvider.getImageUrl(productDetail)}
					alt=''
					onError={onImageError}
				/>
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
				{`${ArsPriceFormat.format(productDetail.price)}`}
			</h3>

			<div className='flex flex-wrap items-center justify-center w-full gap-6'>
				{isInCart ? (
					<button
						type='button'
						className='secondary-button w-52 h-12'
						onClick={() => cartService.removeProductToCart(productDetail)}
					>
						REMOVER DEL CARRO
					</button>
				) : (
					<button
						type='button'
						className='secondary-button w-52 h-12'
						onClick={() => cartService.addProductToCart(productDetail)}
					>
						AGREGAR AL CARRO
					</button>
				)}

				<button
					type='button'
					className='primary-button w-52 h-12'
					onClick={onClickBuyButton}
				>
					COMPRAR
				</button>
			</div>
		</>
	);
}

export { ProductDetailUser };
