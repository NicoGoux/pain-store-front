import React from 'react';
import { CategoryWithoutChildren } from './categoryItem/CategoryWithoutChildren';
import { CategoryWithChildren } from './categoryItem/CategoryWithChildren';

function CategoryFilter({ categories }) {
	return (
		<div className='flex w-full text-base'>
			<ul className='flex flex-col gap-2'>{listCategories(categories)}</ul>
		</div>
	);
}

function listCategories(categories) {
	if (!categories) {
		return <p className='text-error-label-color'>Categorias no encontradas</p>;
	}
	const sortedCategories = categories.sort((c1, c2) => {
		return c1.order - c2.order;
	});
	return sortedCategories.map((category) => {
		if (category.childrenCategories.length === 0) {
			return <CategoryWithoutChildren key={category.id} category={category} />;
		} else {
			return (
				<CategoryWithChildren
					key={category.id}
					category={category}
					childrenCategories={listCategories(category.childrenCategories)}
				/>
			);
		}
	});
}

export { CategoryFilter };
