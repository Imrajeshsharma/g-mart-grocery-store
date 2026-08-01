import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const delivery = subtotal > 0 ? 40 : 0;

  const discount = subtotal >= 500 ? 20 : 0;

  const total = subtotal + delivery - discount;
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-5 py-10">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left */}

          <div className="lg:col-span-2 space-y-5">
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-xl p-10 text-center">
                <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-5 flex justify-between items-center"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={item.image}
                      className="w-24 h-24 rounded-lg object-cover"
                      alt=""
                    />

                    <div>
                      <h2 className="font-bold text-lg">{item.name}</h2>

                      <p>{item.weight}</p>

                      <p className="text-green-600 font-bold">₹{item.price}</p>
                    </div>
                  </div>

                  {/* Quantity */}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => dispatch(decreaseQty(item.id))}
                      className="bg-gray-200 px-3 py-1 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(increaseQty(item.id))}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Right */}

          <div className="bg-white rounded-xl p-6 h-fit">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            <div className="flex justify-between py-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between py-2">
              <span>Delivery</span>
              <span>₹{delivery}</span>
            </div>

            <div className="flex justify-between py-2 text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-bold text-xl">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/checkout"
              className="w-full bg-green-600 text-white py-3 rounded-xl text-center block hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
