import { DateTime, Interval } from 'luxon';
import { urlProvider } from '../../../config/urlProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ProductCard({ product, setProductDetail }) {
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const onClickProductCard = () => {
		setProductDetail(product);
		navigate({ pathname: `/store/${product._id.toString()}`, search: searchParams.toString() });
	};

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
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

	let imageUrl = product.imageUrl;

	if (!imageUrl) {
		imageUrl = urlProvider.getImageUrl(product);
	}

	const floatFormat = new Intl.NumberFormat('es-ES');
	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	return (
		<div className='card w-full h-fit aspect-video cursor-pointer'>
			<div className='flex gap-6 h-full'>
				<figure className='w-full h-full mt-2 mx-9' onClick={onClickProductCard}>
					<img className='w-full h-full' src={imageUrl} alt='' onError={onImageError} />
				</figure>
			</div>
			<div
				className='flex justify-between text-secondary-font-color font-normal text-sm px-6 pb-2'
				onClick={onClickProductCard}
			>
				{/* TODO estado*/}
				<div>
					{product.skinCondition && product.float && (
						<p>{`${product.skinCondition.initials} - ${floatFormat.format(
							product.float
						)}`}</p>
					)}

					<p className='font-normal text-lg'>{`${priceFormat.format(product.price)}`}</p>
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
