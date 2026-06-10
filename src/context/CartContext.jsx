// src/context/CartContext.jsx
import { createContext, useState } from 'react';
import { toast } from 'react-toastify'; // Import toast

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        toast.info(`Increased quantity for ${item.name}`); // Notification for update
        return prevItems.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      toast.success(`Added ${item.name} to cart!`); // Notification for new add
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const item = prevItems.find(i => i.id === id);
      toast.error(`Removed ${item ? item.name : 'item'} from cart`); // Notification for remove
      return prevItems.filter(item => item.id !== id);
    });
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
}