// src/context/MenuContext.jsx
import { createContext, useState, useEffect } from 'react';
import { menuItems as defaultMenu } from '../data/menu';

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('saffronMenu');
    return saved ? JSON.parse(saved) : defaultMenu;
  });

  useEffect(() => {
    localStorage.setItem('saffronMenu', JSON.stringify(menuItems));
  }, [menuItems]);

  const addMenuItem = (newItem) => {
    setMenuItems((prev) => [{ ...newItem, id: Date.now() }, ...prev]);
  };

  // --- NEW: Function to delete a cake by its ID ---
  const deleteMenuItem = (id) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // --- Don't forget to expose deleteMenuItem here! ---
  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
}