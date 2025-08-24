"use client";
import { CartProvider } from "./context/cartContext";

export default function ClientCartProvider({ children }) {
  return <CartProvider>{children}</CartProvider>;
}