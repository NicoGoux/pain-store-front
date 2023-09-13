import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AvailableProductItem } from './AvailableProductItem';
import { NonAvailableProductItem } from './NonAvailableProductItem';
import { ArsPriceFormat } from '../../../config/priceFormat';

function CartListComponent({
	availableProducts,
	nonAvailableProducts,
	setProductDetail,
	removeProductToCart,
}) {
	if (availableProducts) {
		availableProducts.sort(sortProducts);
	}
	if (nonAvailableProducts) {
		nonAvailableProducts.sort(sortProducts);
	}

	const [total, setTotal] = useState(0);

	const navigate = useNavigate();

	const onClickProductRow = (product) => {
		setProductDetail(product);
		navigate({
			pathname: `/account/cart/${product._id.toString()}`,
		});
	};

	const onClickRemoveButton = (product) => {
		removeProductToCart(product);
	};

	const onClickOrderButton = () => {
		navigate('/preorder', {
			state: {
				productList: [...availableProducts],
				isCart: true,
			},
		});
	};

	useEffect(() => {
		let totalPrice = 0;
		availableProducts.forEach((productInCart) => {
			totalPrice += productInCart.price;
		});
		setTotal(totalPrice);
	}, [availableProducts]);

	return (
		<>
			{availableProducts.length === 0 && nonAvailableProducts.length === 0 ? (
				<div className='flex items-center justify-center h-24'>
					<h3 className='text-xl'>No se encuentran productos en el carrito</h3>
				</div>
			) : (
				<>
					<div className='flex flex-col gap-4 h-fit mt-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
						{availableProducts.map((productInCart) => (
							<AvailableProductItem
								key={productInCart._id}
								productInCart={productInCart}
								onClickProductRow={onClickProductRow}
								onClickRemoveButton={onClickRemoveButton}
							/>
						))}
						{nonAvailableProducts.map((productInCart) => (
							<NonAvailableProductItem
								key={productInCart._id}
								productInCart={productInCart}
								onClickProductRow={onClickProductRow}
								onClickRemoveButton={onClickRemoveButton}
							/>
						))}
					</div>
					<div className='flex flex-col items-center justify-center w-full px-12 gap-y-6'>
						<h3 className='text-xl xsm:text-3xl text-secondary-font-color w-fit'>
							Total: {ArsPriceFormat.format(total)}
						</h3>
						<button
							type='button'
							className='primary-button w-44 h-12'
							onClick={onClickOrderButton}
						>
							REALIZAR PEDIDO
						</button>
					</div>
				</>
			)}
		</>
	);
}

function sortProducts(p1, p2) {
	const p1_id = p1._id.toUpperCase();
	const p2_id = p2._id.toUpperCase();

	if (p1_id < p2_id) {
		return -1;
	}
	if (p1_id > p2_id) {
		return 1;
	}
	return 0;
}

export { CartListComponent };
