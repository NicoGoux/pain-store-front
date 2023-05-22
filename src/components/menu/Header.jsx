import React from 'react';
import { HeaderMenu } from './headerMenu/HeaderMenu';
import tailwindConfig from '../../../tailwind.config';
import { useMediaQuery } from '../../hooks/useMediaQuerys';
import { AsideMenu } from './asideMenu/AsideMenu';

function Menu() {
	const matches = useMediaQuery(tailwindConfig.theme.screens.md);
	return <>{matches ? <AsideMenu routes={routes} /> : <HeaderMenu routes={routes} />}</>;
}

const routes = [
	{ to: '/', text: 'INICIO' },
	{ to: '/store', text: 'TIENDA' },
	{ to: '/contact', text: 'CONTACTO' },
];
export { Menu };
