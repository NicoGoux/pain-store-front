import React from 'react';
import { CategoryWithoutChildren } from './categoryItem/CategoryWithoutChildren';
import { CategoryWithChildren } from './categoryItem/CategoryWithChildren';

function CategoryFilter({ conditions }) {
	return (
		<div className='flex w-full text-base'>
			<ul className='flex flex-col gap-2'>{listCategories(conditions)}</ul>
		</div>
	);
}

function listCategories(conditions) {
	if (!conditions) {
		return <p className='text-error-label-color'>Categorias no encontradas</p>;
	}
	const sortedCategories = conditions.sort((c1, c2) => {
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
