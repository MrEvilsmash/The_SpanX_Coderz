import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate checkout
    console.log("Order Details:", { ...form, cartItems, totalPrice });
    clearCart();
    setOrderPlaced(true);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <p className="p-6 text-center text-gray-500 text-lg">
        Your cart is empty.
      </p>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto p-6 text-center bg-green-100 rounded-md mt-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">
          Thank you for your order!
        </h2>
        <p>Your order has been placed successfully.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">
        Your Cart
      </h1>

      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li
            key={item._id}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between py-4"
          >
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mr-6 mb-4 sm:mb-0"
              />
            )}

            <div className="flex-1">
              <p className="text-xl font-semibold text-gray-900">
                {item.name}
              </p>

              <div className="mt-2 flex items-center space-x-4">
                <label htmlFor={`qty-${item._id}`} className="font-medium">
                  Qty:
                </label>
                <input
                  id={`qty-${item._id}`}
                  type="number"
                  min="1"
                  max="10"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item._id, Number(e.target.value))
                  }
                  className="w-16 p-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:text-red-800 font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>

            <div className="text-lg font-semibold text-indigo-700 mt-3 sm:mt-0">
              ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center border-t pt-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Total: ₹{totalPrice.toLocaleString()}
        </h2>
        {!showCheckout ? (
          <button
            onClick={() => setShowCheckout(true)}
            className="mt-4 sm:mt-0 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
          >
            Proceed to Checkout
          </button>
        ) : null}
      </div>

      {showCheckout && (
        <div className="mt-8 border-t pt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Checkout Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
