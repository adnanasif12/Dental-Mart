export default function HeroBanner({ onShopClick }) {
  return (
    <div className="hero">
      <div className="hero__arrow">‹</div>
      <div className="hero__content">
        <div className="hero__tag">Limited time deal — up to 40% off</div>
        <div className="hero__title">
          Professional Dental<br />Equipment for Your Clinic
        </div>
        <div className="hero__sub">
          Scalers · Chairs · X-Ray · Autoclave · Handpieces — all certified authentic
        </div>
        <button className="hero__btn" onClick={onShopClick}>
          Shop the sale ›
        </button>
      </div>
      <div className="hero__arrow">›</div>
    </div>
  );
}
