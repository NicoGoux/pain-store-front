import axios from 'axios';
import { useFormik } from 'formik';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';

function Login() {
	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: async (values) => {
			const response = await axios.post('https://pain-store.vercel.app/api/v1/users/login', {
				user: { ...values },
			});
			console.log(response.data);
		},
	});

	const loginSchema = Yup.object().shape({});

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	const formData = new FormData(form.current);
	// 	const data = {
	// 		email: formData.get('email'),
	// 		password: formData.get('password'),
	// 	};
	// 	console.log(data);
	// };

	return (
		<div className='main-container h-4/5 w-full'>
			<form
				onSubmit={formik.handleSubmit}
				className='card flex flex-col justify-center items-center gap-2 h-fit w-[460px] p-12 border-0 bg-background-color xsm:border-2'
			>
				<label htmlFor='email' className='label w-full'>
					Correo electronico
				</label>
				<input
					id='email'
					type='text'
					name='email'
					onChange={formik.handleChange}
					placeholder='email@example.com'
					className='primary-input mb-6 w-full'
				/>

				<label htmlFor='password' className='label w-full'>
					Contraseña
				</label>
				<input
					id='password'
					type='password'
					name='password'
					onChange={formik.handleChange}
					placeholder='*********'
					className='primary-input w-full'
				/>
				<NavLink className='text-border-color hover:underline w-full' to='/login/recovery'>
					¿Has olvidado tu contraseña?
				</NavLink>

				<input
					type='submit'
					value='INGRESAR'
					className='primary-button w-48 mt-8'
					onClick={formik.onSubmit}
				/>

				<button className='secondary-button w-48 mt-5'>REGISTRARSE</button>
			</form>
		</div>
	);
}

export { Login };
