import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToastProvider } from './components/ui/ToastContext';

import './index.css'

//context
import { CartProvider } from './context/cartContext';
import { LoginProvider } from './context/loginContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <CartProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </CartProvider>
    </ToastProvider>
  </React.StrictMode>
);
