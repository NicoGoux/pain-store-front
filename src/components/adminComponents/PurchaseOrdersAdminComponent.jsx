import React, { useEffect, useState } from 'react';
import { PurchaseOrderList } from '../purchaseOrderComponents/purchaseOrderListComponents/PurchaseOrderList';
import { useAuthService } from '../../contexts/UserContext';
import { usePurchaseOrderService } from '../../hooks/usePurchaseOrderService';
import { Loader } from '../auxComponents/loader/Loader';
import { PageSelectorComponent } from '../purchaseOrderComponents/purchaseOrderListComponents/PageSelectorComponent';
import { PurchaseOrderFilter } from '../purchaseOrderComponents/purchaseOrderListComponents/purchaseOrderFilterComponents/PurchaseOrderFilters';
import { useSearchParams } from 'react-router-dom';

function PurchaseOrdersAdminComponent() {
	const purchaseOrderService = usePurchaseOrderService();

	const [searchParams, setSearchParams] = useSearchParams();

	const [purchaseOrders, setPurchaseOrders] = useState([]);

	const [loading, setLoading] = useState(true);

	const [initialParams, setInitialParams] = useState(true);

	const [filters, setFilters] = useState({
		page: 1,
		orderNumber: '',
		username: '',
		minDate: '',
		maxDate: '',
	});

	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		if (searchParams.size != 0) {
			const newFilterObject = {};
			for (const key in filters) {
				if (searchParams.get(key)) {
					newFilterObject[key] = searchParams.get(key);
				}
			}
			setFilters((prevState) => ({ ...prevState, ...newFilterObject }));
		} else {
			setFilters((prevState) => ({
				...prevState,
				...{
					page: 1,
					orderNumber: '',
					username: '',
					minDate: '',
					maxDate: '',
				},
			}));
		}
		setInitialParams(false);
	}, []);

	useEffect(() => {
		const getPurchaseOrders = async () => {
			if (!initialParams) {
				setLoading(true);
				const { purchaseOrders, totalPages } = await purchaseOrderService.getPurchaseOrders(
					filters
				);
				setTotalPages(totalPages);
				setPurchaseOrders(purchaseOrders);

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

				setLoading(false);
			}
		};
		getPurchaseOrders();
	}, [filters]);

	return (
		<div className='flex flex-wrap justify-center items-center gap-4'>
			<PurchaseOrderFilter filters={filters} setFilters={setFilters} />
			{loading ? (
				<div className='flex items-center justify-center h-[200px] w-[350px]'>
					<Loader />
				</div>
			) : (
				<>
					<div className='flex flex-col items-center justify-center gap-4'>
						<PurchaseOrderList purchaseOrderList={purchaseOrders} />
						{totalPages != 0 && (
							<PageSelectorComponent
								currentPage={filters.page}
								totalPages={totalPages}
								onPageChange={(page) => {
									setFilters((prevState) => ({
										...prevState,
										page: page,
									}));
								}}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export { PurchaseOrdersAdminComponent };
