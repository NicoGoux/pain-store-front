import React from 'react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { PaymentMethodTypeSelector } from '../../../auxComponents/comboBoxes/PaymentMethodTypeSelector';
import { PurchaseOrderStatusSelector } from '../../../auxComponents/comboBoxes/PurchaseOrderStatusSelector';

function PurchaseOrderFilter({ filters, setFilters }) {
	const onClickRestartButton = () => {
		setFilters({ page: 1, orderNumber: '', username: '', minDate: '', maxDate: '' });
	};

	const onOrderNumberFilterChange = (event) => {
		setFilters((prevState) => ({ ...prevState, page: 1, orderNumber: event.target.value }));
	};

	const onUsernameFilterChange = (event) => {
		setFilters((prevState) => ({ ...prevState, page: 1, username: event.target.value }));
	};

	const onMinDateFilterChange = (event) => {
		setFilters((prevState) => ({ ...prevState, page: 1, minDate: event.target.value }));
	};

	const onMaxDateFilterChange = (event) => {
		setFilters((prevState) => ({ ...prevState, page: 1, maxDate: event.target.value }));
	};

	return (
		<>
			<section
				id='filterSection'
				className='flex flex-col items-center gap-6 w-1/6 h-full min-w-fit text-lg font-medium whitespace-nowrap'
			>
				<div className='flex items-center justify-around w-full text-xl font-extrabold whitespace-nowrap xsm:w-[300px]'>
					<h2>FILTROS</h2>
					<AdjustmentsHorizontalIcon className='w-8 text-primary-button-bg-color' />
				</div>

				<input
					placeholder='Numero de pedido'
					type='number'
					className='secondary-input text-center w-full appearance-none'
					value={filters.orderNumber}
					onChange={onOrderNumberFilterChange}
				/>

				<input
					placeholder='Nombre de usuario'
					type='text'
					className='secondary-input text-center w-full'
					value={filters.username}
					onChange={onUsernameFilterChange}
				/>
				<div className='relative flex items-center w-full'>
					<PaymentMethodTypeSelector
						defaultValue={''}
						onChange={(event) => {
							setFilters((prevValues) => ({
								...prevValues,
								page: 1,
								paymentMethodType: event.target.value,
							}));
						}}
					/>
				</div>
				<div className='relative flex items-center w-full'>
					<PurchaseOrderStatusSelector
						defaultValue={''}
						onChange={(event) => {
							setFilters((prevValues) => ({
								...prevValues,
								page: 1,
								purchaseOrderStatus: event.target.value,
							}));
						}}
					/>
				</div>
				<div className='relative flex gap-4 items-center w-full'>
					<div className='flex flex-col'>
						<label htmlFor='minDate'>Desde:</label>
						<input
							id='minDate'
							type='date'
							className='secondary-input text-center w-full'
							value={filters.minDate}
							onChange={onMinDateFilterChange}
						/>
					</div>

					<div className='flex flex-col'>
						<label htmlFor='maxDate'>Hasta:</label>
						<input
							id='maxDate'
							type='date'
							className='secondary-input text-center w-full'
							value={filters.maxDate}
							onChange={onMaxDateFilterChange}
						/>
					</div>
				</div>

				<div className='flex items-center justify-center gap-6 flex-col w-fit'>
					<button
						className='secondary-button font-bold w-44'
						onClick={onClickRestartButton}
					>
						REINICIAR
					</button>
				</div>
			</section>
		</>
	);
}

export { PurchaseOrderFilter };
