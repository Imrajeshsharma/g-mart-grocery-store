import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/BannerSlider.css";

const slides = [
  {
    title: "Premium Whey Protein",
    subtitle: "Build Lean Muscle Faster",
    offer: "Flat 40% OFF",
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=700&q=80",
    bg: "linear-gradient(135deg,#EEF5FF,#D8E8FF)",
  },
  {
    title: "Daily Multivitamins",
    subtitle: "Complete Nutrition for Every Day",
    offer: "Buy 1 Get 1",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80",
    bg: "linear-gradient(135deg,#F4FFF1,#D9F7CF)",
  },
  {
    title: "Mass Gainer",
    subtitle: "Gain Healthy Muscle Mass",
    offer: "Up To 50% OFF",
    image:
      "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=700&q=80",
    bg: "linear-gradient(135deg,#FFF3E8,#FFE0C2)",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slider);
  }, []);

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <section className="banner">
      <div className="banner-card" style={{ background: slides[current].bg }}>
        <div className="banner-left">
          <span className="tag">🔥 Fitness Sale</span>

          <h1>{slides[current].title}</h1>

          <p>{slides[current].subtitle}</p>

          <h2>{slides[current].offer}</h2>

          <Link to="/category">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>

        <div className="banner-right">
          <img src={slides[current].image} alt="" key={current} />
        </div>

        <button className="arrow left" onClick={prev}>
          ❮
        </button>

        <button className="arrow right" onClick={next}>
          ❯
        </button>

        <div className="dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={current === index ? "active" : ""}
              onClick={() => setCurrent(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
}
