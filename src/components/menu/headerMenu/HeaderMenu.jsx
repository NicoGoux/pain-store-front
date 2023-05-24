import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/UserContext';
import { UserHeaderSection } from './UserHeaderSection';

function HeaderMenu({ routes }) {
	const auth = useAuth();
	const navigate = useNavigate();

	const onClickLoginButton = () => {
		navigate('/login');
	};

	const onClickRegisterButton = () => {
		navigate('/register');
	};

	return (
		<header className='relative flex min-h-[130px] h-1/6 items-center justify-between gap-10 w-full px-10 border-2 border-border-color bg-background-color z-30'>
			<figure className='relative h-auto w-full max-w-[200px] top-20 z-50'>
				<img className='w-full h-full' src='/painLogo.png' alt='logo pain store' />
			</figure>

			<ul
				className={`flex items-end h-full list-none p-0 text-2xl font-medium xl:w-3/5 transition-all ${
					!auth.user && 'mr-16'
				}`}
			>
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
			<div className='hidden xl:flex flex-col self-end m-6 text-2xl font-extrabold w-fit whitespace-nowrap mr-8'>
				<p>COMPRAMOS TUS</p>
				<p className='text-4xl text-secondary-font-color secondary-text-shadow'>SKINS</p>
				<p>AL MEJOR PRECIO</p>
			</div>

			{auth.user ? (
				<UserHeaderSection user={auth.user} />
			) : (
				<div className='flex flex-col gap-4 xl:flex-row xl:gap-6'>
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

export { HeaderMenu };
