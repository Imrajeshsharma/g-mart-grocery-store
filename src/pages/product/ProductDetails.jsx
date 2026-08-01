import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaStar,
  FaTruck,
  FaShoppingCart,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { toggleWishlist } from "../../features/wishlist/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartSlice";

import products from "../../data/products";

function ProductDetails() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const product = products.find((p) => p.id === Number(id));

  const cartItem = cartItems.find((item) => item.id === Number(id));

  const isWishlisted = wishlistItems.some((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold">Product Not Found</h1>

        <Link to="/category" className="text-green-600 mt-5 inline-block">
          ← Back to Category
        </Link>
      </div>
    );
  }

  const relatedProducts = products
    .filter(
      (item) => item.category === product.category && item.id !== product.id,
    )
    .slice(0, 4);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10">
        {/* Breadcrumb */}

        <div className="text-sm text-gray-500 mb-6">
          <Link to="/">Home</Link>

          <span className="mx-2">/</span>

          <Link to="/category">{product.category}</Link>

          <span className="mx-2">/</span>

          <span className="text-green-600">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}

          <div className="bg-white rounded-3xl p-8 shadow">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[450px] object-cover rounded-xl hover:scale-105 duration-300"
            />
          </div>

          {/* Details */}

          <div>
            {product.badge && (
              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                {product.badge}
              </span>
            )}

            <h1 className="text-4xl font-bold mt-4">{product.name}</h1>

            <p className="text-gray-500 mt-2">{product.weight}</p>

            {/* Rating */}

            <div className="flex items-center gap-2 mt-4">
              <FaStar className="text-yellow-400" />

              <span className="font-semibold">{product.rating}</span>

              <span className="text-gray-500">
                ({product.reviews || 120} Reviews)
              </span>
            </div>

            {/* Price */}

            <div className="mt-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-green-600">
                  ₹{product.price}
                </span>

                <span className="line-through text-xl text-gray-400">
                  ₹{product.oldPrice}
                </span>

                {product.discount && (
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                    {product.discount}
                  </span>
                )}
              </div>

              <p className="text-green-600 mt-2 font-semibold">
                You Save ₹{product.oldPrice - product.price}
              </p>
            </div>

            {/* Quantity */}

            {!cartItem && (
              <div className="mt-8">
                <h3 className="font-semibold mb-3">Quantity</h3>

                <div className="flex items-center gap-5">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="w-10 h-10 rounded bg-gray-200 text-xl"
                  >
                    -
                  </button>

                  <span className="text-xl font-bold">{quantity}</span>

                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded bg-green-600 text-white text-xl"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Delivery */}

            <div className="flex items-center gap-3 mt-8 bg-green-50 p-4 rounded-xl">
              <FaTruck className="text-green-600 text-2xl" />

              <div>
                <h4 className="font-semibold">Delivery in 10 Minutes</h4>

                <p className="text-sm text-gray-500">
                  Fresh products delivered fast.
                </p>
              </div>
            </div>

            {/* Description */}

            <div className="mt-8">
              <h2 className="text-2xl font-bold">Description</h2>

              <p className="mt-3 text-gray-600 leading-7">
                Fresh, hand-picked grocery items sourced directly from trusted
                farms. Rich in nutrients and perfect for a healthy lifestyle.
              </p>
            </div>

            {/* Buttons */}

            <div className="flex gap-4 mt-10">
              <button
                onClick={() => dispatch(toggleWishlist(product))}
                className={`border w-14 h-14 rounded-xl flex justify-center items-center duration-300 ${
                  isWishlisted
                    ? "bg-red-500 text-white border-red-500"
                    : "hover:bg-red-500 hover:text-white"
                }`}
              >
                {isWishlisted ? <FaHeart /> : <FaRegHeart />}
              </button>

              {cartItem ? (
                <div className="flex-1 flex items-center justify-between bg-green-600 rounded-xl overflow-hidden">
                  <button
                    onClick={() => dispatch(decreaseQty(product.id))}
                    className="px-6 py-4 text-white text-2xl"
                  >
                    −
                  </button>

                  <span className="text-white text-xl font-bold">
                    {cartItem.quantity}
                  </span>

                  <button
                    onClick={() => dispatch(increaseQty(product.id))}
                    className="px-6 py-4 text-white text-2xl"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      dispatch(addToCart(product));
                    }
                  }}
                  className="flex-1 bg-green-600 text-white rounded-xl py-4 flex justify-center items-center gap-3 hover:bg-green-700"
                >
                  <FaShoppingCart />
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}

        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Related Products</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.id}
                to={`/product/${item.id}`}
                className="bg-white rounded-2xl p-4 shadow hover:shadow-lg duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-40 w-full object-contain"
                />

                <h3 className="font-semibold mt-3">{item.name}</h3>

                <p className="text-green-600 font-bold mt-2">₹{item.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
