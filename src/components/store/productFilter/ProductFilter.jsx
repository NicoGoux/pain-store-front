import React from 'react';
import { FilterIcon } from '../../../assets/filterIcon/FilterIcon';
import { AddIcon } from '../../../assets/addIcon/AddIcon';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';

function ProductFilter() {
	const matches = useMediaQuery('(max-width: 875px)');

	//TODO hacer STATES
	return (
		<>
			{matches ? (
				<></>
			) : (
				// <div className='absolute top-8 left-10'>
				// 	<FilterIcon size='48' />
				// </div>
				<section
					id='filterSection'
					className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit mt-56 text-lg font-medium whitespace-nowrap md:pl-6'
				>
					<div className='flex items-center justify-around w-full text-xl font-extrabold  whitespace-nowrap'>
						<h2>FILTROS</h2>
						<FilterIcon size='40' />
					</div>
					<input
						placeholder='Nombre Producto'
						type='text'
						className='input text-center w-full'
					></input>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Precio</p>
						<AddIcon size='20px' />
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
						<AddIcon size='20px' />
					</div>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Float</p>
						<AddIcon size='20px' />
					</div>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Condicion</p>
						<AddIcon size='20px' />
					</div>
					<div className='flex w-full items-center justify-between cursor-pointer'>
						<p>Tradelock</p>
						<AddIcon size='20px' />
					</div>
					<button className='secondary-button font-bold w-44'>REINICIAR</button>
					<button className='primary-button font-bold w-44'>BUSCAR</button>
				</section>
			)}
		</>
	);
}

export { ProductFilter };