import React, { useEffect, useState } from 'react';
import { PaymentMethodTypeSelector } from '../auxComponents/comboBoxes/PaymentMethodTypeSelector';
import { usePaymentMethodService } from '../../hooks/usePaymentMethodService';
import { PaymentMethodList } from './paymentMethodComponents/PaymentMethodList';
import { paymentMethodTypeStrings } from '../../config/paymentMethodTypeStrings';
import { AddPaymentMethodModal } from './paymentMethodComponents/AddPaymentMethodModal';

function PaymentMethodManagementComponent() {
	const paymentMethodService = usePaymentMethodService();

	const [paymentMethodType, setPaymentMethodType] = useState('');

	const [paymentMethods, setPaymentMethods] = useState([]);

	const [loading, setLoading] = useState(true);

	const [updating, setUpdating] = useState(false);

	const [openAddPaymentMethodModal, setOpenAddPaymentMethodModal] = useState();

	useEffect(() => {
		setLoading(true);
		const getPaymentMethods = async () => {
			setPaymentMethods(await paymentMethodService.getPaymentMethods(paymentMethodType));
			setUpdating(false);
			setLoading(false);
			setUpdating(false);
		};
		getPaymentMethods();
	}, [paymentMethodType, updating]);

	return (
		<>
			<div className='flex flex-col justify-center items-center gap-4'>
				<div className='relative w-full max-w-[400px] flex items-center text-primary-button-font-color'>
					<PaymentMethodTypeSelector
						defaultValue={''}
						onChange={(event) => {
							setPaymentMethodType(event.target.value);
						}}
					/>
				</div>
				<PaymentMethodList
					paymentMethods={paymentMethods}
					loading={loading}
					paymentMethodService={paymentMethodService}
					setUpdating={setUpdating}
				/>
				{paymentMethodType != '' &&
					paymentMethodType != paymentMethodTypeStrings.OTROS_MEDIOS.name && (
						<button className='primary-button' onClick={setOpenAddPaymentMethodModal}>
							AÑADIR MÉTODO POR {paymentMethodType}
						</button>
					)}
			</div>
			{openAddPaymentMethodModal && (
				<AddPaymentMethodModal
					setOpenAddPaymentMethodModal={setOpenAddPaymentMethodModal}
					paymentMethodType={paymentMethodTypeStrings[paymentMethodType]}
					paymentMethodService={paymentMethodService}
					setUpdating={setUpdating}
				/>
			)}
		</>
	);
}

export { PaymentMethodManagementComponent };
