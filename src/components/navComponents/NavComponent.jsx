import React from 'react';
import tailwindConfig from '../../../tailwind.config';
import { useMediaQuery } from '../../hooks/useMediaQuerys';
import { HeaderForAsideComponent } from './navAsideComponents/HeaderForAsideComponent';
import { HeaderComponent } from './navHeaderComponents/HeaderComponent';

function NavComponent() {
	const matches = useMediaQuery(tailwindConfig.theme.screens.md);
	return (
		<>
			{matches ? (
				<HeaderForAsideComponent routes={routes} />
			) : (
				<HeaderComponent routes={routes} />
			)}
		</>
	);
}

const routes = [
	{ to: '/home', text: 'INICIO' },
	{ to: '/store', text: 'TIENDA' },
	{ to: '/contact', text: 'CONTACTO' },
];
export { NavComponent };
