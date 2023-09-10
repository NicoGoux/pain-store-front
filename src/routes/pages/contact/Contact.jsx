import React from 'react';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Contact() {
	return (
		<section
			onScroll={handleMainContainerScroll}
			className='main-container items-center md:items-start justify-center'
		>
			<div className='flex flex-col justify-center w-fit mx-8 my-8 md:mt-32'>
				<div className='flex flex-col justify-center font-extrabold w-full h-fit'>
					<p className='text-center text-2xl sm:text-4xl w-full mb-4'>
						Estamos aquí para responder a tus preguntas, recibir tus comentarios y
						brindarte toda la ayuda que necesites.
					</p>
					<p className='text-center text-2xl sm:text-4xl w-full mb-4'>
						¿Querés{' '}
						<span className=' text-secondary-font-color secondary-text-shadow w-fit'>
							vender tu inventario
						</span>
						? ¿Te interesa alguna{' '}
						<span className=' text-secondary-font-color secondary-text-shadow w-fit'>
							skin
						</span>{' '}
						en particular?
					</p>
					<p className='text-center text-2xl sm:text-4xl w-full mb-6'>
						Utiliza nuestros medios de contacto para comunicarte con nosotros y
						descubrir cómo podemos ayudarte.
					</p>
					<div className='w-full flex flex-col items-center justify-center'>
						<div className='w-full h-[150px] flex flex-wrap items-center justify-evenly gap-y-4'>
							<div
								className='flex items-center gap-4 text-3xl cursor-pointer hover:underline'
								onClick={() => {
									window.open('https://www.instagram.com/pain.store/', '_blank');
								}}
							>
								Instagram
								<figure className='w-20 h-20 flex items-center justify-center p-2 hover:bg-card-background-color hover:border-b border-border-color rounded-3xl transition-all'>
									<img src='/instagramIcon.png' className='invert' alt='' />
								</figure>
							</div>
							<div className='flex items-center gap-4 text-3xl cursor-pointer hover:underline'>
								Twitter
								<figure
									className='w-20 h-20 flex items-center justify-center cursor-pointer p-2 hover:bg-card-background-color hover:border-b border-border-color rounded-3xl transition-all'
									onClick={() => {
										window.open('https://twitter.com/pain_store', '_blank');
									}}
								>
									<img src='/twitterIcon.png' className='invert' alt='' />
								</figure>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export { Contact };
