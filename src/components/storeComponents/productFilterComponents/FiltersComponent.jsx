import React, { useState } from 'react';
import { PriceFilter } from './filterOptions/PriceFilter';
import { CategoryFilter } from './filterOptions/categoryFilter/CategoryFilter';
import { ConditionFilter } from './filterOptions/conditionFilter/ConditionFilter';
import { FilterOptionTitle } from './FilterOptionTitle';
import { FloatFilter } from './filterOptions/FloatFilter';
import { ProductStatusFilter } from './filterOptions/ProductStatusFilter';
import { TradeLockFilter } from './filterOptions/TradeLockFilter';
import { useAuthService } from '../../../contexts/UserContext';

function Filters({ filters, setFilters, searching }) {
	const auth = useAuthService();

	const [filterOpen, setFilterOpen] = useState({
		price: false,
		category: false,
		float: false,
		condition: false,
		status: false,
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
			{filterOpen.category && <CategoryFilter filters={filters} setFilters={setFilters} />}

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
			{filterOpen.condition && <ConditionFilter filters={filters} setFilters={setFilters} />}

			{auth.user && auth.isAdmin() && (
				<>
					<FilterOptionTitle
						title={'Estado'}
						filterOpen={filterOpen}
						setFilterOpen={setFilterOpen}
						objectKey={Object.keys(filterOpen)[4]}
					/>
					{filterOpen.status && (
						<ProductStatusFilter
							filters={filters}
							setFilters={setFilters}
							searching={searching}
						/>
					)}
				</>
			)}

			<FilterOptionTitle
				title={'Trade Lock'}
				filterOpen={filterOpen}
				setFilterOpen={setFilterOpen}
				objectKey={Object.keys(filterOpen)[5]}
			/>
			{filterOpen.tradeLock && <TradeLockFilter filters={filters} setFilters={setFilters} />}
		</>
	);
}

export { Filters };
