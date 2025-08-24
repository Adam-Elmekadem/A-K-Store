

import { createContext, useState } from 'react';

const cartConsumer = createContext([]);
const cartEditor = createContext(() => {});


function CartProvider({ children }) {
	const [cart, setCart] = useState([]);
	return (
		<cartConsumer.Provider value={cart}>
			<cartEditor.Provider value={setCart}>
				{children}
			</cartEditor.Provider>
		</cartConsumer.Provider>
	);
}

export { cartConsumer, cartEditor, CartProvider };
