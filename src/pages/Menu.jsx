// src/pages/Menu.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { menuItems } from "../data/menu";

export default function Menu() {
  // Pull the addToCart function from our global state
  const { addToCart } = useContext(CartContext);
  const handleAddToCart = (item) => {
    addToCart(item);
    alert(`${item.name} added to your cart!`); // Simple popup notification
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-amber-900 dark:text-amber-300">
        Fresh from the Oven
      </h1>
      {/* Grid layout to display products side-by-side on larger screens */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-lg shadow-sm bg-white dark:bg-slate-800 dark:border-slate-700"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            {/* Add dark:text-white to your headings and text */}
            <h2 className="text-xl font-semibold dark:text-white">
              {item.name}
            </h2>
            <p className="text-gray-600 dark:text-slate-300 my-2 h-12">
              {item.description}
            </p>
            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-lg dark:text-amber-300">
                ₹{item.price.toFixed(2)}
              </span>
              <button
                onClick={() => handleAddToCart(item)}
                className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
