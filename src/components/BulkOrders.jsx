import React, { useState } from "react";
import "../styles/BulkOrders.css";

const BulkOrders = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bulk-wrapper">
      <a
        href="#"
        className="bulk-link"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <span className="bulk-text">Bulk Orders</span>
        <span className="bulk-badge">B2B</span>
      </a>

      {showTooltip && (
        <div className="bulk-tooltip">
          Special pricing for orders of 10+ units
        </div>
      )}
    </div>
  );
};

export default BulkOrders;
