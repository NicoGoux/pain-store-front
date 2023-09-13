import React from 'react';
import { RegisterUserForm } from '../../../components/authComponents/RegisterUserForm';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Register() {
	return (
		<div onScroll={handleMainContainerScroll} className='relative main-container w-full'>
			<RegisterUserForm />
		</div>
	);
}

export { Register };
