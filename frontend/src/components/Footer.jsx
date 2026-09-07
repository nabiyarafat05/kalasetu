<<<<<<< HEAD
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
            🏺 Artisan Hub{" "}
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
=======
import React from 'react';

export const Footer = () => {
  return (
    <footer className="mt-16 border-t border-terracotta-100 bg-white px-4 pt-10 pb-5">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="sm:max-w-xs">
          <p className="font-serif text-xl font-extrabold text-terracotta-700">Kalasetu</p>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Digital commerce without digital complexity
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-col gap-2 text-sm text-indigoClay-700">
          <p className="mb-1 font-semibold text-indigoClay-900">Quick links</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <a href="#home" className="transition hover:text-terracotta-600">Home</a>
            <a href="#browse-products" className="transition hover:text-terracotta-600">Browse Products</a>
            <a href="#about" className="transition hover:text-terracotta-600">About</a>
            <a href="#contact" className="transition hover:text-terracotta-600">Contact</a>
          </div>
        </nav>

        <div className="text-sm text-gray-500 sm:text-right">
          <p className="font-semibold text-indigoClay-900">Built for Smart India Hackathon 2026</p>
          <p className="mt-2">Team CodeDiggers</p>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-terracotta-100 pt-4 text-center text-xs text-gray-400">
        © 2026 Kalasetu. All rights reserved.
      </div>
    </footer>
>>>>>>> 8bb3e25101d941776ab5d69cd85b258417091ffe
  );
}

