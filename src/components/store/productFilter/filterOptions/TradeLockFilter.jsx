import { Switch } from '@headlessui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';

function TradeLockFilter() {
	const [enabled, setEnabled] = useState(false);

	return (
		<div className='text-base w-full self-start'>
			<div className='flex gap-2 w-full'>
				<ChevronDoubleRightIcon className='w-4 mb-6 text-secondary-font-color' />
				<p className='w-[200px] h-fit whitespace-break-spaces'>
					Mostrar solo productos sin bloqueo
				</p>
			</div>
			<Switch
				checked={enabled}
				onChange={setEnabled}
				className={`${enabled ? 'bg-border-color' : 'bg-card-background-color'}   
                                relative mt-4 ml-6 flex h-6 w-12 cursor-pointer rounded-full border-2 border-border-color transition-colors duration-200 
                                ease-in-out focus:outline-none`}
			>
				<span className='sr-only'>Use setting</span>
				<span
					aria-hidden='true'
					className={`${
						enabled
							? 'translate-x-6 bg-card-background-color'
							: 'translate-x-0 bg-primary-button-bg-color'
					} pointer-events-none inline-block h-[22px] w-[22px] transform rounded-full shadow-lg transition duration-200 ease-in-out`}
				/>
			</Switch>
		</div>
	);
}

export default TradeLockFilter;
