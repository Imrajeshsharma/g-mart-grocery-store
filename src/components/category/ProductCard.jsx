import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartSlice";

import { toggleWishlist } from "../../features/wishlist/wishlistSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const cartItem = cartItems.find((item) => item.id === product.id);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  return (
    <div className="relative group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl duration-300">
      {product.discount && (
        <span className="absolute left-3 top-12 bg-red-500 text-white text-xs px-2 py-1 rounded-lg z-10">
          {product.discount}% OFF
        </span>
      )}

      {product.badge && (
        <div className="absolute top-3 left-3 z-20 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
          {product.badge}
        </div>
      )}

      <button
        onClick={() => dispatch(toggleWishlist(product))}
        className="absolute top-3 right-3 z-20 bg-white rounded-full p-2 shadow-md hover:scale-110 duration-300"
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500 text-lg" />
        ) : (
          <FaRegHeart className="text-gray-700 text-lg" />
        )}
      </button>

      <div className="relative overflow-hidden bg-gray-100">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-56 w-full object-cover group-hover:rotate-2 group-hover:scale-110 duration-500"
          />
        </Link>
      </div>

      <div className="p-5">
        <p className="text-gray-400 text-sm">{product.weight}</p>

        <h2 className="font-bold text-lg mt-1">{product.name}</h2>

        <div className="flex items-center">
          <div className="text-yellow-500">★★★★★</div>
          <span className="ml-2">{product.rating}</span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-green-600">
              ₹{product.price}
            </span>

            <span className="text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          </div>

          <p className="text-sm text-red-500 font-medium mt-1">
            Save ₹{product.oldPrice - product.price}
          </p>
        </div>

        {cartItem ? (
          <div className="flex items-center justify-between bg-green-600 rounded-lg overflow-hidden">
            <button
              onClick={() => dispatch(decreaseQty(product.id))}
              className="px-4 py-2 text-white text-xl cursor-pointer"
            >
              −
            </button>

            <span className="text-white font-bold">{cartItem.quantity}</span>

            <button
              onClick={() => dispatch(increaseQty(product.id))}
              className="px-4 py-2 text-white text-xl cursor-pointer"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch(addToCart(product))}
            className="w-full bg-green-600 text-white py-2 rounded-lg cursor-pointer"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
