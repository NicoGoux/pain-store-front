import { useFormik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuthService } from '../../../contexts/UserContext';
import { toast } from 'react-hot-toast';

function Login() {
	const [loading, setLoading] = useState(false);

	const auth = useAuthService();
	const navigate = useNavigate();

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
				await toast.promise(auth.login(values), {
					loading: 'Iniciando sesión...',
					success: 'Sesión iniciada!',
					error: 'No pudo inciarse sesion',
				});
				navigate('/store');
			} catch (error) {
				onSubmitProps.setErrors({ password: 'Email o contraseña invalida' });
			} finally {
				setLoading(false);
			}
		},
	});

	return (
		<div className={`main-container w-full ${loading && 'cursor-wait'}`}>
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
					value={formik.values.email.toLowerCase()}
				/>
				{formik.touched.email && formik.errors.email ? (
					<p className='text-error-color w-full'>{formik.errors.email}</p>
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
					<p className='text-error-color w-full'>{formik.errors.password}</p>
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
