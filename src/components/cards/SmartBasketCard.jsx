import "../../style/SmartBasketCard.css";
import { Heart, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartSlice";

import { toggleWishlist } from "../../features/wishlist/wishlistSlice";

export default function SmartBasketCard({ product }) {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartItems = useSelector((state) => state.cart.items);

  const isWishlisted = wishlistItems.some((item) => item.id === product.id);

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="basket-card">
      {product.discount && (
        <span className="absolute left-4 top-14 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-lg">
          {product.discount}
        </span>
      )}

      {product.badge && <span className="product-badge">{product.badge}</span>}

      {/* Wishlist */}
      <button
        className="wishlist-btn"
        onClick={() => dispatch(toggleWishlist(product))}
      >
        <Heart
          size={18}
          fill={isWishlisted ? "red" : "none"}
          color={isWishlisted ? "red" : "black"}
        />
      </button>

      {/* Product Image */}
      <div className="product-image">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>

      {/* Product Info */}
      <div className="product-info">
        <span className="delivery-time">⚡ {product.delivery}</span>

        <h3>{product.name}</h3>

        <p className="weight">{product.weight}</p>

        <p className="rating">⭐ {product.rating}</p>

        <div className="price-row">
          <div>
            <h4>₹{product.price}</h4>

            <span>₹{product.oldPrice}</span>

            <small className="save-money">
              Save ₹{product.oldPrice - product.price}
            </small>
          </div>

          {cartItem ? (
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                className="px-2 py-1"
                onClick={() => dispatch(decreaseQty(product.id))}
              >
                <Minus size={16} />
              </button>

              <span className="px-3 font-semibold">{cartItem.quantity}</span>

              <button
                className="px-2 py-1"
                onClick={() => dispatch(increaseQty(product.id))}
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              className="add-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
