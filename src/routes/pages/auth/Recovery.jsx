import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useAuthService } from '../../../contexts/UserContext';
import { toast } from 'react-hot-toast';

function Recovery() {
	const auth = useAuthService();
	const [seconds, setSeconds] = useState(0);
	const [startCounter, setStartCounter] = useState(true);
	const intervalRef = useRef(null);

	useEffect(() => {
		if (startCounter && seconds > 0) {
			intervalRef.current = setInterval(() => {
				setSeconds((prevSeconds) => prevSeconds - 1);
			}, 1000);
		} else {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}

		return () => {
			clearInterval(intervalRef.current);
		};
	}, [startCounter, seconds]);

	useEffect(() => {
		if (seconds === 0) {
			setStartCounter(false);
		}
	}, [seconds]);

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email invalido').required('Email requerido'),
		}),

		onSubmit: async (values) => {
			await toast.promise(auth.sendRecovery(values), {
				loading: 'Enviando...',
				success: 'Email enviado!',
				error: 'El email no pudo ser enviado',
			});

			setSeconds(60);
			setStartCounter(true);
		},
	});

	return (
		<div className={`main-container w-full`}>
			<form
				onSubmit={formik.handleSubmit}
				className='card flex flex-col justify-center items-center gap-2 m-auto p-4 xsm:p-12 h-fit w-[460px]  border-0 bg-background-color xsm:border-2'
			>
				<label htmlFor='email' className='label w-full'>
					Ingrese su correo electronico
				</label>
				<p className='label font-light w-full pb-2'>
					Se enviara un correo electronico de recuperación de contraseña
				</p>
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

				{seconds != 0 && (
					<p className='label font-light w-full'>
						Podra enviar otro correo en {seconds} segundos
					</p>
				)}

				<input
					type='submit'
					value='ENVIAR CORREO'
					className={`primary-button w-48 mt-8 cursor-pointer ${
						seconds != 0 && 'opacity-60'
					}`}
					onClick={formik.onSubmit}
					disabled={seconds != 0}
				/>
			</form>
		</div>
	);
}

export default Recovery;
