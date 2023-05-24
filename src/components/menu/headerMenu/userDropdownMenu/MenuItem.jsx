import { Menu } from '@headlessui/react';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function MenuItem({ text, route, execute, children }) {
	const navigate = useNavigate();
	return (
		<Menu.Item>
			{({ active }) => (
				<button
					className={`${
						active
							? 'bg-primary-button-bg-color text-primary-font-color'
							: 'text-secondary-font-color'
					} flex w-full items-center rounded-md px-2 py-2 text-base`}
					onClick={() => {
						if (execute) {
							execute();
						}

						navigate(route);
					}}
				>
					<NavLink
						className={({ isActive }) =>
							isActive ? 'mr-2 border-b-2 border-border-color' : 'mr-2'
						}
						to={route}
						onClick={() => {
							closeAside();
							if (execute) {
								execute();
							}
						}}
					>
						{text}
					</NavLink>
					{children}
				</button>
			)}
		</Menu.Item>
	);
}

export { MenuItem };
