import React, { useState } from 'react';
import { PriceFilter } from './filterOptions/PriceFilter';
import { CategoryFilter } from './filterOptions/CategoryFilter';
import { ConditionFilter } from './filterOptions/ConditionFilter';
import { FilterOptionTitle } from './FilterOptionTitle';
import { FloatFilter } from './filterOptions/FloatFilter';
import TradeLockFilter from './filterOptions/TradeLockFilter';

function Filters({ categories, conditions, filters, setFilters, closeAside, matches }) {
	const [filterOpen, setFilterOpen] = useState({
		price: false,
		category: false,
		float: false,
		condition: false,
		tradeLock: false,
	});

	const onClickRestartButton = () => {
		if (closeAside) {
			closeAside();
		}
		setFilters({
			name: '',
			price: '',
			category: '',
			float: '',
			condition: '',
			nonTradeLock: '',
		});
	};

	const onClickSearchButton = () => {
		if (closeAside) {
			closeAside();
		}
		toast.error('Not implemented');
	};

	return (
		<>
			<FilterOptionTitle
				title={'Precio'}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
				objectKey={Object.keys(filterOpen)[0]}
			/>
			{filterOpen.price && <PriceFilter filters={filters} setFilters={setFilters} />}

			<FilterOptionTitle
				title={'Categoría'}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
				objectKey={Object.keys(filterOpen)[1]}
			/>
			{filterOpen.category && (
				<CategoryFilter categories={categories} filters={filters} setFilters={setFilters} />
			)}

			<FilterOptionTitle
				title={'Float'}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
				objectKey={Object.keys(filterOpen)[2]}
			/>
			{filterOpen.float && <FloatFilter filters={filters} setFilters={setFilters} />}

			<FilterOptionTitle
				title={'Condición'}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
				objectKey={Object.keys(filterOpen)[3]}
			/>
			{filterOpen.condition && (
				<ConditionFilter
					conditions={conditions}
					filters={filters}
					setFilters={setFilters}
				/>
			)}

			<FilterOptionTitle
				title={'Trade Lock'}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
				objectKey={Object.keys(filterOpen)[4]}
			/>
			{filterOpen.tradeLock && <TradeLockFilter filters={filters} setFilters={setFilters} />}

			<div
				className={`flex items-center justify-center w-full gap-6 ${
					!matches && 'flex-col w-fit'
				}`}
			>
				<button className='secondary-button font-bold w-44' onClick={onClickRestartButton}>
					REINICIAR
				</button>
				<button className='primary-button font-bold w-44' onClick={onClickSearchButton}>
					BUSCAR
				</button>
			</div>
		</>
	);
}

export { Filters };
