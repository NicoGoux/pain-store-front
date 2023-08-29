import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { Loader } from '../../auxComponents/loader/Loader';
import { Outlet } from 'react-router-dom';
import { useCartService } from '../../../hooks/useCartService';
import { useProductService } from '../../../hooks/useProductService';

function ProductGrid({ filters, searching, setSearching }) {
	const [productDetail, setProductDetail] = useState(null);

	const [loading, setLoading] = useState(true);

	const productService = useProductService();

	const cartService = useCartService();

	useEffect(() => {
		setLoading(true);
		if (!productService.loadingProductList) {
			setSearching(false);
			setLoading(false);
		}
	}, [productService.loadingProductList]);

	useEffect(() => {
		if (searching != false) {
			productService.getProductList(filters);
		}
	}, [searching]);

	return (
		<>
			{loading ? (
				<div className='flex items-center justify-center w-full h-full'>
					<Loader />
				</div>
			) : (
				<section
					id='productGridSection'
					className='grid justify-center gap-x-8 gap-y-12 xsm:grid-cols-2 xl:grid-cols-4 h-fit px-2 w-full md:w-5/6 md:px-0 md:pr-6'
				>
					{productService.productList.map((product) => {
						return (
							<ProductCard
								key={product._id}
								product={product}
								setProductDetail={setProductDetail}
							/>
						);
					})}
					<Outlet
						context={[
							productDetail,
							setProductDetail,
							productService.productList,
							productService,
							cartService,
							'/store',
						]}
					/>
				</section>
			)}
		</>
	);
}

export { ProductGrid };
