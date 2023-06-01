import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { productStatusStrings } from '../../../config/productStatusStrings';
import { useNavigate, useOutletContext, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { ProductDetailUser } from '../../../components/store/ProductGrid/productDetail/productDetailUser';
import { useAuthService } from '../../../contexts/UserContext';
import { ProductDetailAdmin } from '../../../components/store/ProductGrid/productDetail/productDetailAdmin';

function ProductDetailContainer() {
	const [productDetail, setProductDetail, products, navigateClose] = useOutletContext();
	const [searchParams] = useSearchParams();
	const { id } = useParams();
	const navigate = useNavigate();
	const auth = useAuthService();

	let product = productDetail;

	useEffect(() => {
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
	}, []);

	const closeModal = () => {
		setProductDetail(null);
		navigate({ pathname: navigateClose, search: searchParams.toString() });
	};

	return (
		<>
			{product ? (
				<>
					<Transition appear show={true} as={Fragment}>
						<Dialog as='div' className='z-10' onClose={closeModal}>
							<div className='fixed top-0 flex items-center justify-center w-full min-h-fit h-full z-50'>
								<div className='fixed inset-0 bg-background-color opacity-60 w-full h-full overflow-y-auto scroll' />
								<div className='fixed inset-0 overflow-y-auto scroll'>
									<div className='flex min-h-full items-center justify-center xsm:p-4 text-center'>
										<Transition.Child
											as={Fragment}
											enter='ease-out duration-300'
											enterFrom='opacity-0 scale-95'
											enterTo='opacity-100 scale-100'
											leave='ease-in duration-200'
											leaveFrom='opacity-100 scale-100'
											leaveTo='opacity-0 scale-95'
										>
											<Dialog.Panel
												className='relative flex flex-col gap-4 h-full items-center justify-center w-full max-w-fit 
                                                transform overflow-hidden rounded-2xl border-y-2 xsm:border-2 border-border-color 
                                                bg-background-color p-12 shadow-2xl transition-all text-lg text-secondary-font-color
												overflow-y-auto scroll'
											>
												{auth.user && auth.isAdmin() ? (
													<ProductDetailAdmin
														productDetail={product}
														setProductDetail={setProductDetail}
														closeModal={closeModal}
													/>
												) : (
													<ProductDetailUser
														productDetail={product}
														setProductDetail={setProductDetail}
														closeModal={closeModal}
													/>
												)}
											</Dialog.Panel>
										</Transition.Child>
									</div>
								</div>
							</div>
						</Dialog>
					</Transition>
				</>
			) : (
				<></>
			)}
		</>
	);
}

export { ProductDetailContainer };
