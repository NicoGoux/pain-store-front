import { Switch } from '@headlessui/react';
import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import React, { useEffect, useState } from 'react';

function TradeLockFilter({ filters, setFilters }) {
	const [isEnabled, setIsEnabled] = useState(false);

	useEffect(() => {
		if (isEnabled) {
			setFilters((prevState) => ({
				...prevState,
				nonTradeLock: `nonTradeLock=${isEnabled}`,
			}));
		}
	}, [isEnabled]);

	useEffect(() => {
		if (filters.nonTradeLock === '') {
			setIsEnabled(false);
		}
	}, [filters]);

	return (
		<div className='text-base w-full self-start'>
			<div className='flex items-center gap-2 w-full'>
				<ChevronDoubleRightIcon className='w-4 text-secondary-font-color' />
				<p className='w-[140px] h-fit whitespace-break-spaces'>Mostrar solo disponibles</p>
				<Switch
					checked={isEnabled}
					onChange={setIsEnabled}
					className={`${isEnabled ? 'bg-border-color' : 'bg-card-background-color'}   
                                relative flex h-full w-12 cursor-pointer rounded-full border-2 border-border-color transition-colors duration-200 
                                ease-in-out focus:outline-none`}
				>
					<span
						aria-hidden='true'
						className={`${
							isEnabled
								? 'translate-x-[23px] bg-card-background-color'
								: 'translate-x-0 bg-primary-button-bg-color'
						} h-[22px] w-[22px] transform rounded-full shadow-lg transition duration-200 ease-in-out`}
					/>
				</Switch>
			</div>
		</div>
	);
}

export default TradeLockFilter;
