import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const alreadyExists = users.find((u) => u.email === email);

    if (alreadyExists) {
      alert("Email already exists");
      return;
    }

    dispatch(
      register({
        name,
        email,
        password,
      }),
    );

    alert("Registration Successful!");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        {/* Heading */}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600">
            Create Account 🛒
          </h1>

          <p className="text-gray-500 mt-2">Join our Grocery Store today</p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {/* Name */}

          <div>
            <label className="font-medium">Full Name</label>

            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-green-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email */}

          <div>
            <label className="font-medium">Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 border rounded-xl px-4 py-3 outline-none focus:border-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}

          <div>
            <label className="font-medium">Password</label>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Create password"
                className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-medium">Confirm Password</label>

            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full border rounded-xl px-4 py-3 pr-12 outline-none focus:border-green-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Terms */}

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" required />I agree to the Terms & Conditions
          </label>

          {/* Register Button */}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google */}

        <button className="w-full border py-3 rounded-xl hover:bg-gray-50 transition">
          Continue with Google
        </button>

        {/* Login */}

        <p className="text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
