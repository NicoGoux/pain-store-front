import React from 'react';
import { HeaderMenu } from './headerMenu/HeaderMenu';
import tailwindConfig from '../../../tailwind.config';
import { useMediaQuery } from '../../hooks/useMediaQuerys';
import { HeaderAsideMenu } from './asideMenu/HeaderAsideMenu';

function Menu() {
	const matches = useMediaQuery(tailwindConfig.theme.screens.md);
	return <>{matches ? <HeaderAsideMenu routes={routes} /> : <HeaderMenu routes={routes} />}</>;
}

const routes = [
	{ to: '/home', text: 'INICIO' },
	{ to: '/store', text: 'TIENDA' },
	{ to: '/contact', text: 'CONTACTO' },
];
export { Menu };
