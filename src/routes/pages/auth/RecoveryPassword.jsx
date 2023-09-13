import React from 'react';
import { RecoveryPasswordForm } from '../../../components/authComponents/RecoveryPasswordForm';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function RecoveryPassword() {
	return (
		<div onScroll={handleMainContainerScroll} className='relative main-container w-full'>
			<RecoveryPasswordForm />
		</div>
	);
}

export { RecoveryPassword };
