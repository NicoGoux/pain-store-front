import React from 'react';

function NotFound() {
	const href = window.location.href;
	return (
		<div className={`main-container w-full`}>
			<div className='relative flex flex-col gap-2 justify-center items-center m-auto h-fit text-center'>
				<h2 className='text-4xl xsm:text-5xl font-bold text-secondary-font-color'>
					404 Not found
				</h2>
				<h3 className='text-2xl xsm:text-3xl'>No se encontro la ruta</h3>
				<h4 className='text-2xl xsm:text-3xl text-secondary'>{href}</h4>
			</div>
		</div>
	);
}

export { NotFound };
