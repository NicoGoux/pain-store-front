import React from 'react';
import { RecoveryForm } from '../../../components/authComponents/RecoveryForm';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Recovery() {
	return (
		<div onScroll={handleMainContainerScroll} className={`main-container w-full`}>
			<RecoveryForm />
		</div>
	);
}

export { Recovery };
