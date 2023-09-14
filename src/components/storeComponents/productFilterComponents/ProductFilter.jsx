import React, { useEffect, useState } from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { NameFilter } from './filterOptions/NameFilter';
import { Filters } from './FiltersComponent';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { productStatusStrings } from '../../../config/productStatusStrings';

function ProductFilter({ filters, setFilters, setSearchParams, matches, searching }) {
	const [openAsideFilter, setOpenAsideFilter] = useState(false);

	const closeAside = () => {
		setOpenAsideFilter(false);
	};

	useEffect(() => {
		if (!matches) {
			closeAside();
		}
	}, [matches]);

	const onClickRestartButton = () => {
		setFilters({
			name: '',
			minPrice: '',
			maxPrice: '',
			category: '',
			minFloat: '',
			maxFloat: '',
			condition: '',
			productStatus: productStatusStrings.DISPONIBLE,
			nonTradeLock: false,
		});
		setSearchParams('');

		if (closeAside) {
			closeAside();
		}
	};

	const onClickSearchButton = () => {
		let string = '?';
		let i = 1;
		for (const key in filters) {
			if (filters[key] && filters[key] != '') {
				if (i != 1) {
					string += '&';
				}
				if (key != 'productStatus') string += `${key}=${filters[key]}`;
				i++;
			}
		}
		setSearchParams(string);
		if (closeAside) {
			closeAside();
		}
	};

	const handleKeyDown = (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			onClickSearchButton();
		}
	};

	return (
		<>
			{matches ? (
				<>
					<section className='flex items-center justify-center gap-6 w-full text-lg font-medium whitespace-nowrap py-8'>
						<div className='flex gap-4 w-4/5' onKeyDown={handleKeyDown}>
							<AdjustmentsHorizontalIcon
								className='w-12 text-primary-button-bg-color cursor-pointer rounded-full'
								onClick={() => setOpenAsideFilter(true)}
							/>
							<NameFilter filters={filters} setFilters={setFilters} />
							<MagnifyingGlassIcon
								className='w-12 -scale-x-100 text-primary-button-bg-color rounded-full cursor-pointer'
								onClick={onClickSearchButton}
							/>
						</div>
					</section>
					{openAsideFilter && (
						<aside className='sidebar-container show-sidebar text-lg'>
							<div
								className='absolute w-full h-full bg-transparent -z-10'
								onClick={closeAside}
							/>
							<div className='sidebar py-24' onKeyDown={handleKeyDown}>
								<Filters
									filters={filters}
									setFilters={setFilters}
									searching={searching}
								/>
								<div className='flex w-full items-center justify-center gap-6'>
									<button
										className='secondary-button font-bold w-44'
										onClick={onClickRestartButton}
									>
										REINICIAR
									</button>
									<button
										className='primary-button font-bold w-44'
										onClick={onClickSearchButton}
									>
										BUSCAR
									</button>
								</div>
								<button
									className='absolute top-0 right-0 focus:outline-none'
									onClick={closeAside}
								>
									<XMarkIcon className='text-error-color w-12' />
								</button>
							</div>
						</aside>
					)}
				</>
			) : (
				<section
					id='filterSection'
					className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit mt-40 text-lg font-medium whitespace-nowrap pl-6'
					onKeyDown={handleKeyDown}
				>
					<div className='flex items-center justify-around w-full text-xl font-extrabold  whitespace-nowrap'>
						<h2>FILTROS</h2>
						<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
					</div>
					<NameFilter filters={filters} setFilters={setFilters} />
					<Filters filters={filters} setFilters={setFilters} searching={searching} />
					<div
						className={`flex items-center justify-center w-full gap-6 ${
							!matches && 'flex-col w-fit'
						}`}
					>
						<button
							className='secondary-button font-bold w-44'
							onClick={onClickRestartButton}
						>
							REINICIAR
						</button>
						<button
							className='primary-button font-bold w-44'
							onClick={onClickSearchButton}
						>
							BUSCAR
						</button>
					</div>
				</section>
			)}
		</>
	);
}

export { ProductFilter };
