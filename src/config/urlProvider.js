const urlProvider = {
	urlBackend: 'https://pain-store.vercel.app/api/v1',
	getImageUrl: (product) => {
		const API = 'https://api.steamapis.com/image/item/730/';
		return `${API}${product.marketHash.marketHashString} (${product.skinCondition.skinConditionString})`;
	},
};

export { urlProvider };
