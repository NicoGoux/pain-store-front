import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/UserContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Loader } from '../../../components/loader/Loader';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';

function Profile() {
	const [completeUser, setCompleteUser] = useState(null);
	const [changePassword, setChangePassword] = useState(false);
	const [loadingChangePassword, setLoadingChangePassword] = useState(false);
	const navigate = useNavigate();
	const auth = useAuth();

	useEffect(() => {
		if (!completeUser) {
			const getUser = async () => {
				const user = await auth.getUserLogged();
				if (!user) {
					navigate('/store');
				}
				setCompleteUser(user);
			};
			getUser();
		}
	}, []);

	const onClickChangePassword = () => {
		if (changePassword) {
			setChangePassword(false);
			return;
		}
		setChangePassword(true);
	};

	const formik = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
			confirmNewPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string().required('Contraseña requerida'),
			newPassword: Yup.string()
				.min(6, 'La contraseña debe tener al menos 6 caracteres')
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
					'La contraseña debe contener al menos un numero y una letra'
				)
				.required('Contraseña requerida'),

			confirmNewPassword: Yup.string()
				.oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden')
				.required('Confirmación de contraseña requerida'),
		}),

		onSubmit: async (values, onSubmitProps) => {
			console.log('?');
			try {
				setLoadingChangePassword(true);
				await toast.promise(
					auth.changePassword({
						user: {
							...values,
						},
					}),
					{
						loading: 'Cambiando contraseña...',
						success: 'Contraseña cambiada!',
						error: 'No pudo cambiarse la contraseña',
					}
				);
			} catch (error) {
				const { message } = error.response.data;

				if (message && message.toLowerCase().includes('password')) {
					const errorObject = {};
					errorObject[
						'password'
					] = `${key} no se encuentra disponible o ya fue utilizado`;
					onSubmitProps.setErrors({
						password: `Contraseña incorrecta`,
					});
				}
			} finally {
				setLoadingChangePassword(false);
			}
		},
	});

	return (
		<section className={`relative main-container w-full`}>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-[650px]  border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold'>
				{completeUser ? (
					<>
						<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
						<div className='flex flex-col gap-2 w-full h-full  items-center justify-center'>
							<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
								<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
									{completeUser.username}
								</h2>
								<h3 className='text-3xl'>
									{completeUser.firstName.charAt(0).toUpperCase() +
										completeUser.firstName.toLowerCase().slice(1)}{' '}
									{completeUser.lastName.charAt(0).toUpperCase() +
										completeUser.lastName.toLowerCase().slice(1)}
								</h3>
								{auth.isAdmin() && (
									<h3 className='text-3xl text-secondary-font-color pt-2'>{`[ADMIN]`}</h3>
								)}
							</div>
							<div className='w-full h-full p-4'>
								<h1 className=' w-full text-3xl underline decoration-border-color'>
									{' '}
									Mi cuenta
								</h1>
								<div className='flex flex-col w-full gap-4 mt-6'>
									<div className='flex justify-between flex-wrap mb-4'>
										<p className='flex gap-2 whitespace-nowrap'>
											Email:
											<span className='flex text-secondary-font-color font-semibold'>
												{' '}
												{completeUser.email}
												{completeUser.emailConfirm ? (
													<CheckIcon className='w-8 text-correct-color' />
												) : (
													<XMarkIcon className='w-8 text-error-color' />
												)}
											</span>
										</p>
										{!completeUser.emailConfirm && (
											<p className='w-fit font-normal text-secondary-font-color underline cursor-pointer hover:text-primary-font-color'>
												Confirmar email
											</p>
										)}
									</div>
									<p className='flex gap-2 whitespace-nowrap w-full'>
										Nombre:
										<span className='text-secondary-font-color font-semibold'>
											{completeUser.firstName.charAt(0).toUpperCase() +
												completeUser.firstName.toLowerCase().slice(1)}
										</span>
									</p>
									<p className='flex gap-2 whitespace-nowrap w-full'>
										Apellido:
										<span className='text-secondary-font-color font-semibold'>
											{completeUser.lastName.charAt(0).toUpperCase() +
												completeUser.lastName.toLowerCase().slice(1)}
										</span>
									</p>
									<p className='flex gap-2 whitespace-nowrap w-full mt-4'>
										Username:
										<span className='text-secondary-font-color font-semibold'>
											{completeUser.username}
										</span>
									</p>
									<div className='flex justify-between flex-wrap mb-4'>
										<p className='flex gap-2 whitespace-nowrap'>
											Contraseña:
											<span className='text-secondary-font-color font-semibold'>
												*********
											</span>
										</p>
										<p
											className='w-fit font-normal text-secondary-font-color underline cursor-pointer hover:text-primary-font-color'
											onClick={onClickChangePassword}
										>
											{changePassword ? 'Cancelar' : 'Cambiar contraseña'}
										</p>
									</div>

									<form
										onSubmit={formik.handleSubmit}
										className={`flex flex-col justify-center items-center mx-auto transition-height text-lg ${
											changePassword ? 'h-fit' : 'h-0 overflow-hidden'
										}`}
									>
										<label htmlFor='password' className='label w-full'>
											Contraseña
										</label>
										<input
											id='password'
											type='password'
											name='password'
											placeholder='*********'
											className='primary-input w-full'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.password}
											disabled={loadingChangePassword}
										/>
										{formik.touched.password && formik.errors.password ? (
											<p className='text-error-color text-base font-normal w-full'>
												{formik.errors.password}
											</p>
										) : null}
										<label htmlFor='newPassword' className='label w-full mt-4'>
											Nueva contraseña
										</label>
										<input
											id='newPassword'
											type='password'
											name='newPassword'
											placeholder='*********'
											className='primary-input w-full'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.newPassword}
											disabled={loadingChangePassword}
										/>
										{formik.touched.newPassword && formik.errors.newPassword ? (
											<p className='text-error-color text-base font-normal w-full'>
												{formik.errors.newPassword}
											</p>
										) : null}
										<label
											htmlFor='confirmNewPassword'
											className='label w-full mt-4'
										>
											Confirmar nueva contraseña
										</label>
										<input
											id='confirmNewPassword'
											type='password'
											name='confirmNewPassword'
											placeholder='*********'
											className='primary-input w-full'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.confirmNewPassword}
											disabled={loadingChangePassword}
										/>
										{formik.touched.confirmNewPassword &&
										formik.errors.confirmNewPassword ? (
											<p className='text-error-color w-full text-base font-normal'>
												{formik.errors.confirmNewPassword}
											</p>
										) : null}

										<input
											type='submit'
											value='CAMBIAR'
											className={`primary-button w-28 mt-4 h-fit cursor-pointer ${
												loadingChangePassword && 'opacity-60'
											}`}
											onClick={formik.onSubmit}
											disabled={loadingChangePassword}
										/>
									</form>
								</div>
							</div>
						</div>
					</>
				) : (
					<div>
						<Loader />
					</div>
				)}
			</div>
		</section>
	);
}

export { Profile };
