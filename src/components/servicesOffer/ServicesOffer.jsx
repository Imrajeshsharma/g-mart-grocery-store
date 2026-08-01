import {
  FaShippingFast,
  FaLeaf,
  FaGift,
  FaUndoAlt,
  FaWallet,
  FaHeadset,
} from "react-icons/fa";

const services = [
  {
    icon: <FaShippingFast />,
    title: "Fast Delivery",
    text: "Within 30 Minutes",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaLeaf />,
    title: "100% Fresh",
    text: "Farm Fresh Everyday",
    color: "bg-lime-100 text-lime-600",
  },
  {
    icon: <FaGift />,
    title: "Daily Offers",
    text: "Save More Everyday",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: <FaWallet />,
    title: "Secure Payment",
    text: "100% Safe Checkout",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: <FaUndoAlt />,
    title: "Easy Returns",
    text: "7 Days Return",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: <FaHeadset />,
    title: "24/7 Support",
    text: "Always Available",
    color: "bg-pink-100 text-pink-600",
  },
];

export default function ServicesOffer() {
  return (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Why Shop With Us</h2>

        <p className="text-gray-500 mt-3">
          Fresh groceries, secure shopping and lightning-fast delivery.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl p-8 shadow hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-center group"
          >
            <div
              className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl ${item.color} group-hover:scale-110 transition`}
            >
              {item.icon}
            </div>

            <h3 className="font-bold text-xl mt-6">{item.title}</h3>

            <p className="text-gray-500 mt-3">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
