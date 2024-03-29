import React from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthService } from '../../contexts/UserContext';

function RecoveryPasswordForm() {
	const [loading, setLoading] = useState(false);
	const [params, setParams] = useSearchParams();
	const navigate = useNavigate();
	const auth = useAuthService();

	const formik = useFormik({
		initialValues: {
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.min(6, 'La contraseña debe tener al menos 6 caracteres')
				.matches(
					/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
					'La contraseña debe contener al menos un numero y una letra'
				)
				.required('Contraseña requerida'),

			confirmPassword: Yup.string()
				.oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
				.required('Confirmación de contraseña requerida'),
		}),

		onSubmit: async (values) => {
			try {
				setLoading(true);
				const token = params.getAll('token')[0];
				await toast.promise(
					auth.recoveryPassword({
						recoveryPasswordToken: token,
						...values,
					}),
					{
						loading: 'Cambiando contraseña...',
						success: 'Contraseña guardada con exito, intente iniciar sesión',
						error: 'No pudo cambiarse la contraseña',
					}
				);
			} catch (error) {
			} finally {
				setLoading(false);
				navigate('/login');
			}
		},
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className={`card flex flex-col justify-center items-center gap-2 m-auto p-4 xsm:p-12 h-fit w-[460px]  border-0 bg-background-color xsm:border-2 ${
				loading && 'cursor-wait'
			}`}
		>
			<h2 className='font-bold text-xl'>Ingrese su nueva contraseña</h2>
			<label htmlFor='password' className='label w-full mt-6'>
				Nueva contraseña
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
			/>
			{formik.touched.password && formik.errors.password ? (
				<p className='text-error-color w-full'>{formik.errors.password}</p>
			) : null}

			<label htmlFor='confirmPassword' className='label w-full mt-6'>
				Confirmar nueva contraseña
			</label>
			<input
				id='confirmPassword'
				type='password'
				name='confirmPassword'
				placeholder='*********'
				className='primary-input w-full'
				onChange={formik.handleChange}
				onBlur={formik.handleBlur}
				value={formik.values.confirmPassword}
			/>
			{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
				<p className='text-error-color w-full'>{formik.errors.confirmPassword}</p>
			) : null}

			<input
				type='submit'
				value='RESTABLECER'
				className={`primary-button w-48 mt-6 cursor-pointer ${loading && 'opacity-60'}`}
				onClick={formik.onSubmit}
				disabled={loading}
			/>
		</form>
	);
}

export { RecoveryPasswordForm };
