import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

function AddPaymentMethodModal({
	setOpenAddPaymentMethodModal,
	paymentMethodType,
	paymentMethodService,
	setUpdating,
}) {
	const initialValues = {};
	paymentMethodType.data.forEach((key) => {
		initialValues[key] = '';
	});

	let validationSchemaObject = {};

	for (const key in initialValues) {
		validationSchemaObject[key] = Yup.string().required(`${key} requerido`);
	}

	const formik = useFormik({
		initialValues: initialValues,
		validationSchema: Yup.object(validationSchemaObject),
		onSubmit: async (values) => {
			setUpdating(true);
			try {
				await toast.promise(
					paymentMethodService.insertPaymentMethod({
						paymentMethodType: paymentMethodType.name,
						paymentMethodData: { ...values },
					}),
					{
						loading: 'Agregando método de pago...',
						success: 'Método agregado!',
						error: 'No pudo agregarse el método de pago',
					}
				);
				setOpenAddPaymentMethodModal(false);
			} catch (error) {}
		},
	});

	const formComponent = [];

	for (const key in formik.initialValues) {
		formComponent.push(
			<div key={key} className='flex flex-wrap gap-y-1 items-center w-full'>
				<label htmlFor='email' className='label w-full text-left'>
					{key.toUpperCase()}:
				</label>
				<input
					id={key}
					type='text'
					name={key}
					placeholder={key}
					className='primary-input w-full'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values[key]}
				/>
				{formik.touched[key] && formik.errors[key] ? (
					<p className='text-error-color w-full'>{formik.errors[key]}</p>
				) : null}
			</div>
		);
	}

	return (
		<Transition appear show={true} as={Fragment}>
			<Dialog
				as='div'
				className='z-10'
				onClose={() => {
					setOpenAddPaymentMethodModal(false);
				}}
			>
				<div className='fixed top-0 flex items-center justify-center w-full min-h-fit h-full z-50'>
					<div className='fixed inset-0 bg-background-color opacity-60 w-full h-full overflow-y-auto scroll' />
					<div className='fixed inset-0 overflow-y-auto scroll'>
						<div className='flex min-h-full items-center justify-center xsm:p-4 text-center'>
							<Transition.Child
								as={Fragment}
								enter='ease-out duration-300'
								enterFrom='opacity-0 scale-95'
								enterTo='opacity-100 scale-100'
								leave='ease-in duration-200'
								leaveFrom='opacity-100 scale-100'
								leaveTo='opacity-0 scale-95'
							>
								<Dialog.Panel
									className='relative flex flex-col gap-4 h-full items-center justify-center w-full max-w-fit 
                                                transform overflow-hidden rounded-2xl border-y-2 xsm:border-2 border-border-color 
                                                bg-background-color p-12 shadow-2xl transition-all text-lg text-secondary-font-color
												overflow-y-auto scroll'
								>
									<button
										className='absolute top-0 right-0 focus:outline-none'
										onClick={() => {
											setOpenAddPaymentMethodModal(false);
										}}
									>
										<XMarkIcon className='text-error-color w-12' />
									</button>
									<h3 className='text-lg font-semibold'>
										METODO DE PAGO:{' '}
										<span className='text-primary-font-color'>
											{paymentMethodType.name}
										</span>
									</h3>
									<form
										onSubmit={formik.handleSubmit}
										className='flex flex-col gap-4 mt-4'
									>
										{formComponent}
										<button className='primary-button mt-6' type='submit'>
											AGREGAR MÉTODO DE PAGO
										</button>
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export { AddPaymentMethodModal };
