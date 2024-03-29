import React, { Fragment, useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ClipboardDocumentCheckIcon,
	CreditCardIcon,
	PlusCircleIcon,
	UserCircleIcon,
} from '@heroicons/react/20/solid';
import { useHref } from 'react-router-dom';
import { MenuItem } from './MenuItem';

const routes = [
	{
		text: 'Agregar producto',
		route: '/admin/management/add-product',
		icon: <PlusCircleIcon className='w-6 mr-4' />,
	},
	{
		text: 'Agregar administrador',
		route: '/admin/management/add-admin',
		icon: <UserCircleIcon className='w-6 mr-4' />,
	},
	{
		text: 'Ver pedidos',
		route: '/admin/management/orders',
		icon: <ClipboardDocumentCheckIcon className='w-6 mr-4' />,
	},
	{
		text: 'Métodos de pago',
		route: '/admin/management/payment-methods',
		icon: <CreditCardIcon className='w-6 mr-4' />,
	},
];

function ManagementMenu() {
	const [selected, setSelected] = useState('Selecciona una opcion');

	const [dropDownOpen, setDropDownOpen] = useState(false);

	const href = useHref();

	useEffect(() => {
		routes.forEach((route) => {
			if (href.includes(route.route)) {
				setSelected(route.text);
			}
		});
	});

	return (
		<Menu className='w-fit mb-8 mx-auto xsm:absolute xsm:right-4' as='div'>
			<div>
				<Menu.Button className='secondary-button flex items-center mt-4 pr-6 h-12'>
					{dropDownOpen ? (
						<ChevronDownIcon
							className='w-7 text-primary-button-bg-color cursor-pointer'
							onClick={() => setDropDownOpen(false)}
						/>
					) : (
						<ChevronLeftIcon
							className='w-7 text-primary-button-bg-color cursor-pointer'
							onClick={() => setDropDownOpen(true)}
						/>
					)}
					{selected}
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
				<Menu.Items className='absolute right-0 mt-2 w-fit origin-top-right rounded-md bg-card-background-color shadow-xl shadow-background-color ring-1 ring-border-color z-50 focus: outline-none'>
					<div className='p-1 whitespace-nowrap'>
						{routes.map((route) => (
							<MenuItem
								key={route.route}
								text={route.text}
								route={route.route}
								setDropDownOpen={setDropDownOpen}
								execute={() => {
									setSelected(route.text);
								}}
							>
								{route.icon}
							</MenuItem>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export { ManagementMenu };
