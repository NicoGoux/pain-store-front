import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useGetProductService } from '../../../hooks/useGetProductService';
import { ConditionSelector } from '../../../components/comboBox/ConditionSelector';
import { CategorySelector } from '../../../components/comboBox/CategorySelector';
import { DatepickerInput } from '../../../components/datepicker/Datepicker';
import { urlProvider } from '../../../config/urlProvider';

function AddProduct() {
	const [imageSrcUrl, setImageSrcUrl] = useState('');
	const [updating, setUpdating] = useState(false);
	// const [imageNotWorking, setImageNotWorking] = useState('');
	const productService = useGetProductService();
	const navigate = useNavigate();

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
			setUpdating(true);
			const patchObject = {};
			for (const key in values) {
				if (initialValues[key] != values[key]) {
					patchObject[key] = values[key];
				}
			}
			console.log(patchObject);
			try {
				// await toast.promise(productService.updateProduct(productDetail._id, patchObject), {
				// 	loading: 'Actualizando...',
				// 	success: 'Producto actualizado',
				// 	error: 'No se pudo actualizar el producto',
				// });
				// navigate('/store');
				// navigate(0);
			} catch (err) {
				console.log(err);
			} finally {
				setUpdating(false);
			}
		},
	});

	const onImageError = (event) => {
		event.currentTarget.src = '/photo.svg';
	};

	useEffect(() => {
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

		setImageSrcUrl(imageUrl);
	}, [formik.values.marketHash, formik.values.skinCondition, formik.values.imageUrl]);

	const floatFormat = new Intl.NumberFormat('es-ES');
	const priceFormat = new Intl.NumberFormat('es-ES', {
		style: 'currency',
		currencyDisplay: 'symbol',
		currency: 'ARS',
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='flex flex-col justify-center items-center gap-6 my-20 md:my-0 md:mt-20 w-full h-fit overflow-y-auto scroll px-2'
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
									console.log(value);
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
									<input
										id='marketHash'
										type='text'
										name='marketHash'
										placeholder='market hash'
										className='primary-input w-full min-w-[300px]'
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										value={formik.values.marketHash}
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

						<div className='w-full'>
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
					<figure className='relative w-full min-w-[250px] max-w-[500px] h-full max-h-sm'>
						<div className='absolute w-full h-full -z-10 bg-image-container' />
						<img
							className='w-full h-full'
							src={imageSrcUrl}
							alt=''
							onError={onImageError}
						/>
					</figure>
					<div className='flex items-center justify-center gap-4 flex-wrap w-full'>
						<button type='submit' className='primary-button w-40' disabled={updating}>
							CREAR PRODUCTO
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}

export { AddProduct };
