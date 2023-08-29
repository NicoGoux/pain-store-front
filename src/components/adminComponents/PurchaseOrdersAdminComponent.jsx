import React, { useEffect, useState } from 'react';
import { PurchaseOrderList } from '../purchaseOrderComponents/purchaseOrderListComponents/PurchaseOrderList';
import { useAuthService } from '../../contexts/UserContext';
import { usePurchaseOrderService } from '../../hooks/usePurchaseOrderService';
import { Loader } from '../auxComponents/loader/Loader';

function PurchaseOrdersAdminComponent() {
	const { user } = useAuthService();

	const purchaseOrderService = usePurchaseOrderService();

	const [purchaseOrders, setPurchaseOrders] = useState([]);

	const [loading, setLoading] = useState([true]);

	useEffect(() => {
		const getPurchaseOrders = async () => {
			setPurchaseOrders(await purchaseOrderService.getPurchaseOrders());
			setLoading(false);
		};
		getPurchaseOrders();
	}, []);

	return (
		<>
			{/* TODO filter */}
			{loading ? (
				<div className='flex items-center justify-center h-[200px]'>
					<Loader />
				</div>
			) : (
				<PurchaseOrderList purchaseOrderList={purchaseOrders} />
			)}
		</>
	);
}

export { PurchaseOrdersAdminComponent };
