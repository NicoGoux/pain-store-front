import React, { useEffect, useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { NameFilter } from './filterOptions/NameFilter';
import { Filters } from './Filters';
import { XMarkIcon } from '@heroicons/react/20/solid';

function ProductFilter({ categories, conditions, filters, setFilters, matches }) {
	const [openAsideFilter, setOpenAsideFilter] = useState(false);

	const closeAside = () => {
		setOpenAsideFilter(false);
	};

	useEffect(() => {
		if (!matches) {
			closeAside();
		}
	}, [matches]);

	return (
		<>
			{matches ? (
				<>
					<section className='flex items-center justify-center gap-6 w-full text-lg font-medium whitespace-nowrap py-8'>
						<div className='flex gap-4 w-4/5'>
							<AdjustmentsHorizontalIcon
								className='w-12 text-primary-button-bg-color cursor-pointer'
								onClick={() => setOpenAsideFilter(true)}
							/>
							<NameFilter filters={filters} setFilters={setFilters} />
						</div>
					</section>
					{openAsideFilter && (
						<aside className='sidebar-container show-sidebar text-lg'>
							<div
								className='absolute w-full h-full bg-transparent -z-10'
								onClick={closeAside}
							/>
							<div className='sidebar py-24'>
								<Filters
									categories={categories}
									conditions={conditions}
									filters={filters}
									setFilters={setFilters}
									closeAside={closeAside}
									matches={matches}
								/>
							</div>
							<button
								className='absolute top-0 right-0 focus:outline-none'
								onClick={closeAside}
							>
								<XMarkIcon className='text-error-label-color w-12' />
							</button>
						</aside>
					)}
				</>
			) : (
				<section
					id='filterSection'
					className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit mt-40 text-lg font-medium whitespace-nowrap pl-6'
				>
					<div className='flex items-center justify-around w-full text-xl font-extrabold  whitespace-nowrap'>
						<h2>FILTROS</h2>
						<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
					</div>
					<NameFilter filters={filters} setFilters={setFilters} />
					<Filters
						categories={categories}
						conditions={conditions}
						filters={filters}
						setFilters={setFilters}
						matches={matches}
					/>
				</section>
			)}
		</>
	);
}

export { ProductFilter };
