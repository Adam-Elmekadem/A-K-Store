import React, { useContext, useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { cartConsumer, cartEditor } from '../../context/cartContext';
import { isLoggedIn, getUserName, placeOrder } from '../../utils/auth';
import { useToast } from '../../hooks/useToast';
import ToastContainer from '../ui/ToastContainer';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function CartPage() {
  const cart = useContext(cartConsumer);
  const setCart = useContext(cartEditor);
  const { toasts, showToast, removeToast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    const loggedIn = isLoggedIn();
    setUserLoggedIn(loggedIn);
    if (loggedIn) {
      setUserName(getUserName() || 'User');
    }
  }, []);

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const handlePlaceOrder = async () => {
    if (!isLoggedIn()) {
      showToast('Please login first to place your order', 'error');
      return;
    }

    if (cart.length === 0) {
      showToast('Your cart is empty', 'error');
      return;
    }

    const total = cart.reduce((sum, item) => sum + (item.productPrice), 0);

    const confirmed = window.confirm(
      `Place order for ${cart.length} items?\nTotal: $${total.toFixed(2)}`
    );
    
    if (!confirmed) {
      return;
    }

    setIsPlacingOrder(true);

    try {
      console.log('Cart items before extracting IDs:', cart); // Debug log

      const productIds = cart.map(item => {
        const id = item.productID;
        console.log('Item:', item, 'Extracted ID:', id);
        return id;
      }).filter(id => id !== undefined);

      console.log('Final product IDs for order:', productIds);

      if (productIds.length === 0) {
        showToast('Error: Could not extract product IDs from cart', 'error');
        return;
      }

      const result = await placeOrder(productIds);
      console.log('Order API result:', result);

      if (result.success) {
        // Success!
        showToast('Order placed successfully! Thank you for your purchase.', 'success');

        // Clear the cart after successful order
      } else {
        showToast('Failed to place order: ' + result.message, 'error');
      }
      setCart([]);
      
    } catch (error) {
      console.error('Order placement error:', error);
      showToast(error.message || 'Failed to place order', 'error');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="bg-black text-white py-20 px-4 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center font-Guardian drop-shadow-lg red-AKred">Your Cart</h2>
          
          {userLoggedIn && (
            <p className="text-center text-gray-300 mb-8 font-poppins text-lg">
              Welcome back, <span className="red-AKred font-semibold text-3xl underline">{userName.toUpperCase()}</span>! 
              Complete your purchase below.
            </p>
          )}

          {console.log('Cart contents:', cart)}
          {cart.length === 0 ? (
            <div className="text-center text-gray-400 py-12">Your cart is empty.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 font-poppins text-white">Order Summary</h3>
                <ul className="divide-y divide-gray-700">
                  {cart.map((item, idx) => (
                    <React.Fragment key={item.productID || idx}>
                      <li className="flex items-center justify-between py-6 group relative">
                        <div className="flex items-center gap-4 flex-1">
                          <img src={item.image} alt={item.productName} className="w-20 h-20 object-cover rounded-xl border border-red-AKred" />
                          <div className="flex-1">
                            <h3 className="font-bold text-lg font-poppins text-white mb-1">{item.productName}</h3>
                            <p className="text-gray-400 text-sm font-poppins">{item.productDescription}</p>
                            <span className="font-bold text-xl text-red-AKred block mt-2 md:hidden">${item.productPrice}</span>
                          </div>
                        </div>
                        
                        <div className="hidden md:flex items-center gap-4">
                          <span className="font-bold text-xl text-red-AKred">${item.productPrice}</span>
                          <button 
                            onClick={() => removeFromCart(idx)}
                            className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                            title="Remove from cart"
                          >
                            <X size={16} className="text-white hover:cursor-pointer" />
                          </button>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(idx)}
                          className="md:hidden p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 absolute top-2 right-2"
                          title="Remove from cart"
                        >
                          <X size={16} className="text-white hover:cursor-pointer" />
                        </button>
                      </li>
                      <hr className="border-gray-700" />
                    </React.Fragment>
                  ))}
                </ul>
                <div className="mt-8 text-right">
                  <span className="font-bold text-lg text-white">Total: </span>
                  <span className="font-bold text-2xl text-red-AKred">
                    ${cart.reduce((sum, item) => sum + Number(item.productPrice), 0).toFixed(2)}
                  </span>
                </div>
              </div>
              <form className="p-8 shadow-lg flex flex-col gap-6">
                <h3 className="text-2xl font-bold mb-4 font-poppins text-white">Checkout</h3>
                
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  defaultValue={userLoggedIn ? userName : ''}
                  className="px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred" 
                  required 
                />
                
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  defaultValue={userLoggedIn ? localStorage.getItem('userEmail') || '' : ''}
                  className="px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred" 
                  required 
                />
                
                <input type="text" placeholder="Shipping Address" className="px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred" required />
                <div>
                  <label className="block mb-4 font-bold text-white font-poppins">Payment Method</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="credit" 
                        className="accent-red-AKred" 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required 
                      />
                      <span className="font-poppins text-white">Credit Card</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="paypal" 
                        className="accent-red-AKred"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="font-poppins text-white">PayPal</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" 
                        name="payment" 
                        value="cod" 
                        className="accent-red-AKred"
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <span className="font-poppins text-white">Cash on Delivery</span>
                    </label>
                  </div>
                  {paymentMethod === 'paypal' && (
                    <input 
                      type="email" 
                      placeholder="PayPal Email Address" 
                      className="w-full px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred mb-4" 
                      required 
                    />
                  )}
                </div>
                {paymentMethod === 'credit' && (
                  <>
                    <input type="text" placeholder="Card Number" className="px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred" required />
                    <input type="text" placeholder="Card Expiry (MM/YY)" className="px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred" required />
                    <input type="text" placeholder="Card CVC" className="px-6 py-3 border border-white bg-black text-white font-poppins focus:outline-none focus:ring-2 focus:ring-red-AKred" required />
                  </>
                )}
                <button 
                  type="button"
                  onClick={handlePlaceOrder}
                  disabled={isPlacingOrder || cart.length === 0}
                  className={`px-8 py-4 border border-white font-bold shadow transition-colors duration-300 text-lg font-poppins hover:cursor-pointer ${
                    isPlacingOrder || cart.length === 0
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'hover:bg-red-AKred text-white hover:bg-white hover:text-red-AKred'
                  }`}
                >
                  {isPlacingOrder ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Placing Order...
                    </div>
                  ) : (
                    `Place Order (${cart.length} items)`
                  )}
                </button>
                <p className="text-xs text-gray-400 text-center mt-4">By placing your order, you agree to our <a href="#" className="hover:red-AKred underline">Terms & Conditions</a> and <a href="#" className="hover:red-AKred underline">Privacy Policy</a>.</p>
              </form>
            </div>
          )}
        </div>
      </section>
      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </>
  );
}
