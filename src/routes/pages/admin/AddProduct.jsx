import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useProductService } from '../../../hooks/useProductService';
import { ConditionSelector } from '../../../components/comboBox/ConditionSelector';
import { CategorySelector } from '../../../components/comboBox/CategorySelector';
import { DatepickerInput } from '../../../components/datepicker/Datepicker';
import { urlProvider } from '../../../config/urlProvider';
import { MarketHashSelector } from '../../../components/comboBox/MarketHashSelector';
import { toast } from 'react-hot-toast';

function AddProduct() {
	const [creating, setCreating] = useState(false);
	const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
	const [imageNotWorking, setImageNotWorking] = useState(false);

	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	const productService = useProductService();

	const initialValues = {
		name: '',
		marketHash: '',
		category: '',
		skinCondition: '',
		float: '',
		imageUrl: '',
		price: '',
		tradeLock: '',
	};

	const formik = useFormik({
		initialValues: { ...initialValues },
		validationSchema: Yup.object({
			name: Yup.string()
				.min(3, 'Debe contener entre 4 y 40 caracteres')
				.max(40, 'Debe contener entre 4 y 40 caracteres')
				.required('El nombre de producto es necesario'),
			marketHash: Yup.string()
				.min(3, 'Debe contener entre 4 y 40 caracteres')
				.max(40, 'Debe contener entre 4 y 40 caracteres')
				.required('El market hash es necesario'),
			category: '',
			float: Yup.string()
				.matches(/^(0(\.\d+)?|1(\.0*)?)$/, 'Debe ser un valor numerico entre 0 y 1')
				.max(7, 'Debe contener un máximo de 6 caracteres'),
			imageUrl: Yup.string().url('Debe ser una URL valida'),
			price: Yup.string()
				.matches(/^[0-9]+(\.[0-9]*)?$/, 'Debe ser un valor numerico')
				.max(7, 'Debe contener un máximo de 6 caracteres')
				.required('El precio es requerido'),
			tradeLock: '',
			productStatus: '',
		}),

		onSubmit: async (values) => {
			if (imageNotWorking) {
				const continueWithoutImage = confirm(
					'No pudo cargarse la imagen, por lo que el producto puede cargarse de forma incorrecta, ¿Desea continuar?'
				);
				if (!continueWithoutImage) {
					return;
				}
			}

			const confirmed = confirm('¿Seguro que desea cargar este producto?');

			if (confirmed) {
				setCreating(true);
				const productData = {};
				for (const key in values) {
					if (initialValues[key] != values[key]) {
						productData[key] = values[key];
					}
				}
				try {
					await toast.promise(productService.createProduct(productData), {
						loading: 'creando producto...',
						success: 'Producto creado',
						error: 'No se pudo crear el producto',
					});
				} catch (err) {
					console.log(err);
				} finally {
					setCreating(false);
				}
			}
		},
	});

	const onImageError = (event) => {
		setImageNotWorking(true);
		event.currentTarget.src = '/photo.svg';
	};

	const onImageLoad = (event) => {
		if (!event.currentTarget.src.includes('/photo.svg')) {
			setImageNotWorking(false);
		}
	};

	let imageUrl;
	if (formik.values.imageUrl != '') {
		imageUrl = formik.values.imageUrl;
	} else {
		const imageObj = {
			marketHash: { marketHashString: formik.values.marketHash },
		};
		if (formik.values.skinCondition != '') {
			imageObj.skinCondition = {
				skinConditionString: formik.values.skinCondition,
			};
		}

		imageUrl = urlProvider.getImageUrl(imageObj);
	}

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='flex flex-col justify-center items-center gap-6 my-20 w-full h-fit overflow-y-auto scroll px-2'
		>
			<h2 className='text-4xl font-bold text-secondary-font-color pb-2 text-center'>
				Datos del producto
			</h2>
			<div className='flex flex-col md:flex-row items-center justify-around w-full'>
				<div className='flex flex-col justify-center items-center gap-6 md:w-[500px]'>
					<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
						<label htmlFor='name' className='label whitespace-nowrap'>
							Nombre:{' '}
						</label>

						<div className='w-full'>
							<input
								id='name'
								type='text'
								name='name'
								placeholder='Nombre producto'
								className='primary-input w-full min-w-[300px]'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.name}
							/>
							{formik.touched.name && formik.errors.name ? (
								<p className='text-error-color w-full'>{formik.errors.name}</p>
							) : null}
						</div>
					</div>
					<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
						<label htmlFor='category' className='label whitespace-nowrap'>
							Categoria:{' '}
						</label>
						<div className='relative flex items-center w-fit'>
							<CategorySelector
								defaultValue={formik.values.category}
								onChange={(value) => {
									formik.setValues((prevValues) => ({
										...prevValues,
										category: value,
									}));
								}}
							/>
						</div>
					</div>
					{formik.values.category != '' && (
						<>
							<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
								<label htmlFor='marketHash' className='label whitespace-nowrap'>
									market hash:{' '}
								</label>

								<div className='w-full'>
									<MarketHashSelector
										value={formik.values.marketHash}
										category={formik.values.category}
										onChange={(value) => {
											formik.setValues((prevValues) => ({
												...prevValues,
												marketHash: value,
											}));
										}}
									/>
									{formik.touched.marketHash && formik.errors.marketHash ? (
										<p className='text-error-color w-full'>
											{formik.errors.marketHash}
										</p>
									) : null}
								</div>
							</div>
							<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
								<label htmlFor='skinCondition' className='label whitespace-nowrap'>
									Condición:{' '}
								</label>
								<div className='relative flex items-center w-fit'>
									<ConditionSelector
										defaultValue={formik.values.skinCondition}
										onChange={(event) => {
											formik.setValues((prevValues) => ({
												...prevValues,
												skinCondition: event.target.value,
											}));
										}}
									/>
								</div>
							</div>
							<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
								<label htmlFor='float' className='label whitespace-nowrap'>
									Float:{' '}
								</label>

								<div className='w-full'>
									<input
										id='float'
										type='text'
										name='float'
										placeholder='0.0000'
										className='primary-input w-full min-w-[300px]'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.float.toString().replace(',', '.')}
									/>
									{formik.touched.float && formik.errors.float ? (
										<p className='text-error-color w-full'>
											{formik.errors.float}
										</p>
									) : null}
								</div>
							</div>
						</>
					)}

					<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
						<label htmlFor='price' className='label whitespace-nowrap'>
							Precio (ARS):
							<p className='whitespace-nowrap overflow-ellipsis max-w-[200px]'>
								{priceFormat.format(formik.values.price)}
							</p>
						</label>

						<div className='w-full'>
							<input
								id='price'
								type='text'
								name='price'
								placeholder='1000.00'
								className='primary-input w-full min-w-[300px]'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.price}
							/>
							{formik.touched.price && formik.errors.price ? (
								<p className='text-error-color w-full'>{formik.errors.price}</p>
							) : null}
						</div>
					</div>
					<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
						<label htmlFor='tradeLock' className='label whitespace-nowrap'>
							<p className='flex flex-wrap gap-x-1'>Trade lock:</p>
						</label>

						<div className='w-full text-secondary-font-color'>
							<DatepickerInput
								value={new Date()}
								onChange={(value) => {
									const newTradeLock = new Date(value).toISOString();
									formik.setValues((prevValues) => ({
										...prevValues,
										tradeLock: newTradeLock,
									}));
								}}
							/>
						</div>
					</div>
					<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
						<label htmlFor='imageUrl' className='label whitespace-nowrap'>
							Url imagen:{' '}
						</label>

						<div className='w-full'>
							<input
								id='imageUrl'
								type='text'
								name='imageUrl'
								placeholder='Url imagen'
								className='primary-input w-full min-w-[300px] max-w-md'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.imageUrl}
							/>
							{formik.touched.imageUrl && formik.errors.imageUrl ? (
								<p className='text-error-color w-full'>{formik.errors.imageUrl}</p>
							) : null}
						</div>
					</div>
				</div>

				<div className='flex flex-col gap-12'>
					<figure className='relative w-full min-w-[250px] max-w-[500px] h-full max-h-sm pt-4'>
						<div className='absolute w-full h-full -z-10 bg-image-container' />
						<img
							className='w-full h-full'
							src={imageUrl}
							alt=''
							onLoad={onImageLoad}
							onError={onImageError}
						/>
					</figure>
					<div className='flex items-center justify-center gap-4 flex-wrap w-full'>
						<button type='submit' className='primary-button w-40' disabled={creating}>
							CREAR PRODUCTO
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export { AddProduct };

{
	/* {openConfirmationModal && (
				<ConfirmationModal setOpenConfirmationModal={setOpenConfirmationModal}>
					<h2 className='text-2xl pb-2'>¿Seguro que desea cargar este producto?</h2>
					{imageNotWorking && (
						<p className='max-w-md text-xl pb-2 text-error-color'>
							No pudo cargarse la imagen, por lo que el producto puede cargarse de
							forma incorrecta
						</p>
					)}
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
			)} */
}
