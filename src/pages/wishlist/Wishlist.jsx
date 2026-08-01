import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartSlice";
import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto py-10 px-5">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-xl p-10 text-center">
            <h2 className="text-2xl font-bold">Your Wishlist is Empty</h2>

            <Link to="/category" className="text-green-600 mt-5 inline-block">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => {
              const cartItem = cartItems.find((cart) => cart.id === item.id);

              return (
                <div key={item.id} className="bg-white rounded-xl shadow p-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-48 w-full object-contain"
                  />

                  <h2 className="text-lg font-bold mt-4">{item.name}</h2>

                  <p className="text-green-600 font-bold mt-2">₹{item.price}</p>

                  <div className="flex gap-3 mt-5">
                    {cartItem ? (
                      <div className="flex items-center justify-between flex-1 bg-green-600 rounded-lg overflow-hidden">
                        <button
                          onClick={() => dispatch(decreaseQty(item.id))}
                          className="px-4 py-2 text-white text-xl"
                        >
                          −
                        </button>

                        <span className="text-white font-bold">
                          {cartItem.quantity}
                        </span>

                        <button
                          onClick={() => dispatch(increaseQty(item.id))}
                          className="px-4 py-2 text-white text-xl"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => dispatch(addToCart(item))}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                      >
                        Move to Cart
                      </button>
                    )}

                    <button
                      onClick={() => dispatch(removeFromWishlist(item.id))}
                      className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
