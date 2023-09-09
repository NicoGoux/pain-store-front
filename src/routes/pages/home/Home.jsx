import React from 'react';

function Home() {
	return (
		<section className='main-container items-start justify-start'>
			<div className='flex flex-col w-fit mt-32 mx-8'>
				<div className='flex flex-col justify-center font-extrabold w-full h-fit'>
					<p className='text-center text-8xl w-fit mb-6'>
						BIENVENIDOS A{' '}
						<span className=' text-secondary-font-color secondary-text-shadow w-fit'>
							PAIN{' '}
						</span>{' '}
						STORE
					</p>
					<div className='w-fit flex flex-col items-center justify-center'>
						<p className='text-center w-fit text-5xl xl:ml-16'>
							COMPRAMOS TUS{' '}
							<span className='text-secondary-font-color secondary-text-shadow w-fit'>
								SKINS{' '}
							</span>
							AL MEJOR PRECIO
						</p>
						<div className='w-full h-[150px] flex items-center justify-evenly'>
							<figure
								className='w-16 h-16 flex items-center justify-center cursor-pointer'
								onClick={() => {}}
							>
								<img src='/instagramIcon.png' className='invert' alt='' />
							</figure>
							<figure
								className='w-16 h-16 flex items-center justify-center cursor-pointer'
								onClick={() => {}}
							>
								<img src='/twitterIcon.png' className='invert' alt='' />
							</figure>
						</div>
						<p className='text-center w-fit text-4xl xl:ml-16 mb-24'>
							ARMA TU{' '}
							<span className='text-secondary-font-color secondary-text-shadow w-fit'>
								INVENTARIO IDEAL{' '}
							</span>{' '}
							EN NUESTRA TIENDA{' '}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export { Home };
