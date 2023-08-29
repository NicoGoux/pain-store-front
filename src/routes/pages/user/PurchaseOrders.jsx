import React, { useEffect, useState } from 'react';
import { usePurchaseOrderService } from '../../../hooks/usePurchaseOrderService';
import { useAuthService } from '../../../contexts/UserContext';
import { Loader } from '../../../components/auxComponents/loader/Loader';
import { PurchaseOrderList } from '../../../components/purchaseOrderComponents/purchaseOrderListComponents/PurchaseOrderList';

function PurchaseOrders() {
	const { user } = useAuthService();

	const purchaseOrderService = usePurchaseOrderService();

	const [userPurchaseOrders, setUserPurchaseOrders] = useState([]);

	const [loading, setLoading] = useState([true]);

	useEffect(() => {
		const getUserPurchaseOrders = async () => {
			setUserPurchaseOrders(await purchaseOrderService.getUserPurchaseOrders());
			setLoading(false);
		};
		getUserPurchaseOrders();
	}, []);

	// TODO ordener por fecha
	return (
		<section className='relative main-container w-full'>
			<div className='user-section-card'>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
						<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
							Mis pedidos
						</h2>
						<h3 className='text-3xl'>{user.username}</h3>
					</div>
					{loading ? (
						<div className='flex items-center justify-center h-[200px]'>
							<Loader />
						</div>
					) : (
						<PurchaseOrderList purchaseOrderList={userPurchaseOrders} />
					)}
				</div>
			</div>
		</section>
	);
}

export { PurchaseOrders };
