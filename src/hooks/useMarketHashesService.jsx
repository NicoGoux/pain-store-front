import { useState } from 'react';
import { urlProvider } from '../config/urlProvider';
import axios from 'axios';

function useMarketHashService() {
	const [loadingMarketHashes, setLoadingMarketHashes] = useState(false);

	const getMarketHashes = async (filters) => {
		setLoadingMarketHashes(true);

		filters.limit = 5;

		let string = '?';
		for (const key in filters) {
			string += `${key}=${filters[key]}&`;
		}
		try {
			const response = await axios.get(
				`${urlProvider.urlBackend}/products/market_hashes${string}`
			);
			return response.data;
		} catch (error) {
			console.log(error);
			const empty = [];
			return empty;
		} finally {
			setLoadingMarketHashes(false);
		}
	};
	const marketHashService = {
		loadingMarketHashes,
		getMarketHashes,
	};

	return marketHashService;
}
export { useMarketHashService };
