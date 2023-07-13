import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

function ConfirmationModal({ setOpenConfirmationModal, children }) {
	return (
		<>
			<Transition appear show={true} as={Fragment}>
				<Dialog
					as='div'
					className='z-10'
					onClose={() => {
						setOpenConfirmationModal(false);
					}}
				>
					<div className='fixed top-0 flex items-center justify-center w-full min-h-fit h-full z-50'>
						<div className='fixed inset-0 bg-background-color opacity-60 w-full h-full overflow-y-auto scroll' />
						<div className='fixed inset-0 overflow-y-auto scroll'>
							<div className='flex min-h-full items-center justify-center xsm:p-4 text-center'>
								<Transition.Child
									as={Fragment}
									enter='ease-out duration-300'
									enterFrom='opacity-0 scale-95'
									enterTo='opacity-100 scale-100'
									leave='ease-in duration-200'
									leaveFrom='opacity-100 scale-100'
									leaveTo='opacity-0 scale-95'
								>
									<Dialog.Panel
										className='relative flex flex-col gap-4 h-full items-center justify-center w-full max-w-fit 
                                                transform overflow-hidden rounded-2xl border-y-2 xsm:border-2 border-border-color 
                                                bg-background-color p-12 shadow-2xl transition-all text-lg text-secondary-font-color
												overflow-y-auto scroll'
									>
										{children}
										<button
											className='absolute top-0 right-0 focus:outline-none'
											onClick={() => {
												setOpenConfirmationModal(false);
											}}
										>
											<XMarkIcon className='text-error-color w-12' />
										</button>
									</Dialog.Panel>
								</Transition.Child>
							</div>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export { ConfirmationModal };
