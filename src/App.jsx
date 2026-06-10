// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { ShoppingCart, CakeSlice, Menu as MenuIcon, X } from "lucide-react";
import { useContext, useState } from "react";
import { CartProvider, CartContext } from "./context/CartContext";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ThemeToggle from "./components/ThemeToggle";
// Add this import near the top:
import { MenuProvider } from "./context/MenuContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const Footer = () => (
  <footer className="bg-[#FFF5F6] dark:bg-slate-950 text-center py-10 mt-12 transition-colors">
    <p className="text-[#8A6A61] dark:text-slate-400 text-sm font-medium">
      © 2026 Saffron Sugar. Baked with love.
    </p>
    <Link
      to="/login"
      className="text-xs text-[#FF8E9E] hover:text-[#FF7A8E] dark:text-slate-500 mt-4 inline-block transition font-semibold"
    >
      Admin Portal
    </Link>
  </footer>
);

const Home = () => (
  <div className="relative overflow-hidden min-h-[85vh] flex items-center">
    {/* Soft glowing background blobs */}
    <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-pink-200/40 rounded-full blur-3xl mix-blend-multiply"></div>
    <div className="absolute bottom-[-10%] left-[-5%] w-72 h-72 bg-orange-100/50 rounded-full blur-3xl mix-blend-multiply"></div>

    <div className="p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
      <div className="text-left space-y-6">
        <span className="inline-block py-1.5 px-4 rounded-full bg-pink-100 text-pink-500 text-sm font-bold tracking-widest uppercase mb-2">
          100% Eggless
        </span>
        
       {/* NUCLEAR FIX: Using inline style={{ color: "..." }} completely overrides everything else */}
        <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.1] font-serif" style={{ color: "#4A2B23" }}>
          Sweeten Your <br />
          <span style={{ color: "#FF8E9E" }}>Special</span> Moments
        </h1>
        
        <p className="text-lg max-w-md leading-relaxed font-medium" style={{ color: "#4B5563" }}>
          Crafting premium, handcrafted cakes and custom delights. Freshly baked
          daily for the perfect taste and texture.
        </p>
        
        <div className="pt-6 flex flex-wrap gap-4">
          <Link to="/menu" className="btn-primary px-8 py-4 text-lg">
            Order Now
          </Link>
          <Link to="/menu" className="btn-secondary px-8 py-4 text-lg">
            View Menu
          </Link>
        </div>
      </div>

      {/* Featured Image Section */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-200 to-orange-100 rounded-full transform rotate-6 scale-105 -z-10"></div>
        <img
          src="/src/assets/custom-cake10.jpeg"
          alt="Featured Cake"
          className="w-full max-w-md mx-auto rounded-[2.5rem] shadow-2xl object-cover h-[550px] border-8 border-white transition-transform duration-700 hover:scale-[1.02]"
        />
        <div
          className="absolute top-12 -left-8 bg-slate-900 p-4 rounded-2xl shadow-xl animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <p className="text-sm font-bold text-white flex items-center gap-2">
            ⭐ 4.9/5 Rating
          </p>
        </div>
      </div>
    </div>
  </div>
);

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-40 glass-nav flex justify-between items-center px-6 py-4 transition-colors">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2.5 rounded-full bg-[#FFF0F2] dark:bg-slate-800 text-[#FF8E9E] hover:bg-[#FF8E9E] hover:text-white transition-all shadow-sm"
            aria-label="Open Menu"
          >
            <MenuIcon size={24} />
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-extrabold text-2xl text-[#4A2B23] dark:text-white font-serif ml-2"
          >
            <div className="p-2 bg-[#FF8E9E] rounded-xl text-white shadow-md">
              <CakeSlice size={20} />
            </div>
            <span className="hidden sm:block">Saffron Sugar</span>
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 md:gap-4">
          <ThemeToggle />
          <Link
            to="/checkout"
            className="flex items-center gap-3 bg-[#FFF0F2] dark:bg-slate-800 px-5 py-2.5 rounded-full hover:bg-[#FF8E9E] hover:text-white dark:hover:bg-slate-700 transition-all text-[#FF8E9E] shadow-sm group"
          >
            <div className="relative">
              <ShoppingCart size={20} className="transition-colors" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#4A2B23] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full group-hover:bg-white group-hover:text-[#FF8E9E]">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="font-bold hidden sm:block">Cart</span>
          </Link>
        </div>
      </nav>

      {/* --- SIDEBAR DRAWER --- */}
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#4A2B23]/20 dark:bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 z-50 shadow-[20px_0_40px_rgba(0,0,0,0.05)] transform transition-transform duration-500 ease-in-out flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-6 border-b border-[#FCEAEA] dark:border-slate-800">
          <div className="flex items-center gap-2 font-extrabold text-xl text-[#4A2B23] dark:text-white font-serif">
            <CakeSlice size={20} className="text-[#FF8E9E]" />
            Menu
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 rounded-full text-[#8A6A61] hover:bg-[#FFF0F2] hover:text-[#FF8E9E] dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-6 overflow-y-auto">
          <Link 
            to="/" 
            onClick={() => setIsSidebarOpen(false)}
            className="text-lg font-semibold text-[#8A6A61] dark:text-slate-300 hover:text-[#FF8E9E] hover:bg-[#FFF0F2] dark:hover:bg-slate-800 p-4 rounded-2xl transition-all"
          >
            Home
          </Link>
          <Link 
            to="/menu" 
            onClick={() => setIsSidebarOpen(false)}
            className="text-lg font-semibold text-[#8A6A61] dark:text-slate-300 hover:text-[#FF8E9E] hover:bg-[#FFF0F2] dark:hover:bg-slate-800 p-4 rounded-2xl transition-all"
          >
            Our Menu
          </Link>
          <Link 
            to="/checkout" 
            onClick={() => setIsSidebarOpen(false)}
            className="text-lg font-semibold text-[#8A6A61] dark:text-slate-300 hover:text-[#FF8E9E] hover:bg-[#FFF0F2] dark:hover:bg-slate-800 p-4 rounded-2xl transition-all"
          >
            Your Cart ({totalItems})
          </Link>
          
          <div className="mt-8 pt-8 border-t border-[#FCEAEA] dark:border-slate-800">
             <Link 
              to="/login" 
              onClick={() => setIsSidebarOpen(false)}
              className="text-sm font-semibold text-[#FF8E9E] hover:text-[#FF7A8E] p-4 inline-block transition-colors"
            >
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

// src/App.jsx
function App() {
  return (
    <MenuProvider>
      <CartProvider>
        <Router>
          {/* ADD THE BACKGROUND AND TEXT CLASSES HERE */}
          <div className="flex flex-col min-h-screen bg-[#FFFBF9] dark:bg-slate-900 text-[#4A2B23] dark:text-slate-100 transition-colors duration-300">
            <ToastContainer position="top-right" autoClose={3000} />
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </MenuProvider>
  );
}



export default App;