import testimonials from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-14">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">❤️ What Our Customers Say</h2>

        <p className="text-gray-500 mt-3">
          Thousands of happy customers trust us every day.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-3xl shadow-md hover:shadow-xl transition p-8"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">{item.name}</h3>

                <p className="text-gray-500 text-sm">{item.city}</p>
              </div>
            </div>

            <div className="text-yellow-500 text-xl mt-5">
              {"⭐".repeat(item.rating)}
            </div>

            <p className="text-gray-600 mt-5 leading-7">"{item.review}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}
