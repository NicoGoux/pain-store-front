import { Menu } from '@headlessui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MenuItem({ text, to, execute, children }) {
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

						navigate(to);
					}}
				>
					{children}
					{text}
				</button>
			)}
		</Menu.Item>
	);
}

export { MenuItem };
