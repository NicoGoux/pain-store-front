import React, { useState } from 'react';
import { Loader } from '../../../components/auxComponents/loader/Loader';
import { Outlet } from 'react-router';
import { useAuthService } from '../../../contexts/UserContext';
import { useCartService } from '../../../hooks/useCartService';
import { CartListComponent } from '../../../components/userComponents/cartComponents/CartListComponent';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Cart() {
	const { user } = useAuthService();

	const [productDetail, setProductDetail] = useState(null);

	const cartService = useCartService();

	return (
		<section onScroll={handleMainContainerScroll} className='relative main-container w-full'>
			<div className='user-section-card'>
				<div className='absolute w-4/5 h-4/5 bg-image-container -z-10' />
				<div className='flex flex-col gap-2 w-full h-fit items-center justify-center'>
					<div className='flex flex-col w-full items-center justify-center pb-10 border-b border-border-color'>
						<h2 className='text-5xl font-bold text-secondary-font-color pb-2'>
							Mi carrito
						</h2>
						<h3 className='text-3xl'>{user.username}</h3>
					</div>
					{cartService.loadingProductCart ? (
						<div className='flex items-center justify-center h-[200px]'>
							<Loader />
						</div>
					) : (
						<CartListComponent
							availableProducts={cartService.userProductCart.availableProductsOnCart}
							nonAvailableProducts={
								cartService.userProductCart.nonAvailableProductsOnCart
							}
							setProductDetail={setProductDetail}
							removeProductToCart={cartService.removeProductToCart}
						/>
					)}
				</div>
			</div>
			{!cartService.loadingProductCart && (
				<Outlet
					context={[
						productDetail,
						setProductDetail,
						cartService.userProductCart.availableProductsOnCart,
						null,
						cartService,
						'/account/cart',
					]}
				/>
			)}
		</section>
	);
}

export { Cart };
