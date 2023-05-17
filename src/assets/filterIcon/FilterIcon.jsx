import React from 'react';

function FilterIcon({ size }) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height={size}
			viewBox='0 96 960 960'
			width={size}
			fill='#f7931e'
		>
			<path d='M427 936V711h60v83h353v60H487v82h-60Zm-307-82v-60h247v60H120Zm187-166v-82H120v-60h187v-84h60v226h-60Zm120-82v-60h413v60H427Zm166-165V216h60v82h187v60H653v83h-60Zm-473-83v-60h413v60H120Z' />
		</svg>
	);
}

export { FilterIcon };