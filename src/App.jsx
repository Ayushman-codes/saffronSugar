// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartProvider, CartContext } from "./context/CartContext";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Admin from "./pages/Admin";
import Login from "./pages/Login"; // <-- Import Login
import ThemeToggle from "./components/ThemeToggle";

// --- SECURITY WRAPPER ---
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// --- NEW FOOTER ---
const Footer = () => (
  <footer className="bg-amber-100 dark:bg-slate-800 text-center py-8 border-t border-amber-200 dark:border-slate-700 transition-colors">
    <p className="text-gray-600 dark:text-slate-400 text-sm">
      © 2026 Saffron Sugar. All rights reserved.
    </p>
    <Link
      to="/login"
      className="text-xs text-amber-500 hover:text-amber-700 dark:text-slate-500 dark:hover:text-amber-400 mt-3 inline-block transition"
    >
      Admin Portal
    </Link>
  </footer>
);

// --- EXISTING COMPONENTS ---
const Home = () => (
  <div className="p-8 max-w-4xl mx-auto text-center mt-20">
    <h1 className="text-6xl font-extrabold text-amber-900 dark:text-amber-300 mb-6 tracking-tight">
      Saffron Sugar
    </h1>
    <p className="text-2xl text-gray-700 dark:text-slate-300 mb-10">
      Crafting premium, 100% eggless cakes and custom delights for your special
      moments.
    </p>
    <Link
      to="/menu"
      className="bg-amber-600 text-white px-10 py-4 rounded-full hover:bg-amber-700 transition shadow-lg text-lg font-bold"
    >
      Explore Our Menu
    </Link>
  </div>
);

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center p-5 bg-amber-100 dark:bg-slate-800 border-b border-amber-200 dark:border-slate-700 shadow-sm transition-colors">
      <div className="space-x-6 flex items-baseline">
        <Link
          to="/"
          className="font-extrabold text-2xl text-amber-900 dark:text-amber-300 tracking-tight"
        >
          Saffron Sugar
        </Link>
        <Link
          to="/menu"
          className="hover:text-amber-700 dark:text-slate-300 dark:hover:text-amber-300 font-medium text-lg transition"
        >
          Menu
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link
          to="/checkout"
          className="flex items-center gap-2 bg-white dark:bg-slate-700 px-5 py-2.5 rounded-full shadow-sm hover:shadow-md hover:bg-amber-50 dark:hover:bg-slate-600 transition"
        >
          <ShoppingCart
            size={20}
            className="text-amber-900 dark:text-amber-300"
          />
          <span className="font-bold text-amber-900 dark:text-amber-300">
            Cart {totalItems > 0 && `(${totalItems})`}
          </span>
        </Link>
      </div>
    </nav>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-amber-50/30 dark:bg-slate-900 transition-colors duration-300">
          <Navbar />
          {/* Main content area flex-grow pushes footer to the bottom */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/login" element={<Login />} />

              {/* The Admin route is now wrapped in the Protector */}
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
  );
}

export default App;
