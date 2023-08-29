import React from 'react';
import { CategoryWithoutChildren } from './CategoryWithoutChildren';
import { CategoryWithChildren } from './CategoryWithChildren';
import { Loader } from '../../../../auxComponents/loader/Loader';
import { useCategoryService } from '../../../../../contexts/AppContext';

function CategoryFilter({ filters, setFilters }) {
	const { categoryList, loadingCategories } = useCategoryService();

	return (
		<>
			{loadingCategories ? (
				<div>
					<Loader />
				</div>
			) : (
				<div className='flex w-full text-base'>
					<ul className='flex flex-col gap-2'>
						{listCategories(categoryList, filters, setFilters)}
					</ul>
				</div>
			)}
		</>
	);
}

function listCategories(categoryList, filters, setFilters) {
	if (!categoryList) {
		return <p className='text-error-color'>Categorias no encontradas</p>;
	}
	const sortedCategories = categoryList.sort((c1, c2) => {
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
