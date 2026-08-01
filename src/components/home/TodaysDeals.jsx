import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  increaseQty,
  decreaseQty,
} from "../../features/cart/cartSlice";
import products from "../../data/products";

export default function TodaysDeals() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  // Only show products with a discount
  const deals = products.filter((item) => item.discount);

  return (
    <section className="py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Today's Deals</h2>

          <p className="text-gray-500 mt-2">Best discounts available today</p>
        </div>

        <Link
          to="/category"
          className="text-green-600 font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Products */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.slice(0, 4).map((product) => {
          const cartItem = cartItems.find((item) => item.id === product.id);

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow hover:shadow-xl transition duration-300 overflow-hidden group relative"
            >
              {/* Discount */}
              <span className="absolute z-10 bg-red-500 text-white px-3 py-1 text-xs rounded-br-xl">
                {product.discount}
              </span>

              <Link to={`/product/${product.id}`}>
                <div className="w-full relative overflow-hidden bg-gray-100 h-52 flex justify-center items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-52 w-full object-cover object-contain group-hover:scale-110 duration-300"
                  />
                </div>
              </Link>

              <div className="p-5">
                <p className="text-gray-400 text-sm">{product.weight}</p>

                <h3 className="font-bold text-lg mt-1">{product.name}</h3>

                <div className="flex items-center mt-2">
                  ⭐ {product.rating}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <p className="text-green-600 text-xl font-bold">
                      ₹{product.price}
                    </p>

                    <p className="line-through text-gray-400 text-sm">
                      ₹{product.oldPrice}
                    </p>
                  </div>

                  {cartItem ? (
                    <div className="flex items-center justify-between bg-green-600 rounded-lg overflow-hidden">
                      <button
                        onClick={() => dispatch(decreaseQty(product.id))}
                        className="px-3 py-2 text-white text-lg"
                      >
                        −
                      </button>

                      <span className="px-3 text-white font-bold">
                        {cartItem.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQty(product.id))}
                        className="px-3 py-2 text-white text-lg"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => dispatch(addToCart(product))}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
