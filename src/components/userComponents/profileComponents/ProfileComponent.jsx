import React, { useState } from 'react';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { toast } from 'react-hot-toast';
import { capitalize } from '../../../config/capitalize';
import { ChangePasswordForm } from './ChangePasswordForm';

function ProfileComponent({ user, authService }) {
	const [changePassword, setChangePassword] = useState(false);
	const [pressEmailValidate, setPressEmailValidate] = useState(false);

	const onClickChangePassword = () => {
		if (changePassword) {
			setChangePassword(false);
			return;
		}
		setChangePassword(true);
	};

	const onClickValidateEmail = () => {
		setPressEmailValidate(true);
		const sendEmail = async () => {
			await toast.promise(authService.sendValidateEmail(), {
				loading: 'Enviando...',
				success: 'Email enviado!',
				error: 'El email no pudo ser enviado',
			});
		};
		sendEmail();
	};

	return (
		<>
			<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
			<div className='flex flex-col gap-2 w-full h-full  items-center justify-center'>
				<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
					<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
						{user.username}
					</h2>
					<h3 className='text-3xl'>
						{capitalize(user.firstName)} {capitalize(user.lastName)}
					</h3>
					{authService.isAdmin() && (
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
									{user.email}
									{user.emailConfirm ? (
										<CheckIcon className='w-8 text-correct-color' />
									) : (
										<XMarkIcon className='w-8 text-error-color' />
									)}
								</span>
							</p>
							{!user.emailConfirm && !pressEmailValidate && (
								<p
									className='w-fit font-normal text-secondary-font-color underline cursor-pointer hover:text-primary-font-color'
									onClick={onClickValidateEmail}
								>
									Validar email
								</p>
							)}
						</div>
						<p className='flex gap-2 whitespace-nowrap w-full'>
							Nombre:
							<span className='text-secondary-font-color font-semibold'>
								{capitalize(user.firstName)}
							</span>
						</p>
						<p className='flex gap-2 whitespace-nowrap w-full'>
							Apellido:
							<span className='text-secondary-font-color font-semibold'>
								{capitalize(user.lastName)}
							</span>
						</p>
						<p className='flex gap-2 whitespace-nowrap w-full mt-4'>
							Username:
							<span className='text-secondary-font-color font-semibold'>
								{user.username}
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
						{changePassword && <ChangePasswordForm authService={authService} />}
					</div>
				</div>
			</div>
		</>
	);
}

export { ProfileComponent };
