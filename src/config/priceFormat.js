const ArsPriceFormat = new Intl.NumberFormat('es-ES', {
	style: 'currency',
	currencyDisplay: 'symbol',
	currency: 'ARS',
});

export { ArsPriceFormat };
