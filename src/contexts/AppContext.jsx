import { createContext, useEffect, useState } from 'react';

const AppContext = createContext({});

function AppProvider(props) {
	const getUrlBackend = () => {
		return 'https://pain-store.vercel.app/api/v1';
	};

	const getUrlImage = (product) => {
		const API = 'https://api.steamapis.com/image/item/730/';
		return `${API}${product.marketHash.marketHashString} (${product.skinCondition.skinConditionString})`;
	};

	const urlProvider = { getUrlBackend, getUrlImage };

	return (
		<AppContext.Provider
			value={{
				urlProvider,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export { AppContext, AppProvider };
