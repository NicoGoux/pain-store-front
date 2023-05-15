import React from 'react';
import { AsideButton } from '../../../assets/aside_button/AsideButton';

function Navbar({ routes }) {
	return (
		<header className='relative flex h-40 items-center justify-between gap-10 w-full px-10 border-b-2 border-border-color sm:border-2 sm:bg-card-background-color sm:border-border-color sm:shadow-header'>
			<div className='sm:hidden'>
				<AsideButton isOpen={false} />
			</div>
			<figure className='relative sm:top-20 max-w-[150px] md:min-w-[150px] md:max-w-[200px] w-full'>
				<img className='w-full h-full' src='/painLogo.png' alt='logo pain store' />
			</figure>

			<ul className='hidden items-end h-full list-none p-0 text-md font-medium sm:flex md:text-2xl xl:w-3/5 transition-all'>
				{/* TODO para maquetar */}
				<li className='p-3 bg-primary-button-bg-color rounded-t-lg'>TIENDA</li>
				<li className='p-3'>DESTACADO</li>
				<li className='p-3'>CONTACTO</li>
			</ul>
			<div className='hidden flex-col text-2xl font-extrabold w-fit whitespace-nowrap xl:flex'>
				<p>COMPRAMOS TUS</p>
				<p className='text-4xl text-secondary-font-color secondary-text-shadow'>SKINS</p>
				<p>AL MEJOR PRECIO</p>
			</div>

			<div className='hidden sm:flex flex-col gap-4 xl:flex-row xl:gap-6'>
				<button className='primary-button w-32'>INGRESAR</button>
				<button className='secondary-button w-32'>REGISTRARSE</button>
			</div>
		</header>
	);
}

export { Navbar };
