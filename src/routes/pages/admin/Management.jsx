import React from 'react';
import { Outlet } from 'react-router-dom';
import { ManagementMenu } from '../../../components/menuComponents/ManagementMenu';

function Management() {
	return (
		<section className='relative main-container w-full'>
			<ManagementMenu />
			<Outlet />
		</section>
	);
}

export { Management };
