const urlProvider = {
	urlBackend: 'https://pain-store.vercel.app/api/v1',
	getImageUrl: (product) => {
		const API = 'https://api.steamapis.com/image/item/730/';
		if (
			product.skinCondition &&
			product.skinCondition.skinConditionString.toLowerCase() != 'vanilla'
		) {
			return `${API}${product.marketHash.marketHashString} (${product.skinCondition.skinConditionString})`;
		} else {
			return `${API}${product.marketHash.marketHashString}`;
		}
	},
};

export { urlProvider };
