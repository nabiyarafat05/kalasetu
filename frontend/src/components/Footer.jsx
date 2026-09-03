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
  );
};
