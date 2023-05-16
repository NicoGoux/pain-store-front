import { useState, useEffect } from 'react';
import { CartIcon } from '../../../../assets/cartIcon/CartIcon';
import axios from 'axios';

function ProductCard({ product }) {
	const [searchingImage, setSearchingImage] = useState(true);

	useEffect(() => {
		const API = 'https://api.steamapis.com/image/item/730/';
		const getImage = async () => {
			const urlImage = `${API}${product.marketHash}`;
			console.log(urlImage);
			const options = {
				method: 'GET',
				url: urlImage,
			};

			axios
				.request(options)
				.then(function (response) {
					product.image = response.data;
				})
				.catch(function (error) {
					console.error(error);
				})
				.finally(setSearchingImage(false));
		};
		getImage();
	}, []);

	return (
		<div className='bg-card-background-color rounded-xl border-2 border-border-color min-w-[160px] max-w-[300px] aspect-video'>
			<div className='rounded-tl-xl rounded-br-xl flex items-center justify-center bg-primary-button-bg-color w-12 h-12 cursor-pointer'>
				<CartIcon />
			</div>
			{}
			{!searchingImage && (
				<figure className='bg-primary-button-bg-color w-full h-full'>
					<img src={product.image} alt='' />
				</figure>
			)}
		</div>
	);
}

export { ProductCard };
