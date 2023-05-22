import React, { useEffect, useState } from 'react';
import { ProductCard } from './ProductCard';
import { ProductDetail } from './ProductDetail';
import { useGetProducts } from '../../../hooks/useGetProducts';
import { useGetProductCart } from '../../../hooks/useGetProductCart';
import { Loader } from '../../loader/Loader';

function ProductGrid() {
	const [openDetail, setOpenDetail] = useState(false);
	const [productDetail, setProductDetail] = useState(null);

	const [loading, setLoading] = useState(true);

	const { products, loadingProducts } = useGetProducts();

	useEffect(() => {
		if (!loadingProducts) {
			setLoading(false);
		}
	}, [loadingProducts]);

	return (
		<>
			{loading ? (
				<div className='flex items-center justify-center w-full h-full'>
					<Loader />
				</div>
			) : (
				<section
					id='productGridSection'
					className='grid gap-x-8 gap-y-12 xsm:grid-cols-2 xl:grid-cols-4 h-fit px-2 w-full md:w-5/6 md:px-0 md:pr-6'
				>
					{products.map((product) => {
						return (
							<ProductCard
								key={product._id}
								product={product}
								setOpenDetail={setOpenDetail}
								setProductDetail={setProductDetail}
							/>
						);
					})}
					{productDetail != null && openDetail && (
						<ProductDetail
							productDetail={productDetail}
							openDetail={openDetail}
							setOpenDetail={setOpenDetail}
						/>
					)}
				</section>
			)}
		</>
	);
}

export { ProductGrid };
