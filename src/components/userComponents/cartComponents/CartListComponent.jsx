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

	const onClickBuyButton = () => {
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
					<div className='flex flex-col gap-4 h-fit my-4 px-1 xsm:px-4 xsm:h-[35vh] xsm:overflow-y-auto xsm:scroll'>
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
					<div className='flex flex-wrap items-center justify-center w-full px-12 gap-x-12 gap-y-2'>
						<h3 className='text-xl xsm:text-3xl text-secondary-font-color w-fit'>
							Total: {ArsPriceFormat.format(total)}
						</h3>
						<button
							type='button'
							className='primary-button w-44 h-12'
							onClick={onClickBuyButton}
						>
							COMPRAR
						</button>
					</div>
				</>
			)}
		</>
	);
}

export { CartListComponent };
