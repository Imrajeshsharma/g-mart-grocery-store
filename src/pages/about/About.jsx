import "../../style/About.css";

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-overlay">
          <h1>About FreshMart</h1>
          <p>Bringing Farm Fresh Groceries to Your Doorstep Every Day.</p>
        </div>
      </section>

      {/* Story */}
      <section className="about-story container">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e"
            alt="Fresh Grocery"
          />
        </div>

        <div className="story-content">
          <h2>Our Story</h2>

          <p>
            FreshMart started with one simple mission — provide fresh,
            affordable, and high-quality groceries directly to every family.
          </p>

          <p>
            Today we serve thousands of happy customers with fresh vegetables,
            fruits, dairy products, bakery items, and household essentials.
          </p>
        </div>
      </section>

      {/* Features */}

      <section className="why-us">
        <div className="container">
          <h2>Why Choose Us</h2>

          <div className="feature-grid">
            <div className="feature-card">
              <h3>🥬 Fresh Products</h3>
              <p>Delivered directly from trusted farms.</p>
            </div>

            <div className="feature-card">
              <h3>🚚 Fast Delivery</h3>
              <p>Quick and reliable doorstep delivery.</p>
            </div>

            <div className="feature-card">
              <h3>💳 Secure Payment</h3>
              <p>Safe and trusted payment options.</p>
            </div>

            <div className="feature-card">
              <h3>😊 Happy Customers</h3>
              <p>Thousands of satisfied families.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}

      <section className="stats">
        <div className="container stats-grid">
          <div>
            <h2>25K+</h2>
            <p>Customers</p>
          </div>

          <div>
            <h2>500+</h2>
            <p>Products</p>
          </div>

          <div>
            <h2>50+</h2>
            <p>Farm Partners</p>
          </div>

          <div>
            <h2>10+</h2>
            <p>Years Experience</p>
          </div>
        </div>
      </section>

      {/* Team */}

      <section className="team container">
        <h2>Meet Our Team</h2>

        <div className="team-grid">
          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="team member"/>
            <h3>Rahul Sharma</h3>
            <p>Founder</p>
          </div>

          <div className="team-card">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="team member"
            />
            <h3>Priya Patel</h3>
            <p>Operations Head</p>
          </div>

          <div className="team-card">
            <img src="https://randomuser.me/api/portraits/men/52.jpg" alt="team member" />
            <h3>Amit Verma</h3>
            <p>Marketing Manager</p>
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="about-cta">
        <h2>Freshness Delivered Every Day</h2>

        <p>Experience quality groceries at affordable prices.</p>

        <a href="/" className="cta-button">
          Shop Now
        </a>
      </section>
    </div>
  );
}
