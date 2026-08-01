import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
function MyOrders() {
  const user = useSelector((state) => state.auth.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    if (!user) {
      setOrders([]);
      return;
    }

    const userOrders = savedOrders.filter(
      (order) => order.customer.email === user.email,
    );

    setOrders([...userOrders].reverse());
  }, [user]);

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-5">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">No Orders Yet</h2>

            <p className="text-gray-500 mt-2">
              Start shopping to place your first order.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-md p-6"
              >
                {/* Header */}

                <div className="flex flex-col md:flex-row justify-between border-b pb-4">
                  <div>
                    <h2 className="text-xl font-bold">Order #{order.id}</h2>

                    <p className="text-gray-500 mt-1">
                      Payment : {order.paymentMethod.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-green-600 text-xl">
                      ₹{order.total}
                    </p>

                    <span className="inline-block mt-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                      Order Placed
                    </span>
                  </div>
                </div>

                {/* Customer */}

                <div className="mt-5">
                  <h3 className="font-semibold">Delivery Address</h3>

                  <p className="text-gray-600">{order.customer.fullName}</p>

                  <p className="text-gray-600">{order.customer.address}</p>

                  <p className="text-gray-600">
                    {order.customer.city}, {order.customer.state} -{" "}
                    {order.customer.pinCode}
                  </p>

                  <p className="text-gray-600">📞 {order.customer.phone}</p>
                </div>

                {/* Items */}

                <div className="mt-6">
                  <h3 className="font-semibold mb-4">Ordered Items</h3>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between border rounded-xl p-3"
                      >
                        <div className="flex gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />

                          <div>
                            <h4 className="font-semibold">{item.name}</h4>

                            <p className="text-gray-500">
                              Qty : {item.quantity}
                            </p>
                          </div>
                        </div>

                        <p className="font-bold text-green-600">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyOrders;
