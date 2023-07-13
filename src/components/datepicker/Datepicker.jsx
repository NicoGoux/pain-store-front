import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import Datepicker from 'tailwind-datepicker-react';

const options = {
	autoHide: true,
	todayBtn: false,
	clearBtn: true,
	maxDate: new Date('2030-01-01'),
	minDate: new Date('1950-01-01'),
	theme: {
		background: 'border-2 bg-card-background-color p-2',
		todayBtn: '',
		clearBtn: '',
		icons: '',
		text: '',
		disabledText: 'opacity-60',
		input: 'primary-input',
		inputIcon: '',
		selected: 'text-primary-font-color',
	},
	icons: {
		// () => ReactElement | JSX.Element
		prev: () => <ArrowLeftIcon className='w-6' />,
		next: () => <ArrowRightIcon className='w-6' />,
	},
	datepickerClassNames: 'relative top-1',
	language: 'es',
};

function DatepickerInput({ value, onChange }) {
	const [show, setShow] = useState(false);
	const handleClose = (state) => {
		setShow(state);
	};

	options.defaultDate = new Date(value);

	return (
		<div className='relative'>
			<Datepicker options={options} onChange={onChange} show={show} setShow={handleClose} />
		</div>
	);
}

export { DatepickerInput };
