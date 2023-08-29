import { ChevronDoubleRightIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { NavLink } from 'react-router-dom';

function UserNavLink({ text, route, closeAside, execute, children }) {
	return (
		<li className='flex items-center justify-center w-fit'>
			<ChevronDoubleRightIcon className='w-5 mr-2 text-secondary-font-color' />
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
		</li>
	);
}

export { UserNavLink };
