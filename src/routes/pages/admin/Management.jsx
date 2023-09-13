import React from 'react';
import { Outlet } from 'react-router-dom';
import { ManagementMenu } from '../../../components/menuComponents/ManagementMenu';

function Management() {
	return (
		<section className='relative justify-center h-[82%] pt-4 overflow-y-auto scroll xsm:px-2 sm:flex sm:w-full'>
			<div className='my-4 w-fit mx-auto'>
				<ManagementMenu />
				<Outlet />
			</div>
		</section>
	);
}

export { Management };
