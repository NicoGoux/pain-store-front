import { useFormik } from 'formik';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function Register() {
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			firstName: '',
			lastName: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email invalido').required('Email requerido'),

			username: Yup.string()
				.matches(/^[a-zA-Z0-9]+$/, 'Solo puede contener caracteres alfanuméricos')
				.min(3, 'Debe contener entre 4 y 16 caracteres')
				.max(16, 'Debe contener entre 4 y 16 caracteres')
				.required('Nombre de usuario requerido'),

			firstName: Yup.string()
				.matches(/^[a-zA-Z0-9]+$/, 'Solo puede contener caracteres alfanuméricos')
				.min(3, 'Debe contener entre 4 y 16 caracteres')
				.max(50, 'Debe contener entre 4 y 16 caracteres')
				.required('Nombre requerido'),

			lastName: Yup.string()
				.matches(/^[a-zA-Z0-9]+$/, 'Solo puede contener caracteres alfanuméricos')
				.min(3, 'Debe contener entre 4 y 16 caracteres')
				.max(50, 'Debe contener entre 4 y 16 caracteres')
				.required('Apellido requerido'),

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

		onSubmit: async (values, onSubmitProps) => {
			console.log(values);
		},
	});

	return (
		<div className={`relative main-container h-4/5 w-full ${loading && 'cursor-wait'}`}>
			<form
				onSubmit={formik.handleSubmit}
				className='card flex flex-col justify-center items-center gap-2 m-6 p-4 xsm:p-12 h-fit w-[460px]  border-0 bg-background-color xsm:border-2'
			>
				<label htmlFor='email' className='label w-full'>
					Correo electronico
				</label>
				<input
					id='email'
					type='text'
					name='email'
					placeholder='email@example.com'
					className='primary-input w-full'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email ? (
					<p className='text-error-label-color w-full'>{formik.errors.email}</p>
				) : null}

				<label htmlFor='username' className='label w-full mt-6'>
					Username
				</label>
				<input
					id='username'
					type='text'
					name='username'
					placeholder='username'
					className='primary-input w-full'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.username}
				/>
				{formik.touched.username && formik.errors.username ? (
					<p className='text-error-label-color w-full'>{formik.errors.username}</p>
				) : null}

				<div className='flex gap-2 mt-6'>
					<div className='flex flex-col'>
						<label htmlFor='firstName' className='label w-full mb-2'>
							Nombre
						</label>
						<input
							id='firstName'
							type='text'
							name='firstName'
							placeholder='nombre'
							className='primary-input w-full'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.firstName}
						/>
						{formik.touched.firstName && formik.errors.firstName ? (
							<p className='text-error-label-color w-full'>
								{formik.errors.firstName}
							</p>
						) : null}
					</div>

					<div className='flex flex-col'>
						<label htmlFor='lastName' className='label w-full mb-2'>
							Apellido
						</label>
						<input
							id='lastName'
							type='text'
							name='lastName'
							placeholder='apellido'
							className='primary-input w-full'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.lastName}
						/>
						{formik.touched.lastName && formik.errors.lastName ? (
							<p className='text-error-label-color w-full'>
								{formik.errors.lastName}
							</p>
						) : null}
					</div>
				</div>

				<label htmlFor='password' className='label w-full mt-6'>
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
				/>
				{formik.touched.password && formik.errors.password ? (
					<p className='text-error-label-color w-full'>{formik.errors.password}</p>
				) : null}

				<label htmlFor='confirmPassword' className='label w-full mt-6'>
					Contraseña
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
					<p className='text-error-label-color w-full'>{formik.errors.confirmPassword}</p>
				) : null}

				<NavLink className='text-border-color hover:underline w-full' to='/login'>
					¿Tienes una cuenta?
				</NavLink>

				<input
					type='submit'
					value='REGISTRARSE'
					className={`primary-button w-48 mt-2 cursor-pointer ${loading && 'opacity-60'}`}
					onClick={formik.onSubmit}
					disabled={loading}
				/>
			</form>
		</div>
	);
}

export { Register };
