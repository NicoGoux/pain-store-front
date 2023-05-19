import React, { useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusSmallIcon } from '@heroicons/react/20/solid';
import { NameFilter } from './filterOptions/NameFilter';
import { PriceFilter } from './filterOptions/PriceFilter';
import { CategoryFilter } from './filterOptions/CategoryFilter';

function ProductFilter({ categories, conditions, filters }) {
	const matches = useMediaQuery('(max-width: 875px)');

	const [filterOpen, setFilterOpen] = useState({
		price: false,
		category: false,
		float: false,
		condition: false,
		tradeLock: false,
	});

	const onClickOpenFilter = (filter) => {
		const state = filterOpen;
		for (const key in state) {
			state[key] = false;
		}
		state[filter] = true;
		console.log(state);
		setFilterOpen({ ...state });
	};

	const onClickCloseButton = () => {
		setFilterOpen({
			price: false,
			category: false,
			float: false,
			condition: false,
			tradeLock: false,
		});
	};

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
					className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit mt-40 mb-40 text-lg font-medium whitespace-nowrap md:pl-6'
				>
					<div className='flex items-center justify-around w-full text-xl font-extrabold  whitespace-nowrap'>
						<h2>FILTROS</h2>
						<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
					</div>
					<NameFilter />
					<div
						className='flex w-full items-center justify-between cursor-pointer'
						onClick={
							!filterOpen.price
								? () => onClickOpenFilter(Object.keys(filterOpen)[0])
								: onClickCloseButton
						}
					>
						<p>Precio</p>
						{!filterOpen.price ? (
							<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
						) : (
							<MinusIcon className='w-7 text-primary-button-bg-color' />
						)}
					</div>
					{filterOpen.price && <PriceFilter />}
					<div
						className='flex w-full items-center justify-between cursor-pointer'
						onClick={
							!filterOpen.category
								? () => onClickOpenFilter(Object.keys(filterOpen)[1])
								: onClickCloseButton
						}
					>
						<p>Categoria</p>
						{!filterOpen.category ? (
							<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
						) : (
							<MinusIcon className='w-7 text-primary-button-bg-color' />
						)}
					</div>
					{filterOpen.category && <CategoryFilter categories={categories} />}
					<div
						className='flex w-full items-center justify-between cursor-pointer'
						onClick={
							!filterOpen.float
								? () => onClickOpenFilter(Object.keys(filterOpen)[2])
								: onClickCloseButton
						}
					>
						<p>Float</p>
						{!filterOpen.float ? (
							<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
						) : (
							<MinusIcon className='w-7 text-primary-button-bg-color' />
						)}
					</div>
					<div
						className='flex w-full items-center justify-between cursor-pointer'
						onClick={
							!filterOpen.condition
								? () => onClickOpenFilter(Object.keys(filterOpen)[3])
								: onClickCloseButton
						}
					>
						<p>Condicion</p>
						{!filterOpen.condition ? (
							<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
						) : (
							<MinusIcon className='w-7 text-primary-button-bg-color' />
						)}
					</div>
					<div
						className='flex w-full items-center justify-between cursor-pointer'
						onClick={
							!filterOpen.tradeLock
								? () => onClickOpenFilter(Object.keys(filterOpen)[4])
								: onClickCloseButton
						}
					>
						<p>Tradelock</p>
						{!filterOpen.tradeLock ? (
							<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
						) : (
							<MinusIcon className='w-7 text-primary-button-bg-color' />
						)}
					</div>
					<button className='secondary-button font-bold w-44'>REINICIAR</button>
					<button className='primary-button font-bold w-44'>BUSCAR</button>
				</section>
			)}
		</>
	);
}

export { ProductFilter };
