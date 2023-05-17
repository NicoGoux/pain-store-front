import { DateTime, Interval } from 'luxon';
import { CartIcon } from '../../../../assets/cartIcon/CartIcon';

function ProductCard({ product }) {
	const API = 'https://api.steamapis.com/image/item/730/';
	const urlImage = `${API}${product.marketHash}`;

	const dateNow = DateTime.now();
	const endTradeLock = DateTime.fromISO(product.tradeLock);
	const days = Interval.fromDateTimes(dateNow, endTradeLock).length('days');

	return (
		<div className='bg-card-background-color rounded-xl border-2 border-border-color w-full aspect-video'>
			<div className='flex gap-6 h-full'>
				<div className='rounded-tl-lg rounded-br-2xl flex items-center justify-center bg-primary-button-bg-color w-12 h-12 cursor-pointer'>
					<CartIcon />
				</div>
				<figure className='w-full h-full pr-6'>
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
