import { Link } from "react-router-dom";
import {
  FaAppleAlt,
  FaCarrot,
  FaBreadSlice,
  FaCheese,
  FaGlassWhiskey,
  FaShoppingBasket,
} from "react-icons/fa";

const categories = [
  {
    name: "Fruits",
    icon: <FaAppleAlt size={32} />,
    color: "bg-red-100 text-red-600",
  },
  {
    name: "Vegetables",
    icon: <FaCarrot size={32} />,
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Bakery",
    icon: <FaBreadSlice size={32} />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    name: "Dairy",
    icon: <FaCheese size={32} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Drinks",
    icon: <FaGlassWhiskey size={32} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "Groceries",
    icon: <FaShoppingBasket size={32} />,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function HomeCategories() {
  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Shop by Category</h2>

        <Link to="/category" className="text-green-600 font-semibold">
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {categories.map((item) => (
          <Link
            key={item.name}
            to="/category"
            className="bg-white rounded-2xl shadow hover:shadow-xl transition-all duration-300 p-6 text-center group"
          >
            <div
              className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 duration-300`}
            >
              {item.icon}
            </div>

            <h3 className="mt-4 font-semibold">{item.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
