import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SmartBasketCard from "../cards/SmartBasketCard";
import products from "../../data/products";

export default function SmartBasket() {
  const sliderRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Fruits", "Vegetables", "Dairy", "Bakery"];

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") {
      return products;
    }

    return products.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({
      left: -900,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({
      left: 900,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-gray-100 rounded-2xl p-6 my-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
        <div>
          <h2 className="text-3xl font-bold">Smart Basket</h2>

          <p className="text-gray-500 mt-2">
            {filteredProducts.length} Products Available
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/category"
            className="text-green-600 font-semibold hover:underline"
          >
            View All →
          </Link>

          <button
            onClick={scrollLeft}
            className="w-10 h-10 rounded-full bg-white shadow hover:bg-green-600 hover:text-white"
          >
            ❮
          </button>

          <button
            onClick={scrollRight}
            className="w-10 h-10 rounded-full bg-white shadow hover:bg-green-600 hover:text-white"
          >
            ❯
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 overflow-auto mt-6 pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2 rounded-full whitespace-nowrap transition ${
              selectedCategory === cat
                ? "bg-green-600 text-white"
                : "bg-white hover:bg-green-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products */}
      <div
        ref={sliderRef}
        className="flex gap-5 overflow-x-auto no-scrollbar mt-8 scroll-smooth"
      >
        {filteredProducts.map((product) => (
          <div key={product.id} className="min-w-[260px] flex-shrink-0">
            <SmartBasketCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
