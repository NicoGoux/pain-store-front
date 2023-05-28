import { Menu } from '@headlessui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';

function MenuItem({ text, route, setDropDownOpen, execute, children }) {
	return (
		<Menu.Item>
			{({ active }) => (
				<NavLink
					className={({ isActive }) =>
						`flex gap-2 w-full items-center rounded-md px-2 py-2 text-base
						${isActive ? 'mr-2 border-b-2 border-border-color' : 'mr-2'} ${
							active
								? 'bg-primary-button-bg-color text-primary-font-color'
								: 'text-secondary-font-color'
						}`
					}
					to={route}
					onClick={() => {
						setDropDownOpen(false);
						if (execute) {
							execute();
						}
					}}
				>
					{text}
					{children}
				</NavLink>
			)}
		</Menu.Item>
	);
}

export { MenuItem };
