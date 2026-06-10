// src/pages/Menu.jsx
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Plus } from "lucide-react";
import { MenuContext } from "../context/MenuContext"; 

export default function Menu() {
  const { addToCart } = useContext(CartContext);
  const { menuItems } = useContext(MenuContext); 
  
  const handleAddToCart = (item) => {
    addToCart(item);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto mt-6">
      <div className="text-center mb-14">
        {/* INLINE STYLES: This forces the text to be a dark color, bypassing Tailwind completely */}
        <h1 
          className="text-4xl md:text-5xl font-bold font-serif mb-4" 
          style={{ color: "#4A2B23" }}
        >
          Our Signature Menu
        </h1>
        
        {/* INLINE STYLES: Forces the paragraph to be a readable gray */}
        <p 
          className="max-w-xl mx-auto font-medium text-lg leading-relaxed" 
          style={{ color: "#475569" }}
        >
          Explore our handcrafted selection of premium cakes, made with the finest ingredients and boundless love.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="dribbble-card group relative flex flex-col overflow-hidden"
          >
            {/* Image Container */}
            <div className="relative h-64 overflow-hidden p-3 pb-0">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover rounded-[1.5rem] transition-transform duration-700 group-hover:scale-105"
              />
              {/* Floating Price Badge */}
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm dark:bg-slate-800/95 px-4 py-1.5 rounded-full shadow-sm text-sm font-extrabold text-[#4A2B23] dark:text-white">
                ₹{Number(item.price).toFixed(0)}
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-bold text-[#4A2B23] dark:text-white mb-2 line-clamp-1 font-serif">
                {item.name}
              </h2>
              <p className="text-sm text-[#8A6A61] dark:text-slate-400 mb-6 line-clamp-2 flex-grow font-medium leading-relaxed">
                {item.description}
              </p>
              
              <button
                onClick={() => handleAddToCart(item)}
                className="w-full bg-[#FFF0F2] hover:bg-[#FF8E9E] text-[#FF8E9E] hover:text-white dark:bg-slate-700/50 dark:text-pink-300 dark:hover:bg-[#FF8E9E] py-3.5 rounded-2xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
              >
                <Plus size={18} strokeWidth={3} className="transition-transform group-hover/btn:rotate-90" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}