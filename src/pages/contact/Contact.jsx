import "../../style/ContactUs.css";

export default function ContactUs() {
  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="overlay">
          <h1>Contact FreshMart</h1>
          <p>
            Fresh groceries delivered with care. We'd love to hear from you!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="contact-container">
        {/* Contact Form */}
        <div className="contact-form card">
          <h2>Send us a Message</h2>

          <form>
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Email Address" />
            <input type="text" placeholder="Subject" />
            <textarea rows="6" placeholder="Write your message..." />

            <button type="submit">Send Message</button>
          </form>
        </div>

        {/* Store Details */}
        <div className="store-details">
          <div className="card">
            <h2>Store Information</h2>

            <div className="info">
              <h4>📍 Address</h4>
              <p>123 Green Street, New Delhi</p>
            </div>

            <div className="info">
              <h4>📞 Phone</h4>
              <p>+91 98765 43210</p>
            </div>

            <div className="info">
              <h4>✉️ Email</h4>
              <p>support@freshmart.com</p>
            </div>

            <div className="info">
              <h4>🕒 Opening Hours</h4>
              <p>Mon - Sun : 8:00 AM - 10:00 PM</p>
            </div>
          </div>

          <div className="card">
            <h2>Customer Support</h2>

            <div className="support-card">🚚 Delivery Assistance</div>

            <div className="support-card">🔄 Easy Returns</div>

            <div className="support-card">💬 Live Chat Support</div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-grid">
          <div className="faq-card">
            <h3>How fast is delivery?</h3>
            <p>Usually within 30-60 minutes.</p>
          </div>

          <div className="faq-card">
            <h3>Can I return groceries?</h3>
            <p>Yes, within our return policy.</p>
          </div>

          <div className="faq-card">
            <h3>Do you offer same-day delivery?</h3>
            <p>Yes, in selected locations.</p>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="map">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18..."
          loading="lazy"
          allowFullScreen
        ></iframe>
      </section>
    </div>
  );
}
