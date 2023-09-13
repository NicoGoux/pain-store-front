import React, { useEffect, useState } from 'react';
import { usePurchaseOrderService } from '../../hooks/usePurchaseOrderService';
import { productStatusStrings } from '../../config/productStatusStrings';

function AssociatedOrderComponent({ productDetail }) {
	const purchaseOrderService = usePurchaseOrderService();

	const [purchaseOrder, setPurchaseOrder] = useState();

	useEffect(() => {
		if (productDetail.productStatus.productStatusString != productStatusStrings.DISPONIBLE) {
			const getPurchaseOrderByProduct = async () => {
				setPurchaseOrder(
					await purchaseOrderService.getPurchaseOrderByProduct(productDetail._id)
				);
			};
			getPurchaseOrderByProduct();
		}
	}, []);

	return (
		<>
			{purchaseOrder ? (
				<div className='flex items-center gap-1 flex-wrap w-fit xsm:flex-nowrap xsm:gap-6'>
					<label htmlFor='productStatus' className='label whitespace-nowrap'>
						Pedido N°:
					</label>
					{purchaseOrder.orderNumber}
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export { AssociatedOrderComponent };
