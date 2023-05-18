import React from 'react';
import { Bars3CenterLeftIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { ChevronRightIcon } from '@heroicons/react/20/solid';

function Navbar({ routes }) {
	const auth = useAuth();
	const navigate = useNavigate();
	const onClickLoginButton = () => {
		navigate('/login');
	};

	const onClickRegisterButton = () => {
		navigate('/register');
	};

	return (
		<header
			className='relative flex h-40 items-center justify-between gap-10 w-full px-10 border-b-2 border-border-color 
							md:border-2 md:bg-card-background-color md:border-border-color md:shadow-header'
		>
			<div className='md:hidden'>
				<Bars3CenterLeftIcon className='w-12 text-primary-button-bg-color' />
			</div>
			<figure className='relative md:top-20 max-w-[150px] md:min-w-[150px] md:max-w-[200px] w-full z-50'>
				<img className='w-full h-full' src='/painLogo.png' alt='logo pain store' />
			</figure>

			<ul className='hidden items-end h-full list-none p-0 text-2xl font-medium mr-16 md:flex xl:w-3/5 transition-all'>
				{routes.map((route) => (
					<li className='w-fit rounded-t-lg m-3' key={route.to}>
						<NavLink
							className={({ isActive }) =>
								isActive
									? 'w-full h-full p-3 bg-primary-button-bg-color rounded-t-lg'
									: ''
							}
							to={route.to}
						>
							{route.text}
						</NavLink>
					</li>
				))}
			</ul>
			<div className='hidden flex-col text-2xl font-extrabold w-fit whitespace-nowrap xl:flex mr-8'>
				<p>COMPRAMOS TUS</p>
				<p className='text-4xl text-secondary-font-color secondary-text-shadow'>SKINS</p>
				<p>AL MEJOR PRECIO</p>
			</div>

			{auth.user ? (
				<div className='hidden md:flex items-end justify-end h-full pb-4  whitespace-nowrap'>
					<div className='flex items-center justify-center'>
						<p className='text-2xl font-bold'>
							Bienvenido{' '}
							<span className='text-secondary-font-color'>{auth.user.username}</span>
						</p>
						<ChevronRightIcon className='w-9 text-primary-button-bg-color' />
					</div>
				</div>
			) : (
				<div className='hidden md:flex flex-col gap-4 xl:flex-row xl:gap-6'>
					<button className='primary-button w-32' onClick={onClickLoginButton}>
						INGRESAR
					</button>
					<button className='secondary-button w-32' onClick={onClickRegisterButton}>
						REGISTRARSE
					</button>
				</div>
			)}
		</header>
	);
}

export { Navbar };
