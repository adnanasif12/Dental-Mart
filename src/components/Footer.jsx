import { footerColumns } from "../data/products";

export default function Footer() {
  return (
    <footer>
      {/* Back to top */}
      <div className="footer-top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <span>Back to top</span>
      </div>

      {/* Links grid */}
      <div className="footer-mid">
        <div className="footer-mid__grid">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <div className="footer-mid__col-title">{col.title}</div>
              {col.links.map((link) => (
                <a key={link} className="footer-mid__link">{link}</a>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bot">
        <div className="footer-bot__logo">
          Dental<span>Mart</span>
        </div>
        <div className="footer-bot__links">
          {["Conditions of Use", "Privacy Notice", "Accessibility Statement", "Your Ads Privacy Choices"].map((l) => (
            <span key={l} className="footer-bot__link">{l}</span>
          ))}
        </div>
        <div className="footer-bot__copy">
          © 2026, DentalMart Bangladesh, Inc. or its affiliates
        </div>
      </div>
    </footer>
  );
}
