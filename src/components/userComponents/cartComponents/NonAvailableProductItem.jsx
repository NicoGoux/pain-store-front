import React from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { urlProvider } from '../../../config/urlProvider';
import { ArsPriceFormat } from '../../../config/priceFormat';

function NonAvailableProductItem({ productInCart, onClickProductRow, onClickRemoveButton }) {
	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	return (
		<div
			key={productInCart._id}
			className='relative flex items-center w-full max-w-xl h-20 p-2 text-secondary-font-color bg-card-background-color bg-opacity-70 rounded-lg'
		>
			<div
				className='flex items-center gap-6 w-full opacity-20'
				onClick={() => onClickProductRow(productInCart)}
			>
				<figure className='w-[80px] h-full'>
					<img
						className='w-full h-full'
						src={urlProvider.getImageUrl(productInCart)}
						alt=''
						onError={onImageError}
					/>
				</figure>
				<div>
					<p className='text-base w-40 mr-6 xsm:w-52 truncate'>{productInCart.name}</p>
					<p className='text-sm w-fit'>{ArsPriceFormat.format(productInCart.price)}</p>
				</div>
			</div>

			<p className='absolute w-full text-center text-error-color'> NO DISPONIBLE </p>

			<button
				className='absolute right-1 h-full focus:outline-none'
				onClick={() => {
					onClickRemoveButton(productInCart);
				}}
			>
				<XMarkIcon className='w-6 text-error-color' />
			</button>
		</div>
	);
}

export { NonAvailableProductItem };
