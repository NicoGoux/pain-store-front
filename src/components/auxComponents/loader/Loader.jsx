import React from 'react';

function Loader() {
	return (
		<div className='loader-container w-14 h-14 m-auto'>
			<div className='loader-dot before:bg-loader-color'></div>
			<div className='loader-dot before:bg-loader-color'></div>
			<div className='loader-dot before:bg-loader-color'></div>
			<div className='loader-dot before:bg-loader-color'></div>
			<div className='loader-dot before:bg-loader-color'></div>
		</div>
	);
}

export { Loader };
