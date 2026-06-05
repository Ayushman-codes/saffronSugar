// src/pages/Checkout.jsx
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Checkout() {
  const { cartItems, getCartTotal } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Success Screen
  if (orderPlaced) {
    return (
      <div className="p-8 text-center max-w-lg mx-auto mt-12">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          Order Received!
        </h1>
        <p className="text-lg text-gray-700">
          Thank you for choosing Saffron Sugar. We will begin preparing your
          premium eggless delights shortly and reach out to confirm pickup.
        </p>
        <Link
          to="/menu"
          className="mt-8 inline-block bg-amber-600 text-white px-8 py-3 rounded-full hover:bg-amber-700 transition shadow-sm"
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
        <h1 className="text-3xl font-bold text-amber-900 mb-4">
          Your Cart is Empty
        </h1>
        
        <p className="mb-8 text-gray-600 dark:text-slate-300">
          Looks like you haven't selected any cakes yet!
        </p>
        <Link
          to="/menu"
          className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 transition shadow-sm"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  // Function to handle the WhatsApp message
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submit button clicked!"); // Check your browser console!

    const formData = new FormData(e.target);
    const name = formData.get("name");

    console.log("Data found:", name);

    // Get form data
    const phone = formData.get("phone");
    const date = formData.get("date");

    // Create order string
    const orderDetails = cartItems
      .map((item) => `${item.name} (x${item.quantity})`)
      .join(", ");
    const message = `Hello! I would like to place an order for Saffron Sugar:\n\nItems: ${orderDetails}\nTotal: ₹${getCartTotal().toFixed(2)}\n\nPickup Date: ${date}\nName: ${name}\nPhone: ${phone}`;

    // Change this to your actual phone number (include country code, e.g., 91 for India)
    const phoneNumber = "917903241392";

    // Open WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
    );

    setOrderPlaced(true);
  };
  <form className="..." onSubmit={handleSubmit}></form>;

  return (
    <div className="p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-2xl font-bold text-amber-900 mb-6">
          Order Summary
        </h2>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-amber-100">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4 last:border-0"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-bold text-gray-800">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
          <div className="mt-6 pt-6 border-t flex justify-between items-center text-xl font-bold text-amber-900">
            <span>Total</span> <span>₹{getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-amber-900 mb-6">
          Pickup Details
        </h2>
        <form
          className="bg-white p-6 rounded-xl shadow-sm border border-amber-100 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              name="name"
              type="text"
              required
              placeholder="Jane Doe"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              type="tel"
              required
              placeholder="(555) 000-0000"
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Requested Pickup Date
            </label>
            <input
              name="date"
              type="date"
              required
              min={new Date().toISOString().split("T")[0]} // This forces the minimum date to be today
              className="w-full border border-gray-300 rounded-lg p-3"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-amber-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-amber-700 transition shadow-md mt-6"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
