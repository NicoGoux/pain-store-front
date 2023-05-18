import axios from 'axios';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';

function Login() {
	const [loading, setLoading] = useState(false);

	const auth = useAuth();
	const navigate = useNavigate();

	//TODO
	// useEffect(() => {
	// 	if (auth.user) {
	// 		navigate('/store', { replace: true });
	// 	}
	// });

	const onClickRegisterButton = () => {
		navigate('/register');
	};

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email invalido').required('Email requerido'),

			password: Yup.string().required('Contraseña requerida'),
		}),

		onSubmit: async (values, onSubmitProps) => {
			try {
				setLoading(true);
				console.log(auth);
				await auth.login(values);
				navigate('/store');
			} catch (error) {
				onSubmitProps.setErrors({ password: 'Email o contraseña invalida' });
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<div className={`main-container h-4/5 w-full ${loading && 'cursor-wait'}`}>
			<form
				onSubmit={formik.handleSubmit}
				className='card flex flex-col justify-center items-center gap-2 m-auto p-4 xsm:p-12 h-fit w-[460px]  border-0 bg-background-color xsm:border-2'
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
				<NavLink className='text-border-color hover:underline w-full' to='/login/recovery'>
					¿Has olvidado tu contraseña?
				</NavLink>

				<input
					type='submit'
					value='INGRESAR'
					className={`primary-button w-48 mt-8 cursor-pointer ${loading && 'opacity-60'}`}
					onClick={formik.onSubmit}
					disabled={loading}
				/>

				<button
					type='button'
					className={`secondary-button w-48 mt-5 ${loading && 'opacity-60'}`}
					disabled={loading}
					onClick={onClickRegisterButton}
				>
					REGISTRARSE
				</button>
			</form>
		</div>
	);
}

export { Login };