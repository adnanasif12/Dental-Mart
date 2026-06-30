import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import APIVendor from "../vendor/api";

const PAGES = ["‹ Prev", 1, 2, 3, 4, 5, "...", 13, "Next ›"];

export default function ProductGrid({ onAddToCart, onBuyNow }) {
  const [sortBy, setSortBy] = useState("Featured");
  const [activePage, setActivePage] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await APIVendor.getProducts();
        if (data.success) {
          setProducts(data.data);
        } else {
          setError(data.message || "Unable to load products");
        }
      } catch (err) {
        setError(err.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="main-area">
      {/* Sort bar */}
      <div className="results-bar">
        <div className="results-bar__text">
          Showing results for <span>"dental equipment"</span>
        </div>
        <div className="results-bar__sort">
          <span className="results-bar__sort-lbl">Sort by:</span>
          <select
            className="results-bar__select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Avg. Customer Review</option>
            <option>Newest Arrivals</option>
            <option>Best Sellers</option>
          </select>
        </div>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="product-grid-loading">Loading products...</div>
      ) : error ? (
        <div className="product-grid-error">{error}</div>
      ) : (
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination">
        {PAGES.map((pg, i) => (
          <button
            key={i}
            className={`pagination__btn ${pg === activePage ? "pagination__btn--active" : ""}`}
            onClick={() => typeof pg === "number" && setActivePage(pg)}
          >
            {pg}
          </button>
        ))}
      </div>
    </div>
  );
}
