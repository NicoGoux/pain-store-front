import React, { useEffect, useState } from 'react';
import { usePurchaseOrderService } from '../../../hooks/usePurchaseOrderService';
import { useAuthService } from '../../../contexts/UserContext';
import { Loader } from '../../../components/loader/Loader';

function PurchaseOrderDetail() {
	const { user } = useAuthService();

	const purchaseOrderService = usePurchaseOrderService();

	const [loadingPurchaseOrder, setLoadingPurchaseOrder] = useState([true]);

	const [purchaseOrder, setPurchaseOrder] = useState();

	useEffect(() => {
		const getUserPurchaseOrders = async () => {
			setUserPurchaseOrders(await purchaseOrderService.getUserPurchaseOrders());
			setLoading(false);
		};
		getUserPurchaseOrders();
	}, []);

	return (
		<section className='relative main-container w-full'>
			<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-fit border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold '>
				{loading && (
					<div className='absolute bg-card-background-color bg-opacity-70 rounded-xl flex w-full h-full z-40'>
						<Loader />
					</div>
				)}
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
						<p className='text-2xl font-bold text-center'>
							Complete sus{' '}
							<span className='text-secondary-font-color secondary-text-shadow font-extrabold'>
								datos
							</span>
						</p>
					</div>
					<div className='flex flex-col items-center'>
						<div className='flex flex-wrap gap-12 justify-center px-4 w-fit md:flex-nowrap'>
							<div className='flex flex-col items-center justify-between gap-2 h-[300px] w-full xsm:min-w-[350px]'>
								<div className='w-full space-y-2'>
									<label htmlFor='firstName' className='label w-full'>
										Nombre
									</label>
								</div>
								<div className='w-full space-y-2'>
									<label htmlFor='lastName' className='label w-full mt-6'>
										Apellido
									</label>
								</div>
								<div className='w-full space-y-2'>
									<label htmlFor='tradeLink' className='label w-full mt-6'>
										Trade link
									</label>
								</div>
							</div>
							<div className='flex flex-col gap-6 justify-between min-h-[360px] h-fit w-full xsm:min-w-[350px]'>
								<label htmlFor='paymentMethodType' className='label w-full'>
									Seleccione un medio de pago
								</label>
								<h3 className='text-xl xsm:text-3xl mb-2 text-secondary-font-color w-fit whitespace-nowrap'>
									Total: {ArsPriceFormat.format(totalPrice)}
								</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
			{openConfirmationModal && (
				<ConfirmationModal setOpenConfirmationModal={setOpenConfirmationModal}>
					<h2 className='text-2xl pb-2'>¿Seguro que desea realizar el pedido?</h2>
					<div className='flex flex-wrap justify-center gap-4 w-full'>
						<button
							className='secondary-button w-36 h-12'
							onClick={() => {
								setOpenConfirmationModal(false);
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
		</section>
	);
	// <section className='relative main-container w-full'>
	// 	<div className='card relative flex flex-col justify-center items-center m-auto py-4 xsm:py-8 h-fit w-[600px]  border-0 bg-background-color z-0 text-lg xsm:border-2 md:text-xl font-semibold'>
	// 		<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
	// 		<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
	// 			<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
	// 				<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
	// 					Mis pedidos
	// 				</h2>
	// 				<h3 className='text-3xl'>{user.username}</h3>
	// 			</div>
	// 			{loading ? (
	// 				<div className='flex items-center justify-center h-[200px]'>
	// 					<Loader />
	// 				</div>
	// 			) : (
	// 				<></>
	// 			)}
	// 		</div>
	// 	</div>
	// </section>
}

export { PurchaseOrderDetail };
