import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ConfirmationModal } from '../../../components/auxComponents/confirmationModal/ConfirmationModal';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { Loader } from '../../../components/auxComponents/loader/Loader';
import { toast } from 'react-hot-toast';
import { useProductService } from '../../../hooks/useProductService';
import { usePaymentMethodService } from '../../../hooks/usePaymentMethodService';
import { usePurchaseOrderService } from '../../../hooks/usePurchaseOrderService';
import { AvailablePaymentMethodTypeSelector } from './AvailablePaymentMethodTypeSelector';

function OrderComponent() {
	const productService = useProductService();

	const paymentMethodService = usePaymentMethodService();

	const purchaseOrderService = usePurchaseOrderService();

	const navigate = useNavigate();

	const { state } = useLocation();

	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);

	const [availablePaymentMethodTypes, setAvailablePaymentMethodTypes] = useState([]);

	const [loading, setLoading] = useState(true);

	if (!state || state.productList.length == 0) {
		return <Navigate to={'/store'} />;
	}

	let totalPrice = 0;
	state.productList.forEach((product) => {
		totalPrice += product.price;
	});

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			tradeLink: '',
			paymentMethodType: '',
		},
		validationSchema: Yup.object({
			firstName: Yup.string()
				.matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ'-]+$/, 'Solo puede contener letras y espacios')
				.min(2, 'Debe contener entre 2 y 25 caracteres')
				.max(25, 'Debe contener entre 2 y 25 caracteres')
				.required('Nombre requerido'),

			lastName: Yup.string()
				.matches(/^[a-zA-Z\sáéíóúÁÉÍÓÚüÜñÑ'-]+$/, 'Solo puede contener letras y espacios')
				.min(2, 'Debe contener entre 2 y 25 caracteres')
				.max(25, 'Debe contener entre 2 y 25 caracteres')
				.required('Apellido requerido'),

			tradeLink: Yup.string()
				.url('Debe ser una URL valida')
				.matches(
					/^(https:\/\/steamcommunity\.com\/tradeoffer\/new\/\?partner=([0-9]+)&token=([a-zA-Z0-9-_]+))$/,
					'Debe ser un Trade Link valido'
				)
				.required('Trade link requerido'),
			paymentMethodType: Yup.object().required('Medio de pago requerido'),
		}),

		onSubmit: () => {
			setOpenConfirmationModal(true);
		},
	});

	const onClickConfirmButton = async () => {
		try {
			setOpenConfirmationModal(false);
			setLoading(true);
			const nonAvailableProducts = await productService.checkAvailability(state.productList);

			if (nonAvailableProducts.length != 0) {
				let alertString = `Los siguientes productos no se encuentran mas disponibles \n`;
				nonAvailableProducts.forEach((product) => {
					alertString += ' - ' + product.name + ',\n';
				});
				const confirmed = confirm(alertString);
				if (confirmed) {
					if (state.isCart) {
						navigate('/account/cart');
					} else {
						navigate('/store');
					}
				}
				return;
			}

			const purchaseOrder = await purchaseOrderService.createPurchaseOrder({
				...formik.values,
				products: state.productList,
				isCart: state.isCart,
			});

			const paymentMethods = await paymentMethodService.getAvailablePaymentMethods({
				paymentMethodType: purchaseOrder.paymentMethodType,
			});

			navigate('/order/detail', {
				replace: true,
				state: {
					purchaseOrder: purchaseOrder,
					paymentMethod: {
						type: purchaseOrder.paymentMethodType.paymentMethodTypeString,
						options: paymentMethods,
					},
				},
			});
			setLoading(false);
		} catch (error) {
			toast.error(error.message);
			if (state.isCart) {
				navigate('/account/cart');
			} else {
				navigate('/store');
			}
		}
	};

	useEffect(() => {
		const getAvailablePaymentMethodTypes = async () => {
			setAvailablePaymentMethodTypes(
				await paymentMethodService.getAvailablePaymentMethodTypes()
			);
			setLoading(false);
		};
		getAvailablePaymentMethodTypes();
	}, []);

	return (
		<>
			{loading && (
				<div className='absolute bg-card-background-color bg-opacity-70 rounded-xl flex w-full h-full z-40'>
					<Loader />
				</div>
			)}
			<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
			<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
				<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
					<p className='text-2xl font-bold text-center'>
						Complete sus{' '}
						<span className='text-secondary-font-color secondary-text-shadow font-extrabold'>
							datos
						</span>
					</p>
				</div>
				<form onSubmit={formik.handleSubmit} className='flex flex-col items-center'>
					<div className='flex flex-wrap gap-12 justify-center px-4 w-fit md:flex-nowrap'>
						<div className='flex flex-col items-center justify-between gap-2 h-[300px] w-full xsm:min-w-[350px]'>
							<div className='w-full space-y-2'>
								<label htmlFor='firstName' className='label w-full'>
									Nombre
								</label>
								<input
									id='firstName'
									type='text'
									name='firstName'
									placeholder='Nombre'
									className='primary-input w-full'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.firstName}
								/>
								{formik.touched.firstName && formik.errors.firstName ? (
									<p className='text-error-color w-full text-base'>
										{formik.errors.firstName}
									</p>
								) : null}
							</div>
							<div className='w-full space-y-2'>
								<label htmlFor='lastName' className='label w-full mt-6'>
									Apellido
								</label>
								<input
									id='lastName'
									type='text'
									name='lastName'
									placeholder='Apellido'
									className='primary-input w-full'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.lastName}
								/>
								{formik.touched.lastName && formik.errors.lastName ? (
									<p className='text-error-color w-full text-base'>
										{formik.errors.lastName}
									</p>
								) : null}
							</div>
							<div className='w-full space-y-2'>
								<label htmlFor='tradeLink' className='label w-full mt-6'>
									Trade link
								</label>
								<input
									id='tradeLink'
									type='text'
									name='tradeLink'
									placeholder='https://steamcommunity.com/tradeoffer/...'
									className='primary-input w-full'
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.tradeLink}
								/>
								{formik.touched.tradeLink && formik.errors.tradeLink ? (
									<p className='text-error-color w-full text-base'>
										{formik.errors.tradeLink}
									</p>
								) : null}
							</div>
						</div>
						<div className='flex flex-col gap-6 justify-between min-h-[360px] h-fit w-full xsm:min-w-[350px]'>
							<AvailablePaymentMethodTypeSelector
								selected={formik.values.paymentMethodType}
								setValues={(value) => {
									formik.setValues((prevValues) => ({
										...prevValues,
										paymentMethodType: value,
									}));
								}}
								availablePaymentMethodTypes={availablePaymentMethodTypes}
							/>
							{formik.touched.paymentMethodType && formik.errors.paymentMethodType ? (
								<p className='text-error-color w-full text-base'>
									{formik.errors.paymentMethodType}
								</p>
							) : null}
							<h3 className='text-xl xsm:text-3xl mb-2 text-secondary-font-color w-fit whitespace-nowrap'>
								Total: {ArsPriceFormat.format(totalPrice)}
							</h3>
						</div>
					</div>
					<p className='text-base w-full text-center max-w-xl'>
						Una vez realizado el pago, se deberá enviar el comprobante por alguno de los
						medios de contacto junto con el numero de pedido para validarlo
					</p>
					<div className='flex items-center flex-wrap justify-center w-full gap-4 mt-6'>
						<button
							type='button'
							className='secondary-button w-44 h-12'
							onClick={() => {
								navigate(-1);
							}}
						>
							VOLVER
						</button>
						<input
							type='submit'
							value='CONTINUAR'
							className={`primary-button w-44 cursor-pointer ${
								false && 'opacity-60'
							}`}
						/>
					</div>
				</form>
			</div>
			{openConfirmationModal && (
				<ConfirmationModal setOpenConfirmationModal={setOpenConfirmationModal}>
					<h2 className='text-2xl pb-2'>¿Seguro que desea realizar el pedido?</h2>
					<div className='flex flex-wrap justify-center gap-4 w-full'>
						<button
							className='secondary-button w-36 h-12'
							onClick={() => {
								setOpenConfirmationModal(false);
							}}
						>
							CANCELAR
						</button>
						<button className='primary-button w-36 h-12' onClick={onClickConfirmButton}>
							CONFIRMAR
						</button>
					</div>
				</ConfirmationModal>
			)}
		</>
	);
}

export { OrderComponent };
