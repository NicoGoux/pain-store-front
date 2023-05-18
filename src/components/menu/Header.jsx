import React from 'react';
import { Navbar } from './navbar/Navbar';

function Menu() {
	return <Navbar routes={routes} />;
}

const routes = [
	{ to: '/', text: 'INICIO' },
	{ to: '/store', text: 'TIENDA' },
	{ to: '/contact', text: 'CONTACTO' },
];
export { Menu };
