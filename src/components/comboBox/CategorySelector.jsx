import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useCategoryService, useProductStatusService } from '../../contexts/AppContext';

function CategorySelector({ defaultValue, onChange, disabled, categoryList }) {
	let loadingCategories = false;
	if (!categoryList) {
		const categoryService = useCategoryService();
		categoryList = categoryService.categoryList;
		loadingCategories = categoryService.loadingCategories;
	}

	const [renderChildrenSelector, setRenderChildrenSelector] = useState(false);
	const [childrenCategories, setChildrenCategories] = useState([]);

	const onChangeCategory = (event) => {
		const category = categoryList.find((category) => category.name === event.target.value);
		if (category.childrenCategories.length === 0) {
			setRenderChildrenSelector(false);
			setChildrenCategories([]);
			onChange(event);
		} else {
			setChildrenCategories(category.childrenCategories);
			setRenderChildrenSelector(true);
		}
	};

	return (
		<>
			<div className='relative flex items-center mr-4'>
				<ChevronDownIcon className='absolute right-0 w-6' focusable={false} />
				<select
					name='category'
					id='category'
					disabled={disabled}
					defaultValue={defaultValue}
					className='flex items-center h-fit pr-6 primary-input max-w-md px-2 py-1 appearance-none'
					onChange={onChangeCategory}
				>
					<option value=''>Ninguno seleccionado</option>
					{!loadingCategories &&
						categoryList.map((category) => (
							<option key={category.id} value={category.name}>
								{category.name}
							</option>
						))}
				</select>
			</div>

			{renderChildrenSelector && (
				<CategorySelector
					defaultValue={defaultValue}
					onChange={onChange}
					disabled={disabled}
					categoryList={childrenCategories}
				/>
			)}
		</>
	);
}

export { CategorySelector };
