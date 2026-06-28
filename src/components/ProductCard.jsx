import { useState } from "react";
import StarRating from "./StarRating";
import { ProductIcons } from "../data/icons";

export default function ProductCard({ product, onAddToCart, onBuyNow }) {
  const [hover, setHover] = useState(false);
  const { id, name, brand, rating, reviews, price, oldPrice, discount, delivery, stock, badge, prime, sponsored, bg } = product;

  const saved = oldPrice - price;
  const isLowStock = stock.toLowerCase().includes("only");

  return (
    <div
      className="product-card"
      style={{ borderColor: hover ? "#c7511f" : "#ddd" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image area */}
      <div className="product-card__img-wrap" style={{ background: bg }}>
        {badge && <div className="product-card__badge">{badge}</div>}
        {ProductIcons[id]}
        {prime && <div className="product-card__prime">prime</div>}
      </div>

      {/* Body */}
      <div className="product-card__body">
        {sponsored && <div className="product-card__sponsored">Sponsored</div>}
        <div className="product-card__name">{name}</div>
        <div className="product-card__brand">
          by <span>{brand}</span>
        </div>

        <div className="product-card__stars">
          <StarRating rating={rating} size={13} />
          <span className="product-card__review-count">
            {rating} ({reviews})
          </span>
        </div>

        <div className="product-card__price-row">
          <span className="product-card__currency">৳</span>
          <span className="product-card__price">{price.toLocaleString("en-IN")}</span>
          <span className="product-card__old-price">৳{oldPrice.toLocaleString("en-IN")}</span>
        </div>
        <div className="product-card__save">
          Save ৳{saved.toLocaleString("en-IN")} ({discount}%)
        </div>
        <div className="product-card__delivery">
          FREE delivery <strong>{delivery}</strong>
        </div>
        <div className={`product-card__stock ${isLowStock ? "product-card__stock--warn" : "product-card__stock--ok"}`}>
          {stock}
        </div>

        <button
          className="btn-add-cart"
          onClick={(e) => { e.stopPropagation(); onAddToCart(); }}
        >
          Add to Cart
        </button>
        <button
          className="btn-buy-now"
          onClick={(e) => { e.stopPropagation(); onBuyNow(); }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
