import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-yellow-400">Jewellery Shop</h2>
          <p className="text-sm text-gray-400">
            Discover elegant gold, silver, and diamond jewelry crafted to perfection.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/cart" className="hover:underline">Cart</Link></li>
            <li><Link to="/checkout" className="hover:underline">Checkout</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:underline">FAQs</Link></li>
            <li><Link to="/return-policy" className="hover:underline">Return Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-300">Get in Touch</h3>
          <p className="text-sm text-gray-400">📞 +91 98765 43210</p>
          <p className="text-sm text-gray-400">📧 support@jewelleryshop.in</p>
          <p className="text-sm text-gray-400 mt-2">🏠 Mumbai, India</p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Jewellery Shop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
