import { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./styles/main.css";

import Navbar      from "./components/Navbar";
import HeroBanner  from "./components/HeroBanner";
import Sidebar     from "./components/Sidebar";
import ProductGrid from "./components/ProductGrid";
import BestSellers from "./components/BestSellers";
import CartPage    from "./components/CartPage";
import Footer      from "./components/Footer";
import AllMenu       from "./components/AllMenu";
import BulkOrders     from "./components/BulkOrders";
import CustomerService from "./components/CustomerService";
import SecondaryNaveber from "./components/SecondaryNaveber";
import TodaysDeals    from "./components/TodaysDeals";

export default function App() {
  const [page, setPage] = useState("shop"); // "shop" | "cart"
  const [cartCount, setCartCount] = useState(3);

  const goShop = () => setPage("shop");
  const goCart = () => setPage("cart");

  const handleAddToCart = () => setCartCount((n) => n + 1);

  // Get your Google Client ID from Google Cloud Console
  // For now, we'll check if it's set, otherwise we'll render without Google OAuth
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const AppContent = () => (
    <div>
      {/* ── Navbar (always visible) ── */}
      <Navbar
        cartCount={cartCount}
        onCartClick={goCart}
        onLogoClick={goShop}
      />

      {page === "shop" && (
        <>
          {/* Hero */}
          <HeroBanner onShopClick={goShop} />

          {/* Results breadcrumb */}
          <div className="results-breadcrumb">
            1-24 of <strong>312 results</strong> for{" "}
            <strong className="highlight">"dental equipment"</strong>
          </div>

          {/* Sidebar + Products */}
          <div className="shop-layout">
            <Sidebar />
            <ProductGrid
              onAddToCart={handleAddToCart}
              onBuyNow={goCart}
            />
          </div>

          {/* Best Sellers */}
          <BestSellers />
        </>
      )}

      {page === "cart" && (
        <CartPage onContinue={goShop} />
      )}

      {/* Footer (always visible) */}
      <Footer />
    </div>
  );

  // If Google Client ID is not set, render without GoogleOAuthProvider
  if (!GOOGLE_CLIENT_ID) {
    return <AppContent />;
  }

  // If Google Client ID is set, render with GoogleOAuthProvider
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AppContent />
    </GoogleOAuthProvider>
  );
}
