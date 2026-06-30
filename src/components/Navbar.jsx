import { useState, useEffect } from "react";
import SecondaryNavebar from "./SecondaryNaveber";
import LoginModal from "./LoginModal";
import AuthVendor from "../vendor/auth";

export default function Navbar({ cartCount, onCartClick, onLogoClick }) {
  const [search, setSearch] = useState("");
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already logged in
    const loggedInUser = AuthVendor.getUser();
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsLoginModalOpen(false);
  };

  const handleLogout = () => {
    AuthVendor.logout();
    setUser(null);
  };

  const handleAccountClick = () => {
    if (!user) {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      {/* ── Primary Nav ── */}
      <nav className="navbar">
        <div className="navbar__logo" onClick={onLogoClick}>
          Dental<span>Mart</span>
        </div>

        <div className="navbar__deliver">
          <div className="navbar__deliver-top">Deliver to</div>
          <div className="navbar__deliver-bot">📍 Dhaka 1200</div>
        </div>

        <div className="navbar__search">
          <select className="navbar__search-cat" defaultValue="">
            <option value="" disabled style={{ fontWeight: 900, color: '#020000d5' }}>Select Category</option>
            <option>Disposables</option>
            <option>Cleaning & Sterilization</option>
            <option>Protective & Hygiene </option>
            <option>Basic Clinic Instruments</option>
            <option>Mixing Items</option>
            <option>Bur Instruments</option>
            <option>Patient Care</option>
            <option>Accessories</option>
            <option>Rotary</option>
            <option>Clinic Utility</option>
            <option>Consumables Materials </option>
            <option>Packaging</option>
            <option>Storage</option>
            <option>Major Equipment</option>
          </select>
          <input
            className="navbar__search-input"
            type="text"
            placeholder="Search dental equipment, instruments, chairs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="navbar__search-btn" aria-label="Search">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="7.5" cy="7.5" r="5.5" stroke="white" strokeWidth="2" />
              <path d="M12 12l4 4" stroke="white" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="navbar__right">
          {user ? (
            <div className="navbar__link" onClick={handleAccountClick}>
              <div className="navbar__link-top">Hello, {user.name?.split(' ')[0]}</div>
              <div className="navbar__link-bot" style={{ cursor: "pointer" }}>
                Account &amp; Lists ▾
              </div>
              <div className="navbar__dropdown">
                <a href="#profile">Your Profile</a>
                <a href="#orders">Your Orders</a>
                <a href="#wishlist">Your Wishlist</a>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
              </div>
            </div>
          ) : (
            <div className="navbar__link" onClick={handleAccountClick} style={{ cursor: "pointer" }}>
              <div className="navbar__link-top">Hello, Sign in</div>
              <div className="navbar__link-bot">Account &amp; Lists ▾</div>
            </div>
          )}

          <div className="navbar__link">
            <div className="navbar__link-top">Returns</div>
            <div className="navbar__link-bot">&amp; Orders</div>
          </div>

          <div className="navbar__cart" onClick={onCartClick} role="button" aria-label="Cart">
            <div className="navbar__cart-icon">
              <svg width="32" height="28" viewBox="0 0 32 28" fill="none">
                <path d="M4 4h2l3.5 13h14l2.5-9H8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12.5" cy="22.5" r="1.8" fill="white" />
                <circle cx="20.5" cy="22.5" r="1.8" fill="white" />
              </svg>
              <span className="navbar__cart-count">{cartCount}</span>
            </div>
            <div className="navbar__cart-label">Cart</div>
          </div>
        </div>
      </nav>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* ── Secondary Nav ── */}
      <SecondaryNavebar />
    </>
  );
}
