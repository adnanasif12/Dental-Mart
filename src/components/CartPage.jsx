import { useState } from "react";
import { cartItems } from "../data/products";
import { CartIcons } from "../data/icons";

function formatPrice(n) {
  return "৳" + n.toLocaleString("en-IN");
}

export default function CartPage({ onContinue }) {
  const [qtys, setQtys] = useState({ 0: 1, 1: 2, 2: 1 });

  const totalItems = Object.values(qtys).reduce((a, b) => a + b, 0);
  const subtotal = cartItems.reduce((s, item, i) => s + item.price * (qtys[i] || 1), 0);
  const discount = Math.round(subtotal * 0.1);
  const total = subtotal - discount;

  return (
    <div className="cart-page">
      <div className="cart-page__layout">

        {/* ── Cart Items ── */}
        <div className="cart-items">
          <div className="cart-items__title">Shopping Cart</div>
          <div className="cart-items__sub">Price shown includes applicable VAT</div>

          {cartItems.map((item, idx) => (
            <div key={item.id} className="cart-row">
              <div className="cart-row__img">{CartIcons[item.id]}</div>

              <div className="cart-row__info">
                <div className="cart-row__name">{item.name}</div>
                <div className="cart-row__brand">by {item.brand}</div>
                <div className={`cart-row__stock ${item.stockWarn ? "cart-row__stock--warn" : "cart-row__stock--ok"}`}>
                  {item.stock}
                </div>
                <div className="cart-row__actions">
                  <select
                    className="cart-row__qty"
                    value={qtys[idx]}
                    onChange={(e) => setQtys((q) => ({ ...q, [idx]: parseInt(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>Qty: {n}</option>
                    ))}
                  </select>
                  <span className="cart-row__action-link">Delete</span>
                  <span className="cart-row__action-link">Save for later</span>
                </div>
              </div>

              <div className="cart-row__price">
                <div className="cart-row__price-main">
                  {formatPrice(item.price * (qtys[idx] || 1))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Order Summary ── */}
        <div className="order-summary">
          <div className="order-summary__box">
            <div className="order-summary__free-title">Your order qualifies for FREE delivery.</div>
            <div className="order-summary__free-sub">Choose FREE Delivery option at checkout.</div>

            <div className="order-summary__row">
              <span>Items ({totalItems}):</span>
              <span className="order-summary__val--bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="order-summary__row">
              <span>Shipping &amp; handling:</span>
              <span className="order-summary__val--free">FREE</span>
            </div>
            <div className="order-summary__row">
              <span>Discount:</span>
              <span className="order-summary__val--discount">-{formatPrice(discount)}</span>
            </div>

            <hr className="order-summary__divider" />

            <div className="order-summary__total">
              <span>Order total:</span>
              <span className="order-summary__total-val">{formatPrice(total)}</span>
            </div>

            <button className="order-summary__checkout-btn">
              Proceed to checkout ({totalItems} items)
            </button>

            <div className="order-summary__continue">
              or <span onClick={onContinue}>Continue shopping</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
