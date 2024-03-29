import React, { useState } from 'react';
import { Bars3CenterLeftIcon } from '@heroicons/react/24/solid';
import { NavAside } from './NavAside';
import { useNavigate } from 'react-router-dom';

function HeaderForAsideComponent({ routes }) {
	const [openNavAside, setOpenNavAside] = useState(false);

	const navigate = useNavigate();

	return (
		<>
			<header className='relative flex min-h-[130px] h-1/6 items-center justify-between gap-10 w-full px-10 border-b-2 border-border-color bg-background-color z-30'>
				<div onClick={() => setOpenNavAside(true)}>
					<Bars3CenterLeftIcon className='w-12 text-primary-button-bg-color cursor-pointer' />
				</div>
				<figure
					className='relative h-full cursor-pointer'
					onClick={() => {
						navigate('/home');
					}}
				>
					<img className='w-full h-full' src='/painLogo.png' alt='logo pain store' />
				</figure>
			</header>
			{openNavAside && <NavAside routes={routes} setOpenNavAside={setOpenNavAside} />}
		</>
	);
}

export { HeaderForAsideComponent };
