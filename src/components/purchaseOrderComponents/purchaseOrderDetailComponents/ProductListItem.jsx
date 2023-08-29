import React from 'react';
import { urlProvider } from '../../../config/urlProvider';
import { ArsPriceFormat } from '../../../config/priceFormat';

function ProductListItem({ product }) {
	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	return (
		<div
			key={product._id}
			className='relative flex items-center w-full max-w-xl h-20 p-2 text-secondary-font-color cursor-pointer bg-card-background-color bg-opacity-70 rounded-lg'
		>
			<div
				className='flex items-center gap-6 w-full'
				onClick={() => onClickProductRow(product)}
			>
				<figure className='w-[80px] h-full'>
					<img
						className='w-full h-full'
						src={urlProvider.getImageUrl(product)}
						alt=''
						onError={onImageError}
					/>
				</figure>
				<div>
					<p className='text-base w-40 mr-6 xsm:w-52 truncate'>{product.name}</p>
					<p className='text-sm w-fit'>{ArsPriceFormat.format(product.price)}</p>
				</div>
			</div>
		</div>
	);
}

export { ProductListItem };
