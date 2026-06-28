import { bestSellers } from "../data/products";
import { BestSellerIcons } from "../data/icons";

export default function BestSellers() {
  return (
    <section className="bestsellers">
      <div className="bestsellers__title">Best Sellers in Dental Equipment</div>
      <div className="bestsellers__sub">See all best sellers ›</div>
      <div className="bestsellers__grid">
        {bestSellers.map((b) => (
          <div key={b.rank} className="bestsellers__card">
            <div className="bestsellers__rank">#{b.rank} Best Seller</div>
            <div className="bestsellers__img">{BestSellerIcons[b.rank]}</div>
            <div className="bestsellers__name">{b.name}</div>
            <div className="bestsellers__stars">
              {"★".repeat(b.stars)}
              <span style={{ color: "#ddd" }}>{"★".repeat(5 - b.stars)}</span>
            </div>
            <div className="bestsellers__price">{b.price}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
