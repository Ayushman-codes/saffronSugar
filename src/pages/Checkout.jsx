// src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react"; 

export default function Checkout() {
  const { cartItems, getCartTotal, removeFromCart } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Success Screen
  if (orderPlaced) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto mt-12">
        <h1 className="text-4xl font-bold text-[#4A2B23] dark:text-white mb-4">
          Order Received!
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Thank you for choosing Saffron Sugar. We will begin preparing your
          premium eggless delights shortly and reach out to confirm pickup.
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-block bg-[#FF8E9E] text-white font-bold px-8 py-3 rounded-full hover:bg-[#FF7A8E] transition shadow-md hover:scale-105"
        >
          Back to Menu
        </Link>
      </div>
    );
  }

  // Empty Cart Screen
  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center mt-12">
        <h1 className="text-3xl font-bold text-[#4A2B23] dark:text-white mb-4">
          Your Cart is Empty
        </h1>
        
        <p className="mb-8 text-gray-600 dark:text-slate-400">
          Looks like you haven't selected any cakes yet!
        </p>
        <Link
          to="/menu"
          className="bg-[#FF8E9E] text-white font-bold px-8 py-3 rounded-full hover:bg-[#FF7A8E] transition shadow-md hover:scale-105 inline-block"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // Function to handle the WhatsApp message
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const phone = formData.get("phone");
    const address = formData.get("address"); // <-- EXTRACT ADDRESS FROM FORM
    const date = formData.get("date");

    // Create order string
    const orderDetails = cartItems
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(", ");
    
    // <-- ADDED ADDRESS TO THE WHATSAPP MESSAGE TEMPLATE
    const message = `Hello! I would like to place an order for Saffron Sugar:\n\nItems: ${orderDetails}\nTotal: ₹${getCartTotal().toFixed(2)}\n\nPickup Date: ${date}\nName: ${name}\nPhone: ${phone}\nAddress: ${address}`;

    // Your phone number
    const phoneNumber = "917903241392";

    // Open WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );

    setOrderPlaced(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
      <div>
        <h2 className="text-2xl font-bold text-[#4A2B23] dark:text-white mb-6 font-serif">
          Order Summary
        </h2>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[1.5rem] shadow-sm border border-[#FFF0F2] dark:border-slate-700">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b border-gray-100 dark:border-slate-700 py-4 last:border-0 gap-4"
            >
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-white truncate">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
              </div>

              <div className="flex items-center gap-4 shrink-0">
                <span className="font-bold text-gray-800 dark:text-white">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-red-500 hover:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/20 rounded-xl transition-all cursor-pointer flex items-center justify-center"
                  title="Remove Item"
                  type="button"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center text-xl font-bold text-[#4A2B23] dark:text-white">
            <span>Total</span> <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-[#4A2B23] dark:text-white mb-6 font-serif">
          Pickup Details
        </h2>
        <form
          className="bg-white dark:bg-slate-800 p-6 rounded-[1.5rem] shadow-sm border border-[#FFF0F2] dark:border-slate-700 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF8E9E]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="(555) 000-0000"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF8E9E]"
            />
          </div>

          {/* --- NEW ADDRESS FIELD ADDED HERE --- */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Delivery / Pickup Address
            </label>
            <textarea
              name="address"
              required
              rows="2"
              placeholder="Enter your full address"
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF8E9E] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Requested Pickup Date
            </label>
            <input
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]} 
              className="w-full border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#FF8E9E] dark:[color-scheme:dark]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FF8E9E] text-white font-bold text-lg py-3 rounded-xl hover:bg-[#FF7A8E] transition shadow-md mt-6 hover:-translate-y-1"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}