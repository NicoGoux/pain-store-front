import React from 'react';
import { useProductStatusService } from '../../../../contexts/AppContext';
import { Loader } from '../../../loader/Loader';
import { ProductStatusItem } from './productStatusItem/ProductStatusItem';

function ProductStatusFilter({ filters, setFilters }) {
	const { statusList, loadingStatuses } = useProductStatusService();

	return (
		<>
			{loadingStatuses ? (
				<div>
					<Loader />
				</div>
			) : (
				<div className='flex w-full text-base'>
					<ul className='flex flex-col gap-2'>
						{statusList.length === 0 ? (
							<p className='text-error-color'>Estados de producto no encontradas</p>
						) : (
							statusList.map((productStatus) => (
								<ProductStatusItem
									key={productStatus._id}
									productStatus={productStatus}
									filters={filters}
									setFilters={setFilters}
								/>
							))
						)}
					</ul>
				</div>
			)}
		</>
	);
}

export { ProductStatusFilter };
