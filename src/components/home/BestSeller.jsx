import { Link } from "react-router-dom";
import products from "../../data/products";
import SmartBasketCard from "../cards/SmartBasketCard";

export default function BestSeller() {
  const bestProducts = products.filter((item) => item.bestSeller);

  return (
    <section className="py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold">Best Sellers</h2>

          <p className="text-gray-500 mt-2">Most loved by our customers</p>
        </div>

        <Link
          to="/category"
          className="text-green-600 font-semibold hover:underline"
        >
          View All →
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bestProducts.map((product) => (
          <SmartBasketCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
