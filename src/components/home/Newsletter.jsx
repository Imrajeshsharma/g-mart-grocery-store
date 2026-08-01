import { FaPaperPlane, FaGooglePlay, FaApple } from "react-icons/fa";

export default function Newsletter() {
  return (
    <section className="my-16">
      <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-3xl overflow-hidden">
        <div className="grid lg:grid-cols-2 items-center gap-10 p-10">
          {/* Left */}

          <div className="text-white">
            <span className="bg-white/20 px-4 py-1 rounded-full text-sm">
              Stay Updated
            </span>

            <h2 className="text-4xl font-bold mt-5">
              Get Weekly Grocery Deals
            </h2>

            <p className="mt-4 text-green-100 leading-7">
              Subscribe to receive exclusive offers, fresh arrivals, seasonal
              discounts and healthy shopping tips directly in your inbox.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl text-gray-800 outline-none border"
              />

              <button className="bg-black hover:bg-gray-900 cursor-pointer px-8 py-4 rounded-xl flex items-center justify-center gap-2">
                Subscribe
                <FaPaperPlane />
              </button>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png"
              alt="Grocery"
              className="w-72"
            />

            <div className="flex gap-4 mt-8">
              <button className="bg-black text-white px-5 py-3 rounded-xl flex items-center gap-2">
                <FaGooglePlay />
                Google Play
              </button>

              <button className="bg-white text-black px-5 py-3 rounded-xl flex items-center gap-2">
                <FaApple />
                App Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
