import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthService } from '../../../contexts/UserContext';
import {
	ChevronDownIcon,
	ChevronRightIcon,
	ChevronDoubleRightIcon,
	Cog6ToothIcon,
	ClipboardDocumentCheckIcon,
	ShoppingCartIcon,
	HeartIcon,
	ArrowLeftOnRectangleIcon,
	UserCircleIcon,
	XMarkIcon,
} from '@heroicons/react/20/solid';
import { UserNavLink } from './UserNavLink';

function NavAside({ routes, setOpenNavAside }) {
	const [userDropDown, setUserDropDown] = useState(false);
	const auth = useAuthService();
	const navigate = useNavigate();

	const closeAside = () => {
		setOpenNavAside(false);
	};

	const onClickLoginButton = () => {
		setOpenNavAside(false);
		navigate('/login');
	};

	const onClickRegisterButton = () => {
		setOpenNavAside(false);
		navigate('/register');
	};

	return (
		<aside className='sidebar-container show-sidebar'>
			<div className='absolute w-full h-full bg-transparent -z-10' onClick={closeAside} />
			<div className='sidebar'>
				<div className='flex items-center justify-center w-full'>
					<figure className='relative h-full'>
						<img className='w-40 h-auto' src='/painLogo.png' alt='logo pain store' />
					</figure>
				</div>
				<ul className='flex flex-col gap-3 text-left text-xl h-full'>
					{routes.map((route) => (
						<li className='flex items-center justify-center w-fit' key={route.to}>
							<ChevronDoubleRightIcon className='w-5 mr-2 text-secondary-font-color' />
							<NavLink
								className={({ isActive }) =>
									isActive ? 'border-b-2 border-border-color' : ''
								}
								to={route.to}
								onClick={closeAside}
							>
								{route.text.charAt(0) + route.text.toLowerCase().slice(1)}
							</NavLink>
						</li>
					))}
					{auth.user && (
						<li className='flex flex-col justify-center w-fit'>
							<div className='flex'>
								<ChevronDoubleRightIcon className='w-5 mr-2 text-secondary-font-color' />
								<p>
									Bienvenido
									<span className='text-secondary-font-color'>{` ${auth.user.username}`}</span>
								</p>
								{userDropDown ? (
									<ChevronDownIcon
										className='w-7 text-primary-button-bg-color cursor-pointer'
										onClick={() => setUserDropDown(false)}
									/>
								) : (
									<ChevronRightIcon
										className='w-7 text-primary-button-bg-color cursor-pointer'
										onClick={() => setUserDropDown(true)}
									/>
								)}
							</div>

							{userDropDown && (
								<ul className='flex flex-col gap-2 pl-6 pt-4'>
									<UserNavLink
										text='Perfil'
										route='/account/profile'
										closeAside={closeAside}
									>
										<UserCircleIcon className='w-6 mr-4 text-secondary-font-color' />
									</UserNavLink>
									{auth.isAdmin() ? (
										<>
											<UserNavLink
												text='Gestion'
												route='/admin/management'
												closeAside={closeAside}
											>
												<Cog6ToothIcon className='w-6 mr-4 text-secondary-font-color' />
											</UserNavLink>
										</>
									) : (
										<>
											<UserNavLink
												text='Mis compras'
												route='/account/orders'
												closeAside={closeAside}
											>
												<ClipboardDocumentCheckIcon className='w-6 mr-4 text-secondary-font-color' />
											</UserNavLink>
											<UserNavLink
												text='Mi carrito'
												route='/account/cart'
												closeAside={closeAside}
											>
												<ShoppingCartIcon className='w-6 mr-4 text-secondary-font-color' />
											</UserNavLink>
										</>
									)}
									<UserNavLink
										text='Salir'
										route='/store'
										closeAside={closeAside}
										execute={auth.logout}
									>
										<ArrowLeftOnRectangleIcon className='w-6 mr-4 text-secondary-font-color' />
									</UserNavLink>
								</ul>
							)}
						</li>
					)}
				</ul>

				{!auth.user && (
					<div className='flex items-center justify-center w-full gap-4'>
						<button className='primary-button w-32' onClick={onClickLoginButton}>
							INGRESAR
						</button>
						<button className='secondary-button w-32' onClick={onClickRegisterButton}>
							REGISTRARSE
						</button>
					</div>
				)}
				<button className='absolute top-0 right-0 focus:outline-none' onClick={closeAside}>
					<XMarkIcon className='text-error-color w-12' />
				</button>
			</div>
		</aside>
	);
}

export { NavAside };
