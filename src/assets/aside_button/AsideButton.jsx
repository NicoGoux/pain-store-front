import React from 'react';

function AsideButton({ isOpen }) {
	return isOpen ? (
		// Open menu icon
		<svg
			xmlns='http://www.w3.org/2000/svg'
			enable-background='new 0 0 24 24'
			height='48px'
			viewBox='0 0 24 24'
			width='48px'
			fill='#f7931e'
		>
			<path d='M0,0h24v24H0V0z' fill='none' />
			<path d='M3,18h13v-2H3V18z M3,13h10v-2H3V13z M3,6v2h13V6H3z M21,15.59L17.42,12L21,8.41L19.59,7l-5,5l5,5L21,15.59z' />
		</svg>
	) : (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='48px'
			viewBox='0 0 24 24'
			width='48px'
			fill='#f7931e'
		>
			<path d='M0 0h24v24H0V0z' fill='none' />
			<path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
		</svg>
	);
}

export { AsideButton };
