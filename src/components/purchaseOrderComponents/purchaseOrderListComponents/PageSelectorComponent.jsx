import React from 'react';

const PageSelectorComponent = ({ currentPage, totalPages, onPageChange }) => {
	const pagesToShow = 9;
	const pagesAroundCurrent = Math.floor(pagesToShow / 2);
	const pageNumbers = [];

	// Calculate the range of pages to display
	const startPage = Math.max(1, currentPage - pagesAroundCurrent);
	const endPage = Math.min(totalPages, currentPage + pagesAroundCurrent);

	// Add pages before the current range
	if (startPage > 1) {
		pageNumbers.push(1);
		if (startPage > 2) {
			pageNumbers.push('...');
		}
	}

	// Add pages in the current range
	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	// Add pages after the current range
	if (endPage < totalPages) {
		if (endPage < totalPages - 1) {
			pageNumbers.push('...');
		}
		pageNumbers.push(totalPages);
	}

	return (
		<div className='flex gap-1 text-lg'>
			{pageNumbers.map((page, index) => (
				<span
					key={index}
					className={`text-primary-font-color hover:underline hover:text-secondary-font-color cursor-pointer ${
						page == currentPage ? 'text-secondary-font-color underline' : ''
					}`}
					onClick={() => {
						if (typeof page === 'number') {
							onPageChange(page);
						}
					}}
				>
					{page}
				</span>
			))}
		</div>
	);
};

export { PageSelectorComponent };
