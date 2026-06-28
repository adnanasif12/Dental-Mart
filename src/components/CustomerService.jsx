import React, { useState } from "react";
import "../styles/CustomerService.css";

const CustomerService = () => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { label: "Help Center", href: "#" },
    { label: "Track Your Order", href: "#" },
    { label: "Returns & Refunds", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

  return (
    <div className="cs-wrapper">
      <button
        className="cs-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="cs-text">Customer Service</span>
      </button>

      {isOpen && (
        <>
          <div className="cs-backdrop" onClick={() => setIsOpen(false)} />
          <div className="cs-dropdown">
            <ul className="cs-list">
              {options.map((opt) => (
                <li key={opt.label} className="cs-item">
                  <a href={opt.href} onClick={() => setIsOpen(false)}>
                    {opt.label}
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

export default CustomerService;
