import React, { useEffect, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { usePaymentMethodService } from '../../../hooks/usePaymentMethodService';

function PaymentMethodTypeSelector({ defaultValue, onChange, enabled }) {
	const paymentMethodService = usePaymentMethodService();

	const [loading, setLoading] = useState(true);

	const [paymentMethodTypes, setPaymentMethodTypes] = useState([null]);

	useEffect(() => {
		const getAvailablePaymentMethodTypes = async () => {
			setPaymentMethodTypes(await paymentMethodService.getPaymentMethodTypes());
			setLoading(false);
		};
		getAvailablePaymentMethodTypes();
	}, []);

	return (
		<>
			<ChevronDownIcon className='absolute right-0 w-6' focusable={false} />
			<select
				name='paymentMethodType'
				id='paymentMethodType'
				disabled={enabled}
				defaultValue={defaultValue}
				className='flex items-center secondary-input text-center h-fit w-full px-2 py-1 appearance-none'
				onChange={onChange}
			>
				<option value={''}>Método de pago</option>
				{!loading &&
					paymentMethodTypes.map((paymentMethodType) => (
						<option
							key={paymentMethodType._id}
							value={paymentMethodType.paymentMethodTypeString}
						>
							{paymentMethodType.paymentMethodTypeString}
						</option>
					))}
			</select>
		</>
	);
}

export { PaymentMethodTypeSelector };
