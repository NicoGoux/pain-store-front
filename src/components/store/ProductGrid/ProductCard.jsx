import { DateTime, Interval } from 'luxon';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../../contexts/AppContext';
import { MinusCircleIcon } from '@heroicons/react/20/solid';
import { useCart } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

function ProductCard({ product, setOpenDetail, setProductDetail }) {
	const { urlProvider } = useContext(AppContext);
	const [isInCart, setIsInCart] = useState(false);
	const navigate = useNavigate();
	const cart = useCart();

	useEffect(() => {
		setIsInCart(cart.isInCart(product));
	}, [cart.userProductCart]);

	const onClickProductCard = () => {
		setProductDetail(product);
		navigate(`/store/${product._id.toString()}`);
	};

	const dateNow = DateTime.now();
	const endTradeLock = DateTime.fromISO(product.tradeLock);
	const days = Interval.fromDateTimes(dateNow, endTradeLock).length('days');

	let tradeLock;
	if (isNaN(days)) {
		tradeLock = 'Disp.';
	} else {
		tradeLock = `${Math.round(days)} dias`;
	}

	const imageUrl = urlProvider.getImageUrl(product);

	return (
		<div className='card w-full h-fit aspect-video cursor-pointer'>
			<div className='flex gap-6 h-full'>
				{isInCart ? (
					<button
						className='relative rounded-tl-lg rounded-br-lg flex items-center justify-center bg-primary-button-bg-color w-16 h-12 z-10'
						onClick={() => cart.removeProductToCart(product)}
					>
						<ShoppingCartIcon className='relative top-1 w-7 text-primary-button-font-color' />
						<MinusCircleIcon className='absolute top-1 right-1 w-4 text-card-background-color' />
					</button>
				) : (
					<button
						className='relative rounded-tl-lg rounded-br-lg flex items-center justify-center bg-primary-button-bg-color w-16 h-12'
						onClick={() => cart.addProductToCart(product)}
					>
						<ShoppingCartIcon className='w-8 text-primary-button-font-color' />
					</button>
				)}

				<figure className='w-full h-full mt-2 mr-6' onClick={onClickProductCard}>
					<img className='w-full h-full' src={imageUrl} alt='' />
				</figure>
			</div>
			<div
				className='flex justify-between text-secondary-font-color font-normal text-sm px-6 pb-2'
				onClick={onClickProductCard}
			>
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
