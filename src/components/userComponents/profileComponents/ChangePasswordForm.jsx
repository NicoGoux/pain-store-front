import React, { useState } from 'react';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';

function ChangePasswordForm({ authService }) {
	const [loadingChangePassword, setLoadingChangePassword] = useState(false);

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
			try {
				setLoadingChangePassword(true);
				await toast.promise(
					authService.changePassword({
						...values,
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
					errorObject['password'] = `${password} ${message}`;
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
		<form
			onSubmit={formik.handleSubmit}
			className='flex flex-col justify-center items-center mx-auto transition-height text-lg h-fit'
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
			<label htmlFor='confirmNewPassword' className='label w-full mt-4'>
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
			{formik.touched.confirmNewPassword && formik.errors.confirmNewPassword ? (
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
	);
}

export { ChangePasswordForm };
