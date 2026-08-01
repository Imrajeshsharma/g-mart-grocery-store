import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { FaFilter, FaThLarge } from "react-icons/fa";
import ProductCard from "../../components/category/ProductCard";
import categoryData from "../../data/products";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleWishlist } from "../../features/wishlist/wishlistSlice";

const Category = () => {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [sortBy, setSortBy] = useState("default");
  const [selectedRating, setSelectedRating] = useState(0);

  // const dispatch = useDispatch();

  // const wishlistItems = useSelector((state) => state.wishlist.items);

  const products = useMemo(() => {
    let data = [...categoryData];

    // Search Filter
    data = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );

    // Category Filter
    if (selectedCategory !== "All") {
      data = data.filter((item) => item.category === selectedCategory);
    }

    // Price Filter
    data = data.filter((item) => item.price <= maxPrice);

    // Rating Filter
    if (selectedRating > 0) {
      data = data.filter((item) => item.rating >= selectedRating);
    }

    // Sorting
    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return data;
  }, [search, selectedCategory, maxPrice, sortBy, selectedRating]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-5 py-5">
        <div className="text-sm text-gray-500">
          <Link to="/" className="hover:text-green-600">
            Home
          </Link>

          <span className="mx-2">/</span>

          <span className="text-green-600 font-medium">
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </span>
        </div>
      </div>

      {/* Banner */}
      <div className="max-w-7xl mx-auto px-5">
        <div className="rounded-3xl bg-gradient-to-r from-green-100 via-green-50 to-yellow-50 p-10 flex justify-between items-center overflow-hidden">
          <div>
            <h1 className="text-5xl font-bold text-green-700">
              {selectedCategory === "All"
                ? "All Products"
                : `Fresh ${selectedCategory}`}
            </h1>

            <p className="mt-3 text-gray-600 text-lg">
              Fresh • Organic • Healthy
            </p>

            <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 duration-300">
              Shop Now
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900"
            alt=""
            className="hidden lg:block w-80 h-56 object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="bg-white rounded-2xl shadow-sm p-6 h-fit">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-xl">Filters</h2>
              <FaFilter className="text-green-600" />
            </div>

            <hr className="my-5" />

            <h3 className="font-semibold mb-4">Categories</h3>

            <div className="space-y-2">
              {[
                "All",
                "Fruits",
                "Vegetables",
                "Dairy",
                "Cold drink",
                "Bakery",
                "Coffie",
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="block hover:text-green-600 cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>

            <h3 className="font-semibold mb-3 pt-4">Price</h3>

            <input
              type="range"
              min="50"
              max="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-green-600 cursor-pointer"
            />

            <p className="mt-3 font-semibold">Max Price : ₹{maxPrice}</p>

            <hr className="my-6" />

            <h3 className="font-semibold mb-3">Rating</h3>

            {[4, 3, 2].map((rating) => (
              <button
                key={rating}
                onClick={() => setSelectedRating(rating)}
                className={`block w-full text-left px-3 py-2 rounded-lg mb-2 ${
                  selectedRating === rating
                    ? "bg-green-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)} ({rating}.0+)
              </button>
            ))}

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setMaxPrice(500);
                setSelectedRating(0);
                setSortBy("default");
              }}
              className="w-full bg-green-600 text-white rounded-xl py-3 mt-8 hover:bg-green-700"
            >
              Clear Filters
            </button>
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl shadow-sm p-5 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">
                  {selectedCategory === "All"
                    ? "All Products"
                    : selectedCategory}
                </h2>

                <p className="text-gray-500">
                  {products.length} Products Found
                </p>
              </div>

              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded-lg px-4 py-2"
                >
                  <option value="default">Default</option>
                  <option value="low">Price Low → High</option>
                  <option value="high">Price High → Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="name">A → Z</option>
                </select>

                <button className="border p-3 rounded-lg hover:bg-gray-100">
                  <FaThLarge />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-80 mt-3">
              <input
                type="text"
                placeholder="Search Product..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-xl pl-10 pr-4 py-3"
              />
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>

            {products.length === 0 && (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold">No Products Found</h2>

                <p className="text-gray-500 mt-2">Try another filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
