import { DateTime, Interval } from 'luxon';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';

function ProductCard({ product }) {
	const API = 'https://api.steamapis.com/image/item/730/';
	const urlImage = `${API}${product.marketHash}`;

	const dateNow = DateTime.now();
	const endTradeLock = DateTime.fromISO(product.tradeLock);
	const days = Interval.fromDateTimes(dateNow, endTradeLock).length('days');

	return (
		<div className='card w-full aspect-video'>
			<div className='flex gap-6 h-full'>
				<div className='rounded-tl-lg rounded-br-lg flex items-center justify-center bg-primary-button-bg-color w-16 h-12 cursor-pointer'>
					<ShoppingCartIcon className='w-9 text-primary-button-font-color' />
				</div>
				<figure className='w-full h-full mr-6'>
					<img className='w-full' src={urlImage} alt='' />
				</figure>
			</div>
			<div className='flex justify-between text-secondary-font-color font-normal text-sm px-6 pb-2'>
				{/* TODO estado*/}
				<div>
					<p>{`FN - ${product.float}`}</p>
					<p className='font-normal text-lg'>{`AR$ ${product.price}`}</p>
				</div>
				{!isNaN(days) && (
					<div className='flex flex-col justify-around text-center'>
						<p>TL</p>
						<p>{`${Math.round(days)} dias`}</p>
					</div>
				)}
			</div>
		</div>
	);
}

export { ProductCard };
