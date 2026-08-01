import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import products from "../../data/products";
import popularSearches from "../../data/popularSearches";

import {
  setSearchTerm,
  setShowSearch,
  clearRecentSearches,
  addRecentSearch,
} from "../../features/search/searchSlice";

export default function SearchDropdown() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchTerm, selectedIndex, recentSearches, showSearch } = useSelector(
    (state) => state.search,
  );

  if (!showSearch) return null;

  if (!searchTerm.trim()) {
    return (
      <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl z-[9999] p-5">
        {recentSearches.length > 0 && (
          <>
            <div className="flex justify-between mb-3">
              <h3 className="font-semibold">Recent Searches</h3>

              <button
                onMouseDown={() => dispatch(clearRecentSearches())}
                className="text-red-500 text-sm hover:text-red-700"
              >
                Clear
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-5">
              {recentSearches.map((item) => (
                <button
                  key={item}
                  onMouseDown={() => {
                    dispatch(setSearchTerm(item));
                    dispatch(addRecentSearch(item));
                  }}
                  className="bg-gray-100 px-3 py-2 rounded-full hover:bg-green-100"
                >
                  🕒 {item}
                </button>
              ))}
            </div>
          </>
        )}

        <h3 className="font-semibold mb-3">Popular Searches</h3>

        <div className="flex flex-wrap gap-2">
          {popularSearches.map((item) => (
            <button
              key={item}
              onMouseDown={() => dispatch(setSearchTerm(item))}
              className="bg-green-100 px-3 py-2 rounded-full hover:bg-green-200"
            >
              🔥 {item}
            </button>
          ))}
        </div>
      </div>
    );
  }

  const filtered = products
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .slice(0, 6);

  if (filtered.length === 0) {
    return (
      <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl p-5 z-50">
        No Products Found
      </div>
    );
  }

  return (
    <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl overflow-hidden z-50">
      {filtered.map((product, index) => (
        <div
          key={product.id}
          onMouseDown={() => {
            dispatch(addRecentSearch(product.name));
            dispatch(setSearchTerm(""));
            dispatch(setShowSearch(false));

            navigate(`/product/${product.id}`);
          }}
          className={`flex items-center gap-4 p-4 cursor-pointer ${
            selectedIndex === index ? "bg-green-100" : "hover:bg-gray-100"
          }`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-14 h-14 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.category}</p>
          </div>

          <span className="font-bold text-green-600">₹{product.price}</span>
        </div>
      ))}
    </div>
  );
}
