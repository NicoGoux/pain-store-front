import { Fragment, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useMarketHashService } from '../../hooks/useMarketHashesService';
import { Loader } from '../loader/Loader';

function MarketHashSelector({ value, category, onChange }) {
	const [selected, setSelected] = useState(null);
	const [marketHashes, setMarketHashes] = useState([]);

	const marketHashService = useMarketHashService();

	useEffect(() => {
		const getMarketHashes = async () => {
			if (value.length > 2) {
				const filters = {
					marketHash: value,
				};
				if (category) {
					filters.category = category;
				}

				const marketHashes = await marketHashService.getMarketHashes(filters);
				setMarketHashes(marketHashes.slice(0, 4));
				return;
			}
			setMarketHashes([]);
		};
		getMarketHashes();
	}, [value]);

	return (
		<Combobox value={selected} onChange={setSelected}>
			<div className='relative mt-1'>
				<div className='relative'>
					<Combobox.Input
						className='primary-input w-full min-w-[300px]'
						onChange={(event) => onChange(event.target.value)}
					/>
					<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<ChevronUpDownIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
					afterLeave={() => onChange(selected)}
				>
					<Combobox.Options className='absolute z-30 top-12 max-h-60 h-fit w-full rounded-lg border-2 border-border-color bg-card-background-color py-1 text-base shadow-lg overflow-auto scroll'>
						{marketHashService.loadingMarketHashes ? (
							<div className='flex w-full h-28'>
								<Loader />
							</div>
						) : (
							<>
								<Combobox.Option
									className={({ active }) =>
										`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
											active && 'bg-primary-button-bg-color'
										}`
									}
									value={value}
								>
									<span
										className={`block truncate ${
											selected ? 'font-medium' : 'font-normal'
										}`}
									>
										{value}
									</span>
								</Combobox.Option>
								{marketHashes.map((marketHash) => (
									<Combobox.Option
										key={marketHash._id}
										className={({ active }) =>
											`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
												active && 'bg-primary-button-bg-color'
											}`
										}
										value={marketHash.marketHashString}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{marketHash.marketHashString}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-teal-600'
														}`}
													>
														<CheckIcon
															className='h-5 w-5'
															aria-hidden='true'
														/>
													</span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))}
							</>
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
}
export { MarketHashSelector };
