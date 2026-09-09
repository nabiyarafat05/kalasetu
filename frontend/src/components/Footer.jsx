import "./Footer.css";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button className="back-to-top" onClick={scrollToTop}>
        Back to top ↑
      </button>

      <footer className="site-footer">
        <div className="footer-columns">
          <div className="footer-col">
            <h4>Get to Know Us</h4>
            <ul>
              <li><a href="#">About Artisan Hub</a></li>
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Meet the Artisans</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>For Artisans</h4>
            <ul>
              <li><a href="#">Artisan Dashboard</a></li>
              <li><a href="#">Add New Product</a></li>
              <li><a href="#">Fair Living Wage Policy</a></li>
              <li><a href="#">Seller Support</a></li>
              <li><a href="#">Craft Guidelines</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>AI-Powered Tools</h4>
            <ul>
              <li><a href="#">AI Catalog Generator</a></li>
              <li><a href="#">AI Image Enhancer</a></li>
              <li><a href="#">AI Price Suggestion</a></li>
              <li><a href="#">Instant Product Capture</a></li>
              <li><a href="#">Voice Catalog (EN / हिन्दी)</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect With Us</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">Buyer Support</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-brand-row">
          <div className="footer-brand">
            <img src="/kalasetu-logo.jpeg" alt="KalaSetu logo" className="footer-brand-logo" />
            <span className="brand-name">KalaSetu</span>
            <span className="badge">AI-Powered Digital Artisan Hub</span>
          </div>

          <div className="footer-locale">
            <div className="locale-pill">🌐 English</div>
            <div className="locale-pill">📍 Sanganer, Jaipur, Rajasthan</div>
            <div className="locale-pill">₹ INR</div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Artisan Hub. Digitizing handcrafted heritage worldwide.</span>
          <span className="dot">•</span>
          <a href="#">Privacy Policy</a>
          <span className="dot">•</span>
          <a href="#">Terms of Use</a>
          <span className="dot">•</span>
          <a href="#">Cookies</a>
        </div>
      </footer>
    </>
  );
}
