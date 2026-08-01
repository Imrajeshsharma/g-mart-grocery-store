import "../../style/OfferCard.css";

function OfferCard({ offer }) {
  return (
    <div className="top-offer-card">
      <span className="offer-badge">{offer.badge}</span>

      <div className="offer-img">
        <img src={offer.image} alt={offer.title} />
      </div>

      <div className="offer-content">
        <h3>{offer.title}</h3>
        <p>{offer.subtitle}</p>

        <div className="offer-footer">
          <span className="offer-price">{offer.discount}</span>

          <button className="offer-btn">
            Shop Now →
          </button>
        </div>
      </div>
    </div>
  );
}

export default OfferCard;