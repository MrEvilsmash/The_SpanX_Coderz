import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import allProducts from '../data/products';
import ReactImageMagnify from 'react-image-magnify';
import { FaTruck, FaUndoAlt, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p._id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  // Sample daily gold rate (replace with API call later)
  const dailyGoldRate = 5500; // per gram in ₹

  // Reviews state (use backend data here later)
  const [reviews, setReviews] = useState(
    product.reviews || [
      { id: 1, name: 'Alice', rating: 5, comment: 'Amazing quality!' },
      { id: 2, name: 'Bob', rating: 4, comment: 'Pretty good, worth the price.' },
    ]
  );
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [newName, setNewName] = useState('');

  if (!product) return <p>Product not found.</p>;

  const relatedProducts = allProducts.filter(
    (p) =>
      (p.brand === product.brand || p.material === product.material) &&
      p._id !== product._id
  );

  // Calculate average rating rounded to 1 decimal place
  const averageRating =
    reviews.length
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} x ${product.name} added to cart!`);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (newRating === 0 || newComment.trim() === '' || newName.trim() === '') {
      alert('Please provide your name, rating, and comment.');
      return;
    }

    const newReview = {
      id: Date.now(),
      name: newName.trim(),
      rating: newRating,
      comment: newComment.trim(),
    };

    setReviews([newReview, ...reviews]);
    setNewRating(0);
    setNewComment('');
    setNewName('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-10">
      {/* Top Section: Image + Product Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border p-4 rounded cursor-zoom-in">
          <ReactImageMagnify
            {...{
              smallImage: {
                alt: product.name,
                isFluidWidth: true,
                src: product.image,
              },
              largeImage: {
                src: product.image,
                width: 1200,
                height: 1200,
              },
            }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-2">Brand: {product.brand}</p>

          {/* Display daily gold rate */}
          <p className="text-sm text-gray-500 mb-2">
            Daily Gold Rate: <strong>₹{dailyGoldRate} / g</strong>
          </p>

          <p className="text-xl font-bold text-red-600 mb-2">₹{product.price}</p>

          <div className="mb-4 text-sm text-gray-700 space-y-1">
            <p>
              Material: <strong>{product.material}</strong>
            </p>
            <p>
              Purity: <strong>{product.purity}</strong>
            </p>
            <p>
              Weight: <strong>{product.weight} g</strong>
            </p>
            {product.sizes?.length > 0 && (
              <p>Sizes: {product.sizes.join(', ')}</p>
            )}
          </div>

          <p className="mb-4 text-gray-700 leading-relaxed">
            {product.description ||
              'This is a beautifully crafted piece, perfect for any occasion.'}
          </p>

          <div className="flex items-center mb-4 space-x-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val > 0) setQuantity(val);
                else setQuantity(1);
              }}
              className="w-16 border rounded px-2 py-1"
            />
          </div>

          <button
            onClick={handleAddToCart}
            disabled={quantity < 1}
            className={`${
              quantity < 1
                ? 'bg-yellow-300 cursor-not-allowed'
                : 'bg-yellow-500 hover:bg-yellow-600'
            } text-white px-4 py-2 rounded`}
          >
            Add to Cart
          </button>

          <div className="mt-6 text-sm text-gray-700 space-y-3">
            <div className="flex items-center">
              <FaTruck className="text-green-600 mr-2" />
              Free delivery in 3-5 business days
            </div>
            <div className="flex items-center">
              <FaUndoAlt className="text-blue-500 mr-2" />
              Easy 7-day return policy
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Reviews & Related Products */}
      <div className="space-y-10">
        {/* Reviews Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>

          {/* Average rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`mr-1 ${
                  i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {averageRating} stars ({reviews.length} reviews)
            </span>
          </div>

          {/* Reviews List */}
          <div className="max-h-48 overflow-y-auto border rounded p-3 space-y-3 text-sm text-gray-700">
            {reviews.length === 0 && (
              <p>No reviews yet. Be the first to review!</p>
            )}
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-2 last:border-b-0">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`mr-1 ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 font-semibold">{review.name}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>

          {/* Add Review Form */}
          <form onSubmit={handleReviewSubmit} className="mt-4 space-y-3 max-w-md">
            <h3 className="font-semibold">Write a Review</h3>

            <input
              type="text"
              placeholder="Your Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />

            <div className="flex items-center space-x-2">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`cursor-pointer ${
                    i < newRating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  onClick={() => setNewRating(i + 1)}
                />
              ))}
            </div>

            <textarea
              placeholder="Your Review"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
              rows={3}
            />

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Submit Review
            </button>
          </form>
        </section>

        {/* Related Products Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                className="border rounded p-4 hover:shadow-lg transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-red-600 font-bold">₹{item.price}</p>
                <button
                  onClick={() => addToCart(item, 1)}
                  className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
