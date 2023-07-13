import React from 'react';
import { useNavigate } from 'react-router-dom';

function Summary({ productList }) {
	const navigate = useNavigate();

	if (!productList) {
	}

	return (
		<>
			<h2>Resumen del pedido</h2>
			<section></section>
			<section></section>
		</>
	);
}

export { Summary };
