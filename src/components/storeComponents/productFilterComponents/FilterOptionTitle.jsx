import { MinusIcon, PlusSmallIcon } from '@heroicons/react/20/solid';
import React from 'react';

function FilterOptionTitle({ title, filterOpen, setFilterOpen, objectKey }) {
	const onClickOpenButton = () => {
		const state = filterOpen;
		for (const key in state) {
			state[key] = false;
		}
		state[objectKey] = true;
		setFilterOpen({ ...state });
	};

	const onClickCloseButton = () => {
		const state = filterOpen;
		for (const key in state) {
			state[key] = false;
		}
		setFilterOpen({ ...state });
	};

	return (
		<div
			className='flex w-full items-center justify-between cursor-pointer'
			onClick={!filterOpen[objectKey] ? onClickOpenButton : onClickCloseButton}
		>
			<p>{title}</p>
			{!filterOpen[objectKey] ? (
				<PlusSmallIcon className='w-7 text-primary-button-bg-color' />
			) : (
				<MinusIcon className='w-7 text-primary-button-bg-color' />
			)}
		</div>
	);
}

export { FilterOptionTitle };
