import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { login, clearAuthMessage } from "../../features/auth/authSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // const { success, message } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    dispatch(login({ email, password }));

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const foundUser = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!foundUser) {
      alert("Invalid Email or Password");
      return;
    }

    alert("Login Successful!");

    dispatch(clearAuthMessage());

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-50 flex items-center justify-center px-5">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8">
        {/* Heading */}

        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600">Welcome Back 👋</h1>

          <p className="text-gray-500 mt-2">Login to continue shopping</p>
        </div>

        {/* Form */}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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
                placeholder="Enter your password"
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

          {/* Remember */}

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember Me
            </label>

            <button type="button" className="text-green-600 hover:underline">
              Forgot Password?
            </button>
          </div>

          {/* Login */}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}

        <div className="flex items-center gap-3 my-6">
          <hr className="flex-1" />
          <span className="text-gray-400 text-sm">OR</span>
          <hr className="flex-1" />
        </div>

        {/* Google Button */}

        <button className="w-full border py-3 rounded-xl hover:bg-gray-50 transition">
          Continue with Google
        </button>

        {/* Register */}

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600 font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;