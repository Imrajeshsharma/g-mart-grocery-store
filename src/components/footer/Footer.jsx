import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">
            G-Mart
          </h2>

          <p className="mt-4 leading-7">
            Fresh groceries delivered to your doorstep. Healthy food, fast
            delivery, affordable prices.
          </p>

          <div className="flex gap-4 mt-6 text-xl">
            <a href="#">
              <FaFacebookF />
            </a>

            <a href="#">
              <FaInstagram />
            </a>

            <a href="#">
              <FaXTwitter />
            </a>

            <a href="#">
              <FaPinterestP />
            </a>
          </div>
        </div>

        {/* Quick Links */}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>

          <ul className="space-y-2">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/category">Categories</Link>
            </li>

            <li>
              <Link to="/offers">Offers</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Customer */}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Customer Care
          </h3>

          <ul className="space-y-2">
            <li>FAQ</li>

            <li>Shipping</li>

            <li>Privacy Policy</li>

            <li>Terms & Conditions</li>

            <li>Return Policy</li>
          </ul>
        </div>

        {/* Contact */}

        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Contact</h3>

          <p>Email: support@gmart.com</p>

          <p className="mt-2">Phone: +91 98765 43210</p>

          <p className="mt-2">Ahmedabad, Gujarat</p>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-5">
        © 2026 G-Mart. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
