import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/UserContext';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { Loader } from '../../../components/loader/Loader';

function Profile() {
	const [completeUser, setCompleteUser] = useState(null);
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
										<p className='w-fit font-normal text-secondary-font-color underline cursor-pointer hover:text-primary-font-color'>
											Cambiar contraseña
										</p>
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
