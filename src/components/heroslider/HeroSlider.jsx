import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../style/HeroSlider.css";

const banners = [
  {
    title: "Fresh Organic Vegetables",
    offer: "UP TO 40% OFF",
    subtitle: "Healthy • Fresh • Delivered in 30 Minutes",
    button: "Shop Now",
    image: "https://images.unsplash.com/photo-1706784694581-4c6e001c3c37?w=900",
  },
  {
    title: "Daily Grocery Essentials",
    offer: "Buy 2 Get 1 FREE",
    subtitle: "Rice • Oil • Flour • Spices • Snacks",
    button: "Order Today",
    image: "https://images.unsplash.com/photo-1543168256-418811576931?w=900",
  },
  {
    title: "Fresh Fruits Collection",
    offer: "Flat 30% OFF",
    subtitle: "Apple • Orange • Banana • Mango",
    button: "Explore",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=900",
  },
];

export default function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="offer">{banners[index].offer}</span>

        <h1>{banners[index].title}</h1>

        <p>{banners[index].subtitle}</p>

        <div className="buttons">
          <Link to="/category">
            <button className="shop-btn">Shop Now</button>
          </Link>

          <button
            onClick={() =>
              document
                .getElementById("offers")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            View Offers
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img src={banners[index].image} alt="grocery banner" />
      </div>
    </section>
  );
}
