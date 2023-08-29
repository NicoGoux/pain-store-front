import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { urlProvider } from '../../../config/urlProvider';
import { toast } from 'react-hot-toast';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { useAuthService } from '../../../contexts/UserContext';
import { useProductService } from '../../../hooks/useProductService';
import { Loader } from '../../auxComponents/loader/Loader';

function PreorderComponent() {
	const productService = useProductService();

	const authService = useAuthService();

	const navigate = useNavigate();

	const { state } = useLocation();

	const [loading, setLoading] = useState(false);

	if (!state || state.productList.length == 0) {
		return <Navigate to={'/store'} />;
	}

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	const onClickContinueButton = async () => {
		try {
			setLoading(true);

			const isEmailConfirmed = await authService.checkConfirmedEmail();

			if (!isEmailConfirmed) {
				toast.error('Debe confirmar su email para continuar');
				navigate('/account/profile');
				return;
			}

			const nonAvailableProducts = await productService.checkAvailability(state.productList);

			if (nonAvailableProducts.length != 0) {
				let alertString = `Los siguientes productos no se encuentran mas disponibles \n`;
				nonAvailableProducts.forEach((product) => {
					alertString += ' - ' + product.name + ',\n';
				});
				const confirmed = confirm(alertString);
				if (confirmed) {
					navigate(-1);
				}
			} else {
				navigate('/order', {
					state: {
						productList: [...state.productList],
						isCart: state.isCart,
					},
				});
			}
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			navigate(-1);
		}
	};

	let totalPrice = 0;
	state.productList.forEach((product) => {
		totalPrice += product.price;
	});

	return (
		<>
			{loading && (
				<div className='absolute bg-card-background-color bg-opacity-70 rounded-xl flex w-full h-full z-40'>
					<Loader />
				</div>
			)}
			<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
				<div className='flex flex-col gap-2 w-full items-center justify-center pb-10 border-b border-border-color'>
					<p className='text-2xl font-bold text-center'>
						Estas por realizar un pedido por los siguientes productos
					</p>
					<p className='text-2xl text-secondary-font-color secondary-text-shadow font-extrabold text-center'>
						¿Seguro que desea continuar?
					</p>
				</div>
				<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
					{state.productList.map((product) => (
						<div
							key={product._id}
							className='relative flex items-center w-full max-w-xl h-20 p-2 text-secondary-font-color bg-card-background-color bg-opacity-70 rounded-lg'
						>
							<div className='flex items-center gap-6 w-full'>
								<figure className='w-[80px] h-full'>
									<img
										className='w-full h-full'
										src={urlProvider.getImageUrl(product)}
										alt=''
										onError={onImageError}
									/>
								</figure>
								<div>
									<p className='text-base w-40 mr-6 xsm:w-52 truncate'>
										{product.name}
									</p>
									<p className='text-sm w-fit'>
										{ArsPriceFormat.format(product.price)}
									</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
			<div className='flex flex-col items-center justify-center w-full px-12 gap-x-12 gap-y-2'>
				<h3 className='text-xl xsm:text-3xl mb-2 text-secondary-font-color w-fit'>
					Total: {ArsPriceFormat.format(totalPrice)}
				</h3>
				<div className='flex items-center flex-wrap justify-center w-full gap-4'>
					<button
						type='button'
						className='secondary-button w-44 h-12'
						onClick={() => {
							navigate(-1);
						}}
					>
						CANCELAR
					</button>
					<button
						type='button'
						className='primary-button w-44 h-12'
						onClick={onClickContinueButton}
					>
						CONTINUAR
					</button>
				</div>
			</div>
		</>
	);
}

export { PreorderComponent };
