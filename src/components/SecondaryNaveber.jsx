import React from "react";
import AllMenu from "./AllMenu";
import TodaysDeals from "./TodaysDeals";
import CustomerService from "./CustomerService";
import BulkOrders from "./BulkOrders";
import "../styles/SecondaryNaveber.css";

/**
 * SecondaryNavbar
 * The dark nav strip containing: All | Today's Deals | Customer Service | Bulk Orders
 * (the red-box section from the DentalMart screenshot)
 */
const SecondaryNavbar = () => {
  return (
    <nav className="secondary-navbar" aria-label="Secondary navigation">
      <div className="secondary-navbar__left">
        <AllMenu />
        <TodaysDeals />
        <CustomerService />
        <BulkOrders />
      </div>
    </nav>
  );
};

export default SecondaryNavbar;
