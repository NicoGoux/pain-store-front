import React from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuerys';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { PlusSmallIcon } from '@heroicons/react/20/solid';

function ProductFilter() {
	const matches = useMediaQuery('(max-width: 875px)');

	//TODO hacer STATES
	return (
		<>
			{matches ? (
				<></>
			) : (
				// <div className='absolute top-8 left-10'>
				// 	<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
				// </div>
				<section
					id='filterSection'
					className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit mt-56 text-lg font-medium whitespace-nowrap md:pl-6'
				>
					<div className='flex items-center justify-around w-full text-xl font-extrabold  whitespace-nowrap'>
						<h2>FILTROS</h2>
						<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
					</div>
					<input
						placeholder='Nombre Producto'
						type='text'
						className='secondary-input text-center w-full'
					></input>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Precio</p>
						<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
					</div>
					{false && (
						<div className='flex flex-col justify-center items-center gap-3 w-full'>
							<div className='flex justify-between w-fit gap-8'>
								<input
									placeholder='0 ARS'
									type='text'
									className='input text-center p-1 w-24 h-7'
								/>
								-
								<input
									placeholder='1000 ARS'
									type='text'
									className='input text-center p-1 w-24 h-7'
								/>
							</div>
						</div>
					)}
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Categoria</p>
						<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
					</div>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Float</p>
						<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
					</div>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Condicion</p>
						<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
					</div>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Tradelock</p>
						<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
					</div>
					<button className='secondary-button font-bold w-44'>REINICIAR</button>
					<button className='primary-button font-bold w-44'>BUSCAR</button>
				</section>
			)}
		</>
	);
}

export { ProductFilter };
