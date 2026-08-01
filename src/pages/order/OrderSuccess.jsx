import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

function OrderSuccess() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg">
        <FaCheckCircle className="text-green-500 mx-auto" size={90} />

        <h1 className="text-4xl font-bold mt-6">Order Placed!</h1>

        <p className="text-gray-500 mt-4">
          Thank you for shopping with G-Mart.
        </p>

        <p className="text-gray-500">Your groceries will arrive soon 🚚</p>

        <Link
          to="/"
          className="inline-block mt-8 bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
