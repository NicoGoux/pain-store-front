import { Menu, Transition } from '@headlessui/react';
import {
	ArrowLeftOnRectangleIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ClipboardDocumentCheckIcon,
	Cog6ToothIcon,
	ShoppingCartIcon,
	UserCircleIcon,
} from '@heroicons/react/20/solid';
import React, { Fragment, useState } from 'react';
import { MenuItem } from '../../../menuItem/MenuItem';
import { useAuthService } from '../../../../contexts/UserContext';

function UserDropdownMenu() {
	const auth = useAuthService();
	const [dropDownOpen, setDropDownOpen] = useState(false);
	return (
		<Menu as='div'>
			<div>
				<Menu.Button className='flex items-center'>
					{dropDownOpen ? (
						<ChevronDownIcon
							className='w-10 text-primary-button-bg-color cursor-pointer'
							onClick={() => setDropDownOpen(false)}
						/>
					) : (
						<ChevronLeftIcon
							className='w-10 text-primary-button-bg-color cursor-pointer'
							onClick={() => setDropDownOpen(true)}
						/>
					)}
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
				<Menu.Items className='absolute right-0 mt-8 w-56 origin-top-right rounded-md bg-background-color shadow-xl shadow-background-color ring-1 ring-border-color z-50 focus: outline-none'>
					<div className='p-1'>
						<MenuItem
							text='Perfil'
							route={'/account/profile'}
							setDropDownOpen={setDropDownOpen}
						>
							<UserCircleIcon className='w-6 mr-4' />
						</MenuItem>
						{auth.isAdmin() ? (
							<>
								<MenuItem
									text='Gestion'
									route={'/admin/management'}
									setDropDownOpen={setDropDownOpen}
								>
									<Cog6ToothIcon className='w-6 mr-4' />
								</MenuItem>
							</>
						) : (
							<>
								<MenuItem
									text='Mis compras'
									route={'/account/orders'}
									setDropDownOpen={setDropDownOpen}
								>
									<ClipboardDocumentCheckIcon className='w-6 mr-4' />
								</MenuItem>
								<MenuItem
									text='Mi carrito'
									route={'/account/cart'}
									setDropDownOpen={setDropDownOpen}
								>
									<ShoppingCartIcon className='w-6 mr-4' />
								</MenuItem>
							</>
						)}

						<MenuItem
							text='Salir'
							route={'/logout'}
							execute={auth.logout}
							setDropDownOpen={setDropDownOpen}
						>
							<ArrowLeftOnRectangleIcon className='w-6 mr-4' />
						</MenuItem>
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
}

export { UserDropdownMenu };
