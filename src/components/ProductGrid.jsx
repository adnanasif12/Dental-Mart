import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import APIVendor from "../vendor/api";

const PRODUCTS_PER_PAGE = 20; // 5 columns x 4 rows

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

  // Calculate pagination
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIdx = (activePage - 1) * PRODUCTS_PER_PAGE;
  const endIdx = startIdx + PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(startIdx, endIdx);

  // Generate page numbers
  const generatePageNumbers = () => {
    const pages = [];
    pages.push("‹ Prev");
    
    for (let i = 1; i <= totalPages; i++) {
      if (i <= 5 || i > totalPages - 3 || (i >= activePage - 1 && i <= activePage + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    
    pages.push("Next ›");
    return pages;
  };

  const pageNumbers = generatePageNumbers();

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
      ) : paginatedProducts.length === 0 ? (
        <div className="product-grid-empty">No products found</div>
      ) : (
        <div>
          <div className="product-grid">
            {paginatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={onAddToCart}
                onBuyNow={onBuyNow}
              />
            ))}
          </div>
          {/* Product count info */}
          <div className="product-grid-info">
            Showing {startIdx + 1}-{Math.min(endIdx, products.length)} of {products.length} results
          </div>
        </div>
      )}

      {/* Pagination */}
      {products.length > 0 && (
        <div className="pagination">
          <button
            className="pagination__btn"
            onClick={() => setActivePage(Math.max(1, activePage - 1))}
            disabled={activePage === 1}
          >
            ‹ Prev
          </button>
          {pageNumbers.map((pg, i) => {
            if (pg === "..." || pg === "‹ Prev" || pg === "Next ›") {
              return (
                <span key={i} className="pagination__ellipsis">
                  {pg === "..." ? "..." : ""}
                </span>
              );
            }
            return (
              <button
                key={i}
                className={`pagination__btn ${pg === activePage ? "pagination__btn--active" : ""}`}
                onClick={() => setActivePage(pg)}
              >
                {pg}
              </button>
            );
          })}
          <button
            className="pagination__btn"
            onClick={() => setActivePage(Math.min(totalPages, activePage + 1))}
            disabled={activePage === totalPages}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
}
