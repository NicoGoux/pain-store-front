import { DateTime, Interval } from 'luxon';
import { urlProvider } from '../../../config/urlProvider';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArsPriceFormat } from '../../../config/priceFormat';

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

	const floatFormat = new Intl.NumberFormat('es-ES');

	return (
		<div
			className='card flex flex-col justify-between w-full max-w-[400px] h-fit aspect-video cursor-pointer'
			onClick={onClickProductCard}
		>
			<div className='flex items-center justify-center gap-6'>
				<figure className='w-full max-w-[250px] max-h-[200px] aspect-square mt-2 mx-9'>
					<img
						className='w-full h-full'
						src={urlProvider.getImageUrl(product)}
						alt=''
						onError={onImageError}
					/>
				</figure>
			</div>
			<div className='flex justify-between text-secondary-font-color font-normal text-sm px-6 pb-2'>
				<div>
					{product.skinCondition && product.float && (
						<p>{`${product.skinCondition.initials} - ${floatFormat.format(
							product.float
						)}`}</p>
					)}

					<p className='font-normal text-lg'>{`${ArsPriceFormat.format(
						product.price
					)}`}</p>
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
