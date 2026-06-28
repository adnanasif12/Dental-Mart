import { useState } from "react";
import StarRating from "./StarRating";
import { sidebarCategories, sidebarBrands } from "../data/products";

const PRICE_RANGES = [
  "Under ৳1,000",
  "৳1,000 – ৳5,000",
  "৳5,000 – ৳25,000",
  "৳25,000 – ৳1,00,000",
  "Over ৳1,00,000",
];

export default function Sidebar() {
  const [filters, setFilters] = useState(sidebarCategories);
  const [inStock, setInStock] = useState(true);

  const toggleFilter = (i) =>
    setFilters((f) => f.map((item, idx) => (idx === i ? { ...item, checked: !item.checked } : item)));

  return (
    <aside className="sidebar">
      <div className="sidebar__title">Filter results</div>

      {/* Category */}
      <div className="sidebar__section">
        <div className="sidebar__section-title">Category</div>
        {filters.map((f, i) => (
          <div key={i} className="sidebar__check-row" onClick={() => toggleFilter(i)}>
            <div className={`sidebar__checkbox ${f.checked ? "sidebar__checkbox--checked" : ""}`}>
              {f.checked && (
                <svg width="8" height="8" viewBox="0 0 8 8">
                  <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                </svg>
              )}
            </div>
            <span className="sidebar__label">{f.label} ({f.count})</span>
          </div>
        ))}
      </div>

      {/* Rating */}
      <div className="sidebar__section">
        <div className="sidebar__section-title">Avg. Customer Review</div>
        {[4, 3, 2].map((r) => (
          <div key={r} className="sidebar__star-row">
            <StarRating rating={r} size={13} />
            <span className="sidebar__star-up">&amp; Up</span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div className="sidebar__section">
        <div className="sidebar__section-title">Price</div>
        {PRICE_RANGES.map((p) => (
          <span key={p} className="sidebar__price-link">{p}</span>
        ))}
      </div>

      {/* Brand */}
      <div className="sidebar__section">
        <div className="sidebar__section-title">Brand</div>
        {sidebarBrands.map((b) => (
          <div key={b} className="sidebar__brand-item">{b}</div>
        ))}
      </div>

      {/* Availability */}
      <div className="sidebar__section">
        <div className="sidebar__section-title">Availability</div>
        <div className="sidebar__check-row" onClick={() => setInStock(!inStock)}>
          <div className={`sidebar__checkbox ${inStock ? "sidebar__checkbox--checked" : ""}`}>
            {inStock && (
              <svg width="8" height="8" viewBox="0 0 8 8">
                <path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
            )}
          </div>
          <span className="sidebar__label">In Stock</span>
        </div>
        <div className="sidebar__check-row">
          <div className="sidebar__checkbox" />
          <span className="sidebar__label">Include out of stock</span>
        </div>
      </div>

      {/* Shipping */}
      <div className="sidebar__section">
        <div className="sidebar__section-title">Shipping</div>
        {["FREE Shipping", "Same-Day Delivery"].map((s) => (
          <div key={s} className="sidebar__check-row">
            <div className="sidebar__checkbox" />
            <span className="sidebar__label" style={{ color: "#007185" }}>{s}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
