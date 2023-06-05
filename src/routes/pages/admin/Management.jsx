import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import {
	ChevronDownIcon,
	ChevronLeftIcon,
	ClipboardDocumentCheckIcon,
	PlusCircleIcon,
	UserCircleIcon,
} from '@heroicons/react/20/solid';
import { useAuthService } from '../../../contexts/UserContext';
import { MenuItem } from '../../../components/menuItem/MenuItem';
import { Outlet } from 'react-router-dom';

function Management() {
	const auth = useAuthService();

	const [selected, setSelected] = useState('Selecciona una opcion');

	const [dropDownOpen, setDropDownOpen] = useState(false);
	return (
		<section className={`relative main-container w-full`}>
			<Menu className='absolute xsm:right-4' as='div'>
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
							<MenuItem
								text={routes.addProduct.text}
								route={routes.addProduct.route}
								setDropDownOpen={setDropDownOpen}
								execute={() => {
									setSelected(routes.addProduct.text);
								}}
							>
								<PlusCircleIcon className='w-6 mr-4' />
							</MenuItem>
							<MenuItem
								text={routes.addAdmin.text}
								route={routes.addAdmin.route}
								setDropDownOpen={setDropDownOpen}
								execute={() => {
									setSelected(routes.addAdmin.text);
								}}
							>
								<UserCircleIcon className='w-6 mr-4' />
							</MenuItem>
							<MenuItem
								text={routes.shopping.text}
								route={routes.shopping.route}
								setDropDownOpen={setDropDownOpen}
								execute={() => {
									setSelected(routes.shopping.text);
								}}
							>
								<ClipboardDocumentCheckIcon className='w-6 mr-4' />
							</MenuItem>
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
			<Outlet />
		</section>
	);
}

const routes = {
	addProduct: { text: 'Agregar producto', route: '/admin/management/add-product' },
	addAdmin: { text: 'Agregar administrador', route: '/admin/management/add-admin' },
	shopping: { text: 'Ver compras', route: '/admin/management/shopping' },
};

export { Management };
