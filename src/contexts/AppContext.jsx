import { createContext, useEffect, useState } from 'react';

const AppContext = createContext({});

function AppProvider(props) {
	const urlBack = 'https://pain-store.vercel.app/api/v1';

	return (
		<AppContext.Provider
			value={{
				urlBack,
			}}
		>
			{props.children}
		</AppContext.Provider>
	);
}

export { AppContext, AppProvider };
