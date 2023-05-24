import React from 'react';
import { CategoryWithoutChildren } from './categoryItem/CategoryWithoutChildren';
import { CategoryWithChildren } from './categoryItem/CategoryWithChildren';
import { Loader } from '../../../loader/Loader';

function CategoryFilter({ categories, loadingCategories, filters, setFilters }) {
	return (
		<>
			{loadingCategories ? (
				<div>
					<Loader />
				</div>
			) : (
				<div className='flex w-full text-base'>
					<ul className='flex flex-col gap-2'>
						{listCategories(categories, filters, setFilters)}
					</ul>
				</div>
			)}
		</>
	);
}

function listCategories(categories, filters, setFilters) {
	if (!categories) {
		return <p className='text-error-color'>Categorias no encontradas</p>;
	}
	const sortedCategories = categories.sort((c1, c2) => {
		return c1.order - c2.order;
	});
	return sortedCategories.map((category) => {
		if (category.childrenCategories.length === 0) {
			return (
				<CategoryWithoutChildren
					key={category.id}
					category={category}
					filters={filters}
					setFilters={setFilters}
				/>
			);
		} else {
			return (
				<CategoryWithChildren
					key={category.id}
					category={category}
					childrenCategories={listCategories(
						category.childrenCategories,
						filters,
						setFilters
					)}
				/>
			);
		}
	});
}

export { CategoryFilter };
