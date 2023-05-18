import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useAuth } from '../../../contexts/AuthContext';
import { toast } from 'react-hot-toast';

function Recovery() {
	const [sendTimeout, setSendTimeout] = useState(0);
	const [timeoutEnd, setTimeoutEnd] = useState(true);

	const auth = useAuth();

	useEffect(() => {
		let interval;
		if (timeoutEnd == false) {
			interval = setInterval(() => {
				if (sendTimeout == 0) {
					setTimeoutEnd(true);
				}
				setSendTimeout(sendTimeout - 1);
			}, 1000);
		} else {
			clearInterval(interval);
		}
	}, [timeoutEnd]);

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Email invalido').required('Email requerido'),
		}),

		onSubmit: async (values) => {
			try {
				await toast.promise(auth.sendRecovery(values), {
					loading: 'Enviando...',
					success: 'Email enviado!',
					error: 'El email no pudo ser enviado',
				});
			} catch (error) {
			} finally {
				setSendTimeout(60);
				setTimeoutEnd(false);
			}
		},
	});

	return (
		<div className={`main-container h-4/5 w-full`}>
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
					value={formik.values.email}
				/>
				{formik.touched.email && formik.errors.email ? (
					<p className='text-error-label-color w-full'>{formik.errors.email}</p>
				) : null}

				{sendTimeout != 0 && (
					<p className='label font-light w-full'>
						Podra enviar otro correo en {sendTimeout} segundos
					</p>
				)}

				<input
					type='submit'
					value='ENVIAR CORREO'
					className={`primary-button w-48 mt-8 cursor-pointer ${
						sendTimeout != 0 && 'opacity-60'
					}`}
					onClick={formik.onSubmit}
					disabled={sendTimeout != 0}
				/>
			</form>
		</div>
	);
}

export default Recovery;
