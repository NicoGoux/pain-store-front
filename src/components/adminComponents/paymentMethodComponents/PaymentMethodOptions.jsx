import React, { Fragment, useState } from 'react';
import { ChevronDownIcon, ChevronLeftIcon } from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';

function PaymentMethodOptions({ paymentMethod, paymentMethodService, setUpdating }) {
	const [dropDownOpen, setDropDownOpen] = useState(false);

	const onClickToggleActiveMethod = async () => {
		const confirmed = confirm(
			`¿Desea ${paymentMethod.isActive ? 'deshabilitar' : 'habilitar'} la opción de pago?`
		);
		if (confirmed) {
			setUpdating(true);
			await paymentMethodService.toggleIsActivePaymentMethod(paymentMethod._id);
		}
	};

	const onClickRemoveMethod = async () => {
		const confirmed = confirm('¿Desea eliminar el método de pago?');
		if (confirmed) {
			setUpdating(true);
			await paymentMethodService.deletePaymentMethod(paymentMethod._id);
		}
	};

	return (
		<Menu as='div'>
			<div>
				<Menu.Button className='absolute right-2 top-3'>
					<ChevronDownIcon
						className='w-8 text-primary-button-bg-color cursor-pointer'
						onClick={() => setDropDownOpen(false)}
					/>
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-4 mt-8 w-fit origin-top-right rounded-md bg-background-color shadow-xl shadow-background-color ring-1 ring-border-color z-50 focus: outline-none'>
					<div className='p-1 text-base text-secondary-font-color'>
						<Menu.Item className='border-b border-border-color'>
							{paymentMethod.isActive ? (
								<button
									className='w-full py-2 hover:underline cursor-pointer'
									onClick={onClickToggleActiveMethod}
								>
									Deshabilitar opción
								</button>
							) : (
								<button
									className='w-full py-2 hover:underline cursor-pointer'
									onClick={onClickToggleActiveMethod}
								>
									Habilitar opción
								</button>
							)}
						</Menu.Item>
						<Menu.Item>
							<button
								className='w-full py-2 hover:underline cursor-pointer'
								onClick={onClickRemoveMethod}
							>
								Eliminar opción
							</button>
						</Menu.Item>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export { PaymentMethodOptions };
