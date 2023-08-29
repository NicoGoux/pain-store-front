import React from 'react';
import { RegisterAdminForm } from '../../../components/adminComponents/RegisterAdminForm';

function AddAdmin() {
	return (
		<div className='flex flex-col items-center justify-center h-fit xsm:pt-20 pb-8'>
			<h2 className='text-4xl font-bold text-secondary-font-color text-center'>
				Datos del administrador
			</h2>
			<RegisterAdminForm />
		</div>
	);
}

export { AddAdmin };
