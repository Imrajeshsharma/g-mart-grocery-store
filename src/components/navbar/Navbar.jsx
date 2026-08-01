import { useState } from "react";
import SearchDropdown from "../search/SearchDropdown";

import products from "../../data/products";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setSelectedIndex,
  setShowSearch,
  addRecentSearch,
} from "../../features/search/searchSlice";
import {
  FaBars,
  FaTimes,
  FaShoppingCart,
  FaSearch,
  FaHeart,
  FaUserCircle,
  FaChevronDown,
} from "react-icons/fa";
import { logout } from "../../features/auth/authSlice";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchTerm, selectedIndex } = useSelector((state) => state.search);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const wishlistItems = useSelector((state) => state.wishlist.items);

  const user = useSelector((state) => state.auth.user);
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleKeyDown = (e) => {
    if (!searchTerm) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();

        dispatch(
          setSelectedIndex(
            selectedIndex < filteredProducts.length - 1 ? selectedIndex + 1 : 0,
          ),
        );
        break;

      case "ArrowUp":
        e.preventDefault();

        dispatch(
          setSelectedIndex(
            selectedIndex > 0 ? selectedIndex - 1 : filteredProducts.length - 1,
          ),
        );
        break;

      case "Enter":
        if (selectedIndex >= 0) {
          dispatch(addRecentSearch(filteredProducts[selectedIndex].name));

          navigate(`/product/${filteredProducts[selectedIndex].id}`);

          dispatch(setSearchTerm(""));
          dispatch(setSelectedIndex(-1));
        } else {
          navigate("/search");
        }

        break;

      case "Escape":
        dispatch(setSearchTerm(""));
        dispatch(setSelectedIndex(-1));
        dispatch(setShowSearch(false));
        break;

      default:
        break;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // use "auto" if you don't want animation
    });
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          onClick={scrollTop}
          className="text-2xl font-bold text-green-600"
        >
          G-Mart
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 font-medium">
          <li>
            <NavLink
              to="/"
              onClick={scrollTop}
              className={({ isActive }) =>
                isActive ? "text-green-600" : "hover:text-green-600"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/category"
              className={({ isActive }) =>
                isActive ? "text-green-600" : "hover:text-green-600"
              }
            >
              Categories
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-green-600" : "hover:text-green-600"
              }
            >
              About
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-green-600" : "hover:text-green-600"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        {/* search */}
        <div className="hidden lg:flex items-center gap-5">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchTerm}
              onChange={(e) => {
                dispatch(setSearchTerm(e.target.value));
                dispatch(setSelectedIndex(-1));
              }}
              onFocus={() => dispatch(setShowSearch(true))}
              onBlur={() => {
                setTimeout(() => {
                  dispatch(setShowSearch(false));
                }, 150);
              }}
              onKeyDown={handleKeyDown}
              className="w-full border rounded-full py-2 pl-10 pr-4"
            />

            <FaSearch
              onClick={() => {
                navigate("/search");
                if (searchTerm.trim()) {
                  dispatch(addRecentSearch(searchTerm));
                }
              }}
              className="absolute left-3 top-3 text-gray-400 cursor-pointer"
            />

            <SearchDropdown />
          </div>
          {/* wishlist heart */}
          <Link to="/wishlist" className="relative text-xl">
            <FaHeart />

            {wishlistItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full px-2">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          {/* cart */}
          <Link
            to="/cart"
            className="relative flex items-center justify-center text-xl hover:text-green-600 transition"
          >
            <FaShoppingCart size={22} />

            {totalCartItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
            )}
          </Link>
          {/* login */}
          {/* User */}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 hover:bg-gray-100 px-3 py-2 rounded-xl transition"
              >
                <FaUserCircle size={32} className="text-green-600" />

                <div className="text-left">
                  <p className="font-semibold text-sm">{user.name}</p>

                  <p className="text-xs text-gray-500">My Account</p>
                </div>

                <FaChevronDown
                  className={`transition ${showProfile ? "rotate-180" : ""}`}
                />
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden z-50">
                  <Link
                    to="/profile"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setShowProfile(false)}
                  >
                    👤 My Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setShowProfile(false)}
                  >
                    📦 My Orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setShowProfile(false)}
                  >
                    ❤️ Wishlist
                  </Link>

                  <Link
                    to="/cart"
                    className="block px-5 py-3 hover:bg-gray-100"
                    onClick={() => setShowProfile(false)}
                  >
                    🛒 Cart
                  </Link>

                  <hr />

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-5 py-3 text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-md">
          <ul className="flex flex-col p-5 space-y-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)}>
              Home
            </NavLink>

            <NavLink to="/category" onClick={() => setMenuOpen(false)}>
              Categories
            </NavLink>

            <NavLink to="/offers" onClick={() => setMenuOpen(false)}>
              Offers
            </NavLink>

            <NavLink to="/about" onClick={() => setMenuOpen(false)}>
              About
            </NavLink>

            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>
              Contact
            </NavLink>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Navbar;
