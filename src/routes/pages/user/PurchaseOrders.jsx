import React, { useEffect, useState } from 'react';
import { usePurchaseOrderService } from '../../../hooks/usePurchaseOrderService';
import { useAuthService } from '../../../contexts/UserContext';
import { Loader } from '../../../components/loader/Loader';
import { PurchaseOrderItem } from '../../../components/purchaseOrderItem/PurchaseOrderItem';
import { useMediaQuery } from '../../../hooks/useMediaQuerys';
import tailwindConfig from '../../../../tailwind.config';

function PurchaseOrders() {
	const { user } = useAuthService();

	const purchaseOrderService = usePurchaseOrderService();

	const matches = useMediaQuery(tailwindConfig.theme.screens.xsm);

	const [userPurchaseOrders, setUserPurchaseOrders] = useState([]);

	const [loading, setLoading] = useState([true]);

	useEffect(() => {
		const getUserPurchaseOrders = async () => {
			setUserPurchaseOrders(await purchaseOrderService.getUserPurchaseOrders());
			setLoading(false);
		};
		getUserPurchaseOrders();
	}, []);

	let purchaseOrderElement = 0;

	// TODO generalizar desde el section hasta el loader (en lo posible) dentro de un componente
	// TODO error desconocido al realizar un pedido
	// TODO ordener por fecha
	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-[600px]  border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold'>
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
						<div className='flex w-full h-full items-center justify-center pt-4'>
							{userPurchaseOrders.length === 0 ? (
								<div className='flex items-center justify-center h-24'>
									<h3 className='text-xl'>
										No se encuentran pedidos de compra del usuario
									</h3>
								</div>
							) : (
								<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
									<table className='text-base text-center text-secondary-font-color'>
										<thead className='sticky top-0'>
											<tr className='bg-card-background-color'>
												<th className='py-4 px-4'>N°</th>
												<th className='py-4 px-4'>Precio</th>
												<th className='py-4 px-4'>Estado</th>
												{!matches && <th className='py-4 px-4'>Fecha</th>}
											</tr>
										</thead>
										<tbody>
											{userPurchaseOrders.map((purchaseOrder) => {
												purchaseOrderElement++;
												return (
													<PurchaseOrderItem
														key={purchaseOrder._id}
														purchaseOrder={purchaseOrder}
														matches={matches}
														purchaseOrderElement={purchaseOrderElement}
													/>
												);
											})}
										</tbody>
									</table>
								</div>

								// <>
								// 	<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
								// 		{userPurchaseOrders.map((purchaseOrder) => (
								// 			<PurchaseOrderItem
								// 				key={purchaseOrder._id}
								// 				purchaseOrder={purchaseOrder}
								// 			/>
								// 		))}
								// 	</div>
								// </>
							)}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}

export { PurchaseOrders };
