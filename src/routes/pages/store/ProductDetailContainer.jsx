import React from 'react';
import { productStatusStrings } from '../../../config/productStatusStrings';
import { ProductDetail } from '../../../components/store/ProductGrid/ProductDetail';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ProductDetailContainer() {
	const [productDetail, setProductDetail, products] = useOutletContext();
	const { id } = useParams();
	const navigate = useNavigate();

	console.log(id);

	let product = productDetail;

	if (!productDetail) {
		product = products.find(
			(pr) =>
				pr._id.toString() == id &&
				pr.productStatus.productStatusString == productStatusStrings.DISPONIBLE
		);
		if (!product) {
			toast.error('Producto no disponible');
			navigate('/store');
		}
	}

	return (
		<>
			{product ? (
				<div>
					<ProductDetail productDetail={product} setProductDetail={setProductDetail} />
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export { ProductDetailContainer };
