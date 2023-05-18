import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { UserDropdownMenu } from '../userDropdownMenu/UserDropdownMenu';

function UserHeaderSection({ user }) {
	return (
		<div className='hidden self-end m-6 md:flex flex-col items-center justify-center  text-2xl font-extrabold w-64 whitespace-nowrap'>
			<p>BIENVENIDO</p>
			<div className='flex items-center justify-center'>
				<p className='text-secondary-font-color'>{user.username}</p>
				<UserDropdownMenu />
			</div>
		</div>
	);
}

export { UserHeaderSection };
