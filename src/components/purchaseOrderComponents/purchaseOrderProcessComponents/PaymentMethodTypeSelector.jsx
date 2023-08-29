import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { capitalize } from '../../../config/capitalize';

function PaymentMethodTypeSelector({ selected, setValues, availablePaymentMethodTypes }) {
	return (
		<RadioGroup
			value={selected}
			onChange={setValues}
			className='flex flex-col justify-center items-center'
		>
			<RadioGroup.Label className='label w-full'>
				Seleccione un método de pago
			</RadioGroup.Label>
			<div className='flex flex-col w-full max-w-sm gap-4 '>
				{availablePaymentMethodTypes.map((paymentMethodType) => (
					<RadioGroup.Option
						key={paymentMethodType._id}
						value={paymentMethodType}
						className={({ active, checked }) =>
							`flex items-center text-secondary-font-color w-full bg-card-background-color bg-opacity-70 
													 rounded-lg cursor-pointer px-5 py-4 mt-2 shadow-md focus:outline-none border border-border-color
													 ${checked ? 'shadow-md shadow-secondary-font-color' : ''}`
						}
					>
						{({ active, checked }) => (
							<div className='flex flex-col'>
								<div className='flex w-full justify-between'>
									<div className='flex items-center'>
										<div className='w-full'>
											<RadioGroup.Label as='p' className='text-lg'>
												{capitalize(
													paymentMethodType.paymentMethodTypeString
												)}
											</RadioGroup.Label>
										</div>
									</div>
									{checked && <CheckCircleIcon className='w-10' />}
								</div>

								{checked && (
									<p className='text-base text-primary-font-color w-full'>
										{paymentMethodType.paymentMethodTypeInfo}
									</p>
								)}
							</div>
						)}
					</RadioGroup.Option>
				))}
			</div>
		</RadioGroup>
	);
}

export { PaymentMethodTypeSelector };
