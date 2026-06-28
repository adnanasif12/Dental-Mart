import React, { useState } from "react";
import "../styles/AllMenu.css";

const AllMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    "Dental Chairs",
    "Surgical Sets",
    "X-Ray Machines",
    "Sterilizers",
    "Scalers & Curettes",
    "Handpieces",
    "New Arrivals",
  ];

  return (
    <div className="all-menu-wrapper">
      <button
        className="all-menu-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="all-label">All</span>
      </button>

      {isOpen && (
        <>
          <div className="all-menu-backdrop" onClick={() => setIsOpen(false)} />
          <div className="all-menu-dropdown">
            <div className="dropdown-header">Browse Categories</div>
            <ul className="dropdown-list">
              {categories.map((cat) => (
                <li key={cat} className="dropdown-item">
                  <a href="#" onClick={() => setIsOpen(false)}>
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default AllMenu;
