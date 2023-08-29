import React, { useEffect, useState } from 'react';
import { Loader } from '../../../components/auxComponents/loader/Loader';
import { useParams } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { ProductListItem } from './ProductListItem';
import { useAuthService } from '../../../contexts/UserContext';
import { usePurchaseOrderService } from '../../../hooks/usePurchaseOrderService';
import { capitalize } from '../../../config/capitalize';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { purchaseOrderStatusStrings } from '../../../config/purchaseOrderStatusStrings';

function PurchaseOrderDetailComponent() {
	const { user } = useAuthService();

	const { id } = useParams();

	const purchaseOrderService = usePurchaseOrderService();

	const [loadingPurchaseOrder, setLoadingPurchaseOrder] = useState(true);

	const [updatingPurchaseOrder, setUpdatingPurchaseOrder] = useState(false);

	const [purchaseOrder, setPurchaseOrder] = useState();

	let date;

	if (purchaseOrder && purchaseOrder.createdAt) {
		date = new Date(purchaseOrder.createdAt);
	}

	const onClickCancelOrderButton = async () => {
		setUpdatingPurchaseOrder(true);
	};

	useEffect(() => {
		if (updatingPurchaseOrder) {
			setLoadingPurchaseOrder(true);
			const getPurchaseOrder = async () => {
				await purchaseOrderService.rejectPurchaseOrder(id);
				setPurchaseOrder(await purchaseOrderService.getPurchaseOrder(id));
				setLoadingPurchaseOrder(false);
				setUpdatingPurchaseOrder(false);
			};
			getPurchaseOrder();
		}
	}, [updatingPurchaseOrder]);

	useEffect(() => {
		const getPurchaseOrder = async () => {
			setPurchaseOrder(await purchaseOrderService.getPurchaseOrder(id));
			setLoadingPurchaseOrder(false);
		};
		getPurchaseOrder();
	}, []);

	useEffect(() => {
		console.log(purchaseOrder);
	}, [purchaseOrder]);

	return (
		<>
			{loadingPurchaseOrder ? (
				<div className='flex items-center justify-center h-[200px]'>
					<Loader />
				</div>
			) : (
				<>
					{!purchaseOrder ? (
						<div className='flex items-center justify-center h-[200px]'>
							<h3 className='text-xl'>No se pudo encontrar el pedido de compra</h3>
						</div>
					) : (
						<>
							<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
								<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
									<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
										Pedido N°: {purchaseOrder.orderNumber}
									</h2>
									<h3 className='text-3xl'>{user.username}</h3>
								</div>

								<div className='flex flex-wrap sm:flex-nowrap justify-center gap-6 p-4 h-full'>
									<div className='flex flex-col gap-6  justify-between w-full md:max-w-[400px] xsm:min-w-[250px] md:h-[40vh]'>
										<p className='flex gap-2 whitespace-nowrap w-full'>
											Nombre:
											<span className='text-secondary-font-color font-semibold'>
												{capitalize(purchaseOrder.firstName)}{' '}
												{capitalize(purchaseOrder.lastName)}
											</span>
										</p>
										<p className='flex gap-2 whitespace-nowrap w-full'>
											Método de pago:
											<span className='text-secondary-font-color font-semibold'>
												{capitalize(
													purchaseOrder.paymentMethodType
														.paymentMethodTypeString
												)}
											</span>
										</p>
										<p className='flex gap-2 w-full'>
											Trade link:
											<span className='text-secondary-font-color font-semibold'>
												<span className='break-all'>
													{purchaseOrder.tradeLink}
												</span>
											</span>
										</p>
										<p className='flex gap-2 w-full'>
											Precio total:
											<span className='text-secondary-font-color font-semibold'>
												<span className='break-all'>
													{ArsPriceFormat.format(
														purchaseOrder.totalPrice
													)}
												</span>
											</span>
										</p>

										<p className='flex gap-2 w-full'>
											Estado:
											<span className='text-secondary-font-color font-semibold'>
												<span className='break-all'>
													{capitalize(
														purchaseOrder.purchaseOrderStatus
															.purchaseOrderStatusString
													)}
												</span>
											</span>
										</p>
										{date && (
											<p className='flex gap-2 w-full'>
												Fecha:
												<span className='text-secondary-font-color font-semibold'>
													<span className='break-all'>{`${date.getUTCDate()}/${date.getUTCMonth()}/${date.getUTCFullYear()}`}</span>
												</span>
											</p>
										)}
									</div>
									<div className='flex flex-col items-center gap-2 h-full w-full md:max-w-[400px] xsm:min-w-[250px] xsm:max-h-[40vh]'>
										<p className='flex gap-2 whitespace-nowrap w-full'>
											Productos:
										</p>
										<div className='flex flex-col gap-4 h-fit pr-2 xsm:overflow-y-auto xsm:scroll'>
											{purchaseOrder.products.map((product) => (
												<ProductListItem
													key={product._id}
													product={product}
												/>
											))}
										</div>
									</div>
								</div>
							</div>
							{purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString !=
								purchaseOrderStatusStrings.COMPLETADO &&
								purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString !=
									purchaseOrderStatusStrings.CANCELADO && (
									<div className='flex flex-wrap items-center justify-center w-full px-12 gap-x-12 gap-y-2'>
										<button
											type='button'
											className='secondary-button flex items-center w-fit h-12'
											onClick={onClickCancelOrderButton}
										>
											CANCELAR PEDIDO
											<XMarkIcon className='w-8 text-error-color' />
										</button>
									</div>
								)}
						</>
					)}
				</>
			)}
		</>
	);
}

export { PurchaseOrderDetailComponent };
