import React, { useEffect, useState } from 'react';
import { Loader } from '../../../components/auxComponents/loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';
import {
	ArrowLeftIcon,
	ArrowLeftOnRectangleIcon,
	CheckIcon,
	ClockIcon,
	XMarkIcon,
} from '@heroicons/react/20/solid';
import { ProductListItem } from './ProductListItem';
import { useAuthService } from '../../../contexts/UserContext';
import { usePurchaseOrderService } from '../../../hooks/usePurchaseOrderService';
import { capitalize } from '../../../config/capitalize';
import { ArsPriceFormat } from '../../../config/priceFormat';
import { purchaseOrderStatusStrings } from '../../../config/purchaseOrderStatusStrings';
import { ConfirmationModal } from '../../auxComponents/confirmationModal/ConfirmationModal';

function PurchaseOrderDetailComponent() {
	const { user, isAdmin } = useAuthService();

	const { id } = useParams();

	const navigate = useNavigate();

	const purchaseOrderService = usePurchaseOrderService();

	const [confirmationModal, setConfirmationModal] = useState({
		open: false,
		showText: '',
		onConfirmExecute: () => {},
	});

	const [loadingPurchaseOrder, setLoadingPurchaseOrder] = useState(true);

	const [updatingPurchaseOrder, setUpdatingPurchaseOrder] = useState(false);

	const [purchaseOrder, setPurchaseOrder] = useState();

	let date;

	if (purchaseOrder && purchaseOrder.createdAt) {
		date = new Date(purchaseOrder.createdAt);
	}

	const onClickCancelOrderButton = async () => {
		const onConfirmExecute = async () => {
			setUpdatingPurchaseOrder(true);
			isAdmin()
				? await purchaseOrderService.changeOrderStatus(
						id,
						purchaseOrderStatusStrings.CANCELADO
				  )
				: await purchaseOrderService.rejectPurchaseOrder(id);

			setPurchaseOrder(await purchaseOrderService.getPurchaseOrder(id));
			setUpdatingPurchaseOrder(false);
		};

		setConfirmationModal({
			open: true,
			showText: `Esta acción es irreversible, ¿Seguro que desea cancelar el pedido?`,
			onConfirmExecute: onConfirmExecute,
		});
	};

	const onClickChangePendingStatusButton = async () => {
		const operation =
			purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString ===
			purchaseOrderStatusStrings.PENDPAGO
				? purchaseOrderStatusStrings.PENDENVIO
				: purchaseOrderStatusStrings.PENDPAGO;

		const onConfirmExecute = async () => {
			setUpdatingPurchaseOrder(true);
			await purchaseOrderService.changeOrderStatus(id, operation);
			setPurchaseOrder(await purchaseOrderService.getPurchaseOrder(id));
			setUpdatingPurchaseOrder(false);
		};

		setConfirmationModal({
			open: true,
			showText: `¿Seguro que desea realizar el cambiar el estado a ${operation}?`,
			onConfirmExecute: onConfirmExecute,
		});
	};

	const onClickCompleteOrderButton = async () => {
		const onConfirmExecute = async () => {
			setUpdatingPurchaseOrder(true);
			await purchaseOrderService.changeOrderStatus(id, purchaseOrderStatusStrings.COMPLETADO);
			setPurchaseOrder(await purchaseOrderService.getPurchaseOrder(id));
			setUpdatingPurchaseOrder(false);
		};

		setConfirmationModal({
			open: true,
			showText: `Esta acción es irreversible, ¿Seguro que desea completar el pedido?`,
			onConfirmExecute: onConfirmExecute,
		});
	};

	const onClickConfirmButton = () => {
		setConfirmationModal((prevState) => ({
			open: false,
			showText: '',
			onConfirmExecute: () => {},
		}));
		confirmationModal.onConfirmExecute();
	};

	useEffect(() => {
		if (loadingPurchaseOrder) {
			const getPurchaseOrder = async () => {
				setPurchaseOrder(await purchaseOrderService.getPurchaseOrder(id));
				setLoadingPurchaseOrder(false);
			};
			getPurchaseOrder();
		}
	}, []);

	return (
		<>
			{loadingPurchaseOrder || updatingPurchaseOrder ? (
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
								<div className='relative flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
									<button
										className='secondary-button absolute left-4'
										onClick={() => {
											navigate(-1);
										}}
									>
										<ArrowLeftIcon className='w-8' />
									</button>
									<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
										Pedido N°: {purchaseOrder.orderNumber}
									</h2>
									{isAdmin() ? (
										<></>
									) : (
										<h3 className='text-3xl'>{user.username}</h3>
									)}
								</div>

								{isAdmin() && (
									<div className='flex flex-col w-full p-4 pb-8 border-b border-border-color'>
										<h3 className='text-2xl font-bold text-secondary-font-color pb-6'>
											Detalles del cliente:
										</h3>
										<div className='flex flex-col gap-6 justify-between w-full md:max-w-[400px] xsm:min-w-[250px]'>
											<p className='flex gap-2 whitespace-nowrap w-full'>
												Nombre:
												<span className='text-secondary-font-color font-semibold'>
													{capitalize(purchaseOrder.user.firstName)}{' '}
													{capitalize(purchaseOrder.user.lastName)}
												</span>
											</p>
											<p className='flex gap-2 whitespace-nowrap w-full'>
												Username:
												<span className='text-secondary-font-color font-semibold'>
													{capitalize(purchaseOrder.user.username)}
												</span>
											</p>
											<p className='flex gap-2 w-full'>
												Email:
												<span className='text-secondary-font-color font-semibold'>
													<span className='break-all'>
														{purchaseOrder.user.email}
													</span>
												</span>
											</p>
										</div>
									</div>
								)}

								<div className='flex flex-col w-full p-4'>
									<h3 className='text-2xl font-bold text-secondary-font-color pb-6'>
										Detalles del pedido:
									</h3>
									<div className='flex flex-wrap sm:flex-nowrap justify-between gap-6 h-full'>
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
							</div>
							{purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString !=
								purchaseOrderStatusStrings.COMPLETADO &&
								purchaseOrder.purchaseOrderStatus.purchaseOrderStatusString !=
									purchaseOrderStatusStrings.CANCELADO && (
									<div className='flex pb-4'>
										<div className='flex flex-wrap items-center justify-center w-full px-12 gap-x-12 gap-y-4 pt-6'>
											<button
												type='button'
												className='secondary-button flex items-center w-fit h-fit'
												onClick={onClickCancelOrderButton}
											>
												CANCELAR PEDIDO
												<XMarkIcon className='w-8 text-error-color' />
											</button>
											{isAdmin() ? (
												<>
													{purchaseOrder.purchaseOrderStatus
														.purchaseOrderStatusString ===
													purchaseOrderStatusStrings.PENDPAGO ? (
														<button
															type='button'
															className='secondary-button flex items-center w-fit h-fit'
															onClick={
																onClickChangePendingStatusButton
															}
														>
															MARCAR PENDIENTE DE ENVÍO
															<ClockIcon className='ml-2 w-8 text-secondary-font-color' />
														</button>
													) : (
														<button
															type='button'
															className='secondary-button flex items-center w-fit h-fit'
															onClick={
																onClickChangePendingStatusButton
															}
														>
															MARCAR PENDIENTE DE PAGO
															<ClockIcon className='ml-2 w-8 text-secondary-font-color' />
														</button>
													)}
													<button
														type='button'
														className='secondary-button flex items-center w-fit h-fit'
														onClick={onClickCompleteOrderButton}
													>
														COMPLETAR PEDIDO
														<CheckIcon className='ml-2 w-8 text-correct-color' />
													</button>
												</>
											) : (
												<></>
											)}
										</div>
									</div>
								)}
						</>
					)}
				</>
			)}
			{confirmationModal.open && (
				<ConfirmationModal
					setOpenConfirmationModal={(state) => {
						setConfirmationModal((prevState) => ({
							open: state,
							showText: '',
							onConfirmExecute: () => {},
						}));
					}}
				>
					<h2 className='text-2xl pb-2'>{confirmationModal.showText}</h2>
					<div className='flex flex-wrap justify-center gap-4 w-full'>
						<button
							className='secondary-button w-36 h-12'
							onClick={() => {
								setConfirmationModal((prevState) => ({
									open: false,
									showText: '',
									onConfirmExecute: () => {},
								}));
							}}
						>
							CANCELAR
						</button>
						<button className='primary-button w-36 h-12' onClick={onClickConfirmButton}>
							CONFIRMAR
						</button>
					</div>
				</ConfirmationModal>
			)}
		</>
	);
}

export { PurchaseOrderDetailComponent };
