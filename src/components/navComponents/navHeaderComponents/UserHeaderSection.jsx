import React from 'react';
import { UserDropdownMenu } from '../../menuComponents/UserDropdownMenu';

function UserHeaderSection({ user }) {
	return (
		<div className='relative flex flex-col self-end items-end mb-6 w-fit text-2xl font-extrabold whitespace-nowrap'>
			<p>BIENVENIDO</p>
			<div className='flex items-center justify-end'>
				<UserDropdownMenu />
				<p className='text-secondary-font-color'>{user.username}</p>
			</div>
		</div>
	);
}

export { UserHeaderSection };
