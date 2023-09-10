import React from 'react';
import { handleMainContainerScroll } from '../../../config/handleMainContainerScroll';

function Unauthorized() {
	return (
		<div onScroll={handleMainContainerScroll} className={`main-container w-full`}>
			<div className='relative flex flex-col gap-2 justify-center items-center m-auto h-fit text-center'>
				<h2 className='text-4xl xsm:text-5xl font-bold text-secondary-font-color'>
					401 Unauthorized
				</h2>
				<h3 className='text-2xl xsm:text-3xl'>El usuario no se encuentra authorizado</h3>
			</div>
		</div>
	);
}

export { Unauthorized };
