import React from 'react';

function PriceFilter() {
	return (
		<div className='flex flex-col justify-center items-center gap-3 w-full'>
			<div className='flex justify-between w-fit gap-4'>
				<input
					placeholder='0 ARS'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
				/>
				-
				<input
					placeholder='1000 ARS'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
				/>
			</div>
		</div>
	);
}

export { PriceFilter };
