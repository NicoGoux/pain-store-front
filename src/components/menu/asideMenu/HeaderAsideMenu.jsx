import React, { useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/solid';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/UserContext';
import { NavAside } from './NavAside';

function HeaderAsideMenu({ routes }) {
	const [openNavAside, setOpenNavAside] = useState(false);
	const auth = useAuth();
	const navigate = useNavigate();

	const onClickLoginButton = () => {
		navigate('/login');
	};

	const onClickRegisterButton = () => {
		navigate('/register');
	};

	return (
		<>
			<header className='relative flex min-h-fit h-1/6 items-center justify-between gap-10 w-full px-10 border-b-2 border-border-color bg-background-color z-30'>
				<div onClick={() => setOpenNavAside(true)}>
					<Bars3CenterLeftIcon className='w-12 text-primary-button-bg-color' />
				</div>
				<figure className='relative h-full'>
					<img className='w-full h-full' src='/painLogo.png' alt='logo pain store' />
				</figure>
			</header>
			{openNavAside && <NavAside routes={routes} setOpenNavAside={setOpenNavAside} />}
		</>
	);
}

export { HeaderAsideMenu };
