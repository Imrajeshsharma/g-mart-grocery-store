import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import products from "../../data/products";
import ProductCard from "../../components/category/ProductCard";

export default function Search() {
  const searchTerm = useSelector((state) => state.search.searchTerm);

  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    let data = products.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.weight.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    switch (sortBy) {
      case "low":
        data.sort((a, b) => a.price - b.price);
        break;

      case "high":
        data.sort((a, b) => b.price - a.price);
        break;

      case "rating":
        data.sort((a, b) => b.rating - a.rating);
        break;

      case "name":
        data.sort((a, b) => a.name.localeCompare(b.name));
        break;

      default:
        break;
    }

    return data;
  }, [searchTerm, sortBy]);

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold">Search Results</h1>

          <p className="text-gray-500 mt-2">
            {filteredProducts.length} Products Found for "{searchTerm}"
          </p>
        </div>

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
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <img
            src="https://cdn-icons-png.flaticon.com/512/6134/6134065.png"
            className="w-48 mx-auto"
            alt="No products"
          />

          <h2 className="text-3xl font-bold mt-8">No Products Found</h2>

          <p className="text-gray-500 mt-3">Try another keyword.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
