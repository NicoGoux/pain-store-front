import React from 'react';

function Navbar({ routes }) {
	return (
		<header className='relative flex h-40 items-center justify-between gap-8 w-full px-10 border-2 bg-card-background-color border-border-color shadow-header'>
			<figure className='relative top-20 min-w-[150px] max-w-[200px] w-full'>
				{/* <img className='w-full h-full' src='/logo.svg' alt='logo pain store' /> */}
				<img className='w-full h-full' src='/painLogo.png' alt='logo pain store' />
			</figure>
			<ul className='flex items-end w-3/5 h-full gap-4 list-none p-0 text-2xl font-medium'>
				{/* TODO para maquetar */}
				<li className='p-3 bg-primary-button-bg-color rounded-t-lg'>TIENDA</li>
				<li className='p-3'>DESTACADO</li>
				<li className='p-3'>CONTACTO</li>
			</ul>
			<div className='hidden flex-col text-2xl font-extrabold w-fit whitespace-nowrap mr-14 xl:flex'>
				<p>COMPRAMOS TUS</p>
				<p className='text-4xl text-secondary-font-color secondary-text-shadow'>SKINS</p>
				<p>AL MEJOR PRECIO</p>
			</div>

			<div className='flex flex-col gap-4 xl:flex-row xl:gap-6'>
				<button className='primary-button w-32'>INGRESAR</button>
				<button className='secondary-button w-32'>REGISTRARSE</button>
			</div>
		</header>
	);
}

export { Navbar };
