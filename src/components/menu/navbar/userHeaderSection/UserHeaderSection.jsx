import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import { UserDropdownMenu } from '../userDropdownMenu/UserDropdownMenu';

function UserHeaderSection({ user }) {
	return (
		<div className='relative hidden self-end items-end mb-6 w-fit md:flex flex-col text-2xl font-extrabold whitespace-nowrap'>
			<p>BIENVENIDO</p>
			<div className='flex items-center justify-end'>
				<UserDropdownMenu />
				<p className='text-secondary-font-color'>{user.username}</p>
			</div>
		</div>
	);
}

export { UserHeaderSection };
