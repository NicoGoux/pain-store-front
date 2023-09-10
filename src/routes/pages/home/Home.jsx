import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Home() {
	const navigate = useNavigate();

	return (
		<section
			onScroll={handleMainContainerScroll}
			className='main-container items-center md:items-start justify-start'
		>
			<div className='flex flex-col justify-center w-fit mx-8 my-8 md:mt-32'>
				<div className='w-full flex flex-col items-center justify-center'>
					<p className='text-center text-5xl xsm:text-6xl sm:text-8xl w-fit mb-6'>
						BIENVENIDOS A{' '}
						<span className=' text-secondary-font-color secondary-text-shadow w-fit'>
							PAIN{' '}
						</span>{' '}
						STORE
					</p>
					<p className='text-center w-fit text-3xl sm:text-5xl'>
						COMPRAMOS TUS{' '}
						<span className='text-secondary-font-color secondary-text-shadow w-fit'>
							SKINS{' '}
						</span>
						AL MEJOR PRECIO
					</p>
					<div className='w-full h-[150px] flex items-center justify-evenly'>
						<figure
							className='w-20 h-20 flex items-center justify-center cursor-pointer p-2 hover:bg-card-background-color hover:border-b border-border-color rounded-3xl transition-all'
							onClick={() => {
								window.open('https://www.instagram.com/pain.store/', '_blank');
							}}
						>
							<img src='/instagramIcon.png' className='invert' alt='' />
						</figure>
						<figure
							className='w-20 h-20 flex items-center justify-center cursor-pointer p-2 hover:bg-card-background-color hover:border-b border-border-color rounded-3xl transition-all'
							onClick={() => {
								window.open('https://twitter.com/pain_store', '_blank');
							}}
						>
							<img src='/twitterIcon.png' className='invert' alt='' />
						</figure>
					</div>
					<p className='text-center w-fit text-3xl sm:text-5xl mb-12'>
						ARMA TU{' '}
						<span className='text-secondary-font-color secondary-text-shadow w-fit'>
							INVENTARIO IDEAL{' '}
						</span>{' '}
						EN NUESTRA TIENDA{' '}
					</p>

					<button
						className='primary-button w-56 text-3xl'
						onClick={() => {
							navigate('/store');
						}}
					>
						IR A LA TIENDA
					</button>
				</div>
			</div>
		</section>
	);
}

export { Home };
