import React, { useState } from 'react';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { NameFilter } from './filterOptions/NameFilter';
import { PriceFilter } from './filterOptions/PriceFilter';
import { CategoryFilter } from './filterOptions/CategoryFilter';
import { ConditionFilter } from './filterOptions/ConditionFilter';
import { FilterOptionTitle } from './FilterOptionTitle';
import { FloatFilter } from './filterOptions/FloatFilter';
import TradeLockFilter from './filterOptions/TradeLockFilter';

function ProductFilter({ categories, conditions, setFilters }) {
	const matches = useMediaQuery('(max-width: 875px)');

	const [filterOpen, setFilterOpen] = useState({
		price: false,
		category: false,
		float: false,
		condition: false,
		tradeLock: false,
	});

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
					className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit mt-40 text-lg font-medium whitespace-nowrap md:pl-6'
				>
					<div className='flex items-center justify-around w-full text-xl font-extrabold  whitespace-nowrap'>
						<h2>FILTROS</h2>
						<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
					</div>
					<NameFilter setFilters={setFilters} />
					<FilterOptionTitle
						title={'Precio'}
						filterOpen={filterOpen}
						setFilterOpen={setFilterOpen}
						objectKey={Object.keys(filterOpen)[0]}
					/>
					{filterOpen.price && <PriceFilter />}

					<FilterOptionTitle
						title={'Categoría'}
						filterOpen={filterOpen}
						setFilterOpen={setFilterOpen}
						objectKey={Object.keys(filterOpen)[1]}
					/>
					{filterOpen.category && <CategoryFilter categories={categories} />}

					<FilterOptionTitle
						title={'Float'}
						filterOpen={filterOpen}
						setFilterOpen={setFilterOpen}
						objectKey={Object.keys(filterOpen)[2]}
					/>
					{filterOpen.float && <FloatFilter />}

					<FilterOptionTitle
						title={'Condición'}
						filterOpen={filterOpen}
						setFilterOpen={setFilterOpen}
						objectKey={Object.keys(filterOpen)[3]}
					/>
					{filterOpen.condition && <ConditionFilter conditions={conditions} />}

					<FilterOptionTitle
						title={'Trade Lock'}
						filterOpen={filterOpen}
						setFilterOpen={setFilterOpen}
						objectKey={Object.keys(filterOpen)[4]}
					/>
					{filterOpen.tradeLock && <TradeLockFilter />}

					<button className='secondary-button font-bold w-44'>REINICIAR</button>
					<button className='primary-button font-bold w-44'>BUSCAR</button>
				</section>
			)}
		</>
	);
}

export { ProductFilter };
