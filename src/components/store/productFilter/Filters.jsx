import React, { useState } from 'react';
import { PriceFilter } from './filterOptions/PriceFilter';
import { CategoryFilter } from './filterOptions/CategoryFilter';
import { ConditionFilter } from './filterOptions/ConditionFilter';
import { FilterOptionTitle } from './FilterOptionTitle';
import { FloatFilter } from './filterOptions/FloatFilter';
import TradeLockFilter from './filterOptions/TradeLockFilter';
import { useGetConditions } from '../../../hooks/useGetConditions';
import { useGetCategories } from '../../../hooks/useGetCategories';

function Filters({ filters, setFilters }) {
	const { categories, loadingCategories } = useGetCategories();

	const { conditions, loadingConditions } = useGetConditions();

	const [filterOpen, setFilterOpen] = useState({
		price: false,
		category: false,
		float: false,
		condition: false,
		tradeLock: false,
	});

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
				<CategoryFilter
					categories={categories}
					loadingCategories={loadingCategories}
					filters={filters}
					setFilters={setFilters}
				/>
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
					loadingConditions={loadingConditions}
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
		</>
	);
}

export { Filters };
