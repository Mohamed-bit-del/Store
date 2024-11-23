import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export function CartProvider ({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product, selectedSize) => {
    setCart((prevCart) => {
      const exists = prevCart.some(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (exists) {
        alert("This product is already in the cart!");
        return prevCart; // Do not add the product again
      }
      return [
        ...prevCart,
        { id: product.id, price: product.price, quantity: 1, size: selectedSize },
      ];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, calculateTotal, calculateTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
