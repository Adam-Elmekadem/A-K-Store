
import React, { useEffect, useState } from 'react';
import ProductCard from './productCard.jsx/ProductCard';


import newwColl1 from '../../assets/images/HeroImages/newCollection1.jpg';
import newwColl2 from '../../assets/images/HeroImages/newCollection2.jpg';
import Hero1 from '../../assets/images/HeroImages/Hero1.png';
import Hero2 from '../../assets/images/HeroImages/Hero2.png';
import logo from '../../assets/images/AKlogo-8.png';

import {cartEditor} from '../../context/cartContext.jsx';





export default function NewCollection() {


	const handleAddToCart = (product, image) => {
		setCart(prev => [...prev, {
			productID: product.productID,
			productName: product.productName,
			productPrice: product.productPrice,
			image,
			productDescription: product.productDescription
		}]);
	};
	//contexts
	const setCart = React.useContext(cartEditor);

	//states
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const productImages = {
		1: newwColl1,
		2: newwColl2,
		3: Hero1,
		4: Hero2,
	};

	//useEffect
	useEffect(() => {
		fetch('https://zikohost.bsite.net/Products/GetAllProducts')
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setProducts(data);
				setLoading(false);
			})
			.catch(err => {
				setError('Failed to load products');
				setLoading(false);
			});
	}, []);

	return (
		<section className="relative w-full py-16 bg-black text-white">
			<div className="max-w-6xl mx-auto px-4">
				<h2 className="text-3xl md:text-5xl font-bold mb-8 text-center drop-shadow-lg font-Guardian">New Collection</h2>
				<p className="mb-2 text-center text-gray-200 text-lg md:text-xl">Every piece tells a story, Every collection has its own vibe.</p>
				<p className='font-light mb-4 text-center'>Our curated selections are more than just products; they’re expressions of identity, mood, and moment. Whether you're drawn to the bold energy of streetwear, the serene elegance of minimalist design, or the nostalgic charm of vintage finds, each collection is crafted to resonate with a distinct feeling. Every item carries its own narrative—woven through design, texture, and purpose—inviting you to discover pieces that speak to your style and spirit. This isn’t just shopping; it’s storytelling through fashion.</p>
				{loading ? (
					<div className="text-center text-gray-400 py-12">Loading products...</div>

				) : error ? (
					<div className="text-center text-red-500 py-12">{error}</div>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
						{console.log(`Products:`, products)}
						{products.map((product, idx) => {
							const image = productImages[product.productID]  || logo;
							return (
								<ProductCard
									key={product.productID}
									image={image}
									name={product.productName}
									description={product.productDescription}
									price={product.productPrice}
									onAddToCart={() => handleAddToCart(product, image)}
								/>
							);
						})}
					</div>
				)}
			</div>
		</section>
	);
}

