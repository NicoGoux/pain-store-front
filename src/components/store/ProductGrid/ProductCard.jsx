import { DateTime, Interval } from 'luxon';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { AppContext } from '../../../contexts/AppContext';

function ProductCard({ product, setOpenDetail, setProductDetail }) {
	const { urlProvider } = useContext(AppContext);

	const onClickProductCard = () => {
		setProductDetail(product);
		setOpenDetail(true);
	};

	const dateNow = DateTime.now();
	const endTradeLock = DateTime.fromISO(product.tradeLock);
	const days = Interval.fromDateTimes(dateNow, endTradeLock).length('days');

	let tradeLock;
	if (isNaN(days)) {
		tradeLock = 'Disponible';
	} else {
		tradeLock = `${Math.round(days)} dias`;
	}
	return (
		<div className='card w-full h-fit aspect-video' onClick={onClickProductCard}>
			<div className='flex gap-6 h-full'>
				<div className='rounded-tl-lg rounded-br-lg flex items-center justify-center bg-primary-button-bg-color w-16 h-12 cursor-pointer'>
					<ShoppingCartIcon className='w-9 text-primary-button-font-color' />
				</div>
				<figure className='w-full h-full mt-2 mr-6'>
					<img className='w-full h-full' src={product.imageUrl} alt='' />
				</figure>
			</div>
			<div className='flex justify-between text-secondary-font-color font-normal text-sm px-6 pb-2'>
				{/* TODO estado*/}
				<div>
					<p>{`${product.skinCondition.initials} - ${product.float}`}</p>
					<p className='font-normal text-lg'>{`AR$ ${product.price}`}</p>
				</div>

				<div className='flex flex-col justify-around text-center'>
					<p>TL</p>
					<p>{tradeLock}</p>
				</div>
			</div>
		</div>
	);
}

export { ProductCard };
