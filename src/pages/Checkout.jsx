import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();

  // User info state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  if (cartItems.length === 0 && !orderPlaced) {
    return <p className="p-6 text-center text-gray-500 text-lg">Your cart is empty.</p>;
  }

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Email is invalid';
    if (!formData.street.trim()) newErrors.street = 'Street is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s+/g, '')))
      newErrors.cardNumber = 'Card number must be 16 digits';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Simulate order placement
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <div className="max-w-md mx-auto p-6 text-center bg-green-100 rounded-md mt-8">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Order Confirmed!</h2>
        <p>Thank you for your purchase, {formData.name}.</p>
        <p>We will ship your items to:</p>
        <p className="mt-2 font-semibold">
          {formData.street}, {formData.city}, {formData.state} - {formData.zip}
        </p>
        <p className="mt-4">A confirmation email has been sent to {formData.email}.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 text-center">Checkout</h1>

      <div className="mb-6 border p-4 rounded-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-gray-200 max-h-60 overflow-auto mb-4">
          {cartItems.map((item) => (
            <li key={item._id} className="py-2 flex justify-between">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>₹{(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>
        <p className="font-bold text-lg text-right">
          Total: ₹{totalPrice.toLocaleString()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Street */}
        <div>
          <label htmlFor="street" className="block font-medium mb-1">
            Street Address
          </label>
          <input
            id="street"
            name="street"
            type="text"
            value={formData.street}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.street ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.street && (
            <p className="text-red-600 text-sm mt-1">{errors.street}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label htmlFor="city" className="block font-medium mb-1">
            City
          </label>
          <input
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.city ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.city && (
            <p className="text-red-600 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        {/* State */}
        <div>
          <label htmlFor="state" className="block font-medium mb-1">
            State
          </label>
          <input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.state ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.state && (
            <p className="text-red-600 text-sm mt-1">{errors.state}</p>
          )}
        </div>

        {/* ZIP */}
        <div>
          <label htmlFor="zip" className="block font-medium mb-1">
            ZIP Code
          </label>
          <input
            id="zip"
            name="zip"
            type="text"
            value={formData.zip}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.zip ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.zip && (
            <p className="text-red-600 text-sm mt-1">{errors.zip}</p>
          )}
        </div>

        {/* Card Number */}
        <div>
          <label htmlFor="cardNumber" className="block font-medium mb-1">
            Card Number
          </label>
          <input
            id="cardNumber"
            name="cardNumber"
            type="text"
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            value={formData.cardNumber}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:outline-none ${
              errors.cardNumber ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cardNumber && (
            <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
