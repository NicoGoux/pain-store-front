import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { urlProvider } from '../../../../config/urlProvider';
import { DatepickerInput } from '../../../datepicker/Datepicker';
import { ConditionSelector } from '../../../comboBox/ConditionSelector';
import { ProductStatusSelector } from '../../../comboBox/ProductStatusSelector';
import { CategorySelector } from '../../../comboBox/CategorySelector';
import { useGetProductService } from '../../../../hooks/useGetProductService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ProductDetailAdmin({ productDetail, closeModal }) {
	const [editing, setEditing] = useState(false);
	const [imageSrcUrl, setImageSrcUrl] = useState('');
	const [updating, setUpdating] = useState(false);
	const productService = useGetProductService();
	const navigate = useNavigate();

	const initialValues = {
		name: productDetail.name,
		marketHash: productDetail.marketHash.marketHashString,
		category: productDetail.marketHash.category.name,
		skinCondition: '',
		float: '',
		imageUrl: '',
		price: productDetail.price,
		tradeLock: '',
		productStatus: productDetail.productStatus.productStatusString,
	};

	if (productDetail.skinCondition) {
		initialValues.skinCondition = productDetail.skinCondition.skinConditionString || '';
	}

	initialValues.float = productDetail.float || '';
	initialValues.imageUrl = productDetail.imageUrl || '';

	if (productDetail.tradeLock) {
		initialValues.tradeLock = productDetail.tradeLock || '';
	}

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
				await toast.promise(productService.updateProduct(productDetail._id, patchObject), {
					loading: 'Actualizando...',
					success: 'Producto actualizado',
					error: 'No se pudo actualizar el producto',
				});
				navigate('/store');
				navigate(0);
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
		<>
			<figure className='relative w-full max-w-xs h-full max-h-sm'>
				<div className='absolute w-full h-full -z-10 bg-image-container' />
				<img
					className='w-full h-full max-h-[250px]'
					src={imageSrcUrl}
					alt=''
					onError={onImageError}
				/>
			</figure>
			<form
				onSubmit={formik.handleSubmit}
				className='flex flex-col justify-center items-center gap-6 md:w-[500px]'
			>
				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='name' className='label whitespace-nowrap'>
						Nombre:{' '}
					</label>
					{editing ? (
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
					) : (
						<p>{formik.values.name}</p>
					)}
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='marketHash' className='label whitespace-nowrap'>
						market hash:{' '}
					</label>
					{editing ? (
						<div className='w-full'>
							<input
								id='marketHash'
								type='text'
								name='marketHash'
								placeholder='market hash'
								className='primary-input w-full min-w-[300px]'
								disabled={!editing}
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
					) : (
						<p>{formik.values.marketHash}</p>
					)}
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='skinCondition' className='label whitespace-nowrap'>
						Condición:{' '}
					</label>
					<div className='relative flex items-center w-fit'>
						{editing ? (
							<ConditionSelector
								defaultValue={formik.values.skinCondition}
								onChange={(event) => {
									formik.setValues((prevValues) => ({
										...prevValues,
										skinCondition: event.target.value,
									}));
								}}
								disabled={!editing}
							/>
						) : (
							<p>{formik.values.skinCondition}</p>
						)}
					</div>
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='float' className='label whitespace-nowrap'>
						Float:{' '}
					</label>
					{editing ? (
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
								<p className='text-error-color w-full'>{formik.errors.float}</p>
							) : null}
						</div>
					) : (
						<p className='whitespace-nowrap overflow-ellipsis max-w-[200px]'>
							{formik.values.float != '' && floatFormat.format(formik.values.float)}
						</p>
					)}

					{/* {formik.touched.email && formik.errors.email ? (
					<p className='text-error-color w-full'>{formik.errors.email}</p>
				) : null} */}
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='category' className='label whitespace-nowrap'>
						Categoria:{' '}
					</label>
					<div className='relative flex items-center w-fit'>
						{editing ? (
							<CategorySelector
								defaultValue={formik.values.category}
								onChange={(event) => {
									formik.setValues((prevValues) => ({
										...prevValues,
										category: event.target.value,
									}));
								}}
								disabled={!editing}
							/>
						) : (
							<p>{formik.values.category}</p>
						)}
					</div>
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='price' className='label whitespace-nowrap'>
						Precio (ARS):
					</label>
					{editing ? (
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
					) : (
						<p className='whitespace-nowrap overflow-ellipsis max-w-[200px]'>
							{priceFormat.format(formik.values.price)}
						</p>
					)}
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='tradeLock' className='label whitespace-nowrap'>
						<p className='flex flex-wrap gap-x-1'>Trade lock:</p>
					</label>
					{editing ? (
						<div className='w-full'>
							<DatepickerInput
								value={formik.values.tradeLock}
								onChange={(value) => {
									const newTradeLock = new Date(value).toISOString();
									formik.setValues((prevValues) => ({
										...prevValues,
										tradeLock: newTradeLock,
									}));
								}}
							/>
						</div>
					) : (
						<p className='whitespace-nowrap overflow-ellipsis max-w-[200px]'>
							{`${new Date(formik.values.tradeLock).getUTCDate()}/${new Date(
								formik.values.tradeLock
							).getMonth()}/${new Date(formik.values.tradeLock).getFullYear()}`}
						</p>
					)}
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='imageUrl' className='label whitespace-nowrap'>
						Url imagen:{' '}
					</label>
					{editing ? (
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
					) : (
						<p className='whitespace-nowrap overflow-ellipsis max-w-[200px]'>
							{formik.values.imageUrl.substring(0, 30).concat('...')}
						</p>
					)}
				</div>

				<div className='flex items-center gap-1 flex-wrap w-full xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='productStatus' className='label whitespace-nowrap'>
						Estado:{' '}
					</label>
					<div className='relative flex items-center w-fit'>
						{editing ? (
							<ProductStatusSelector
								defaultValue={formik.values.productStatus}
								onChange={(event) => {
									formik.setValues((prevValues) => ({
										...prevValues,
										productStatus: event.target.value,
									}));
								}}
								disabled={!editing}
							/>
						) : (
							<p>{formik.values.productStatus}</p>
						)}
					</div>
				</div>

				{editing && (
					<div className='flex items-center justify-center gap-4 flex-wrap w-full'>
						<button type='submit' className='primary-button w-40' disabled={updating}>
							{' '}
							ACTUALIZAR{' '}
						</button>
						<button
							className='secondary-button w-40'
							onClick={() => {
								formik.resetForm();
								setEditing(false);
							}}
							disabled={updating}
						>
							{' '}
							CANCELAR{' '}
						</button>
					</div>
				)}
			</form>
			<div>
				<button className='absolute top-0 right-0 focus:outline-none' onClick={closeModal}>
					<XMarkIcon className='text-error-color w-12' />
				</button>

				{!editing && (
					<button
						type='button'
						className='primary-button w-fit h-12'
						onClick={() => {
							setEditing(true);
						}}
					>
						MODIFICAR PRODUCTO
					</button>
				)}
			</div>
		</>
	);
}

export { ProductDetailAdmin };
