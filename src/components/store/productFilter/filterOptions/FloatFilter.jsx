import React from 'react';

function FloatFilter() {
	return (
		<div className='flex flex-col justify-center items-center gap-3 w-full'>
			<div className='flex justify-between w-fit gap-4'>
				<input
					placeholder='min. 0'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
				/>
				-
				<input
					placeholder='max. 1'
					type='text'
					className='secondary-input text-center p-1 w-24 h-7'
				/>
			</div>
		</div>
	);
}

export { FloatFilter };
