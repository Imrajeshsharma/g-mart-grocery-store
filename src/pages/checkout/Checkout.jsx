import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../features/orders/ordersSlice";

function Checkout() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // const totalItems = cartItems.reduce(
  //   (total, item) => total + item.quantity,
  //   0,
  // );

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const navigate = useNavigate();

  //   const subtotal = cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0,
  //   );

  const placeOrder = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.pinCode
    ) {
      alert("Please fill all details");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is Empty");
      return;
    }
    const orderId = crypto.randomUUID();

    const order = {
      id: orderId,
      customer: formData,
      paymentMethod,
      items: [...cartItems], // recommended: save a snapshot
      total,
      orderDate: new Date().toLocaleString(), // optional but useful
      status: "Order Placed", // optional but useful
    };

    dispatch(addOrder(order));
    dispatch(clearCart());

    navigate("/order-success");
  };

  const delivery = subtotal >= 500 ? 0 : 40;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + delivery + gst;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}

        <h1 className="text-4xl font-bold text-gray-800 mb-8">Checkout</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Details */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6">Customer Details</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}

              <div>
                <label className="font-medium">Full Name</label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Email */}

              <div>
                <label className="font-medium">Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Phone */}

              <div>
                <label className="font-medium">Phone Number</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* City */}

              <div>
                <label className="font-medium">City</label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            {/* Address */}

            <div className="mt-5">
              <label className="font-medium">Address</label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House No, Street, Area"
                className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* State & Pin */}

            <div className="grid md:grid-cols-2 gap-5 mt-5">
              <div>
                <label className="font-medium">State</label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter State"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="font-medium">PIN Code</label>

                <input
                  type="number"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  placeholder="123456"
                  className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-5">Payment Method</h2>

            <div className="space-y-4">
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>

              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>
            </div>
          </div>

          {/* Order Summary Placeholder */}

          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold mb-5">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between border-b pb-3"
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{item.name}</h3>

                          <p className="text-sm text-gray-500">
                            Qty : {item.quantity}
                          </p>
                        </div>
                      </div>

                      <span className="font-bold text-green-600">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t pt-5 space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>

                    <span className="text-green-600">
                      {delivery === 0 ? "FREE" : `₹${delivery}`}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span>₹{gst}</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>

                    <span className="text-green-600">₹{total}</span>
                  </div>
                </div>

                {subtotal < 500 && (
                  <p className="mt-5 text-sm text-orange-500">
                    Add ₹{500 - subtotal} more for FREE Delivery 🚚
                  </p>
                )}

                <button
                  onClick={placeOrder}
                  className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
