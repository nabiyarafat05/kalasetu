import React from 'react';
import { buildPassportFromProduct } from '../utils/craftPassport';
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  MapPin,
  MessageCircleMore,
  Package2,
  ShieldCheck,
  Sparkles,
  Star,
  UserRound,
  Wrench
} from 'lucide-react';

export const CraftPassportPage = ({ product, onBack, onSelectArtisan }) => {
  if (!product) return null;

  const passport = buildPassportFromProduct(product);
  const passportLink = `https://kalasetu.app/craft/${encodeURIComponent(passport.passportId)}`;

  const handleOpenWhatsApp = () => {
    const text = `Hi KalaSetu team, I would like to learn more about the Craft Passport for ${product.name}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="mx-auto w-full max-w-5xl pb-16">
      <div className="mb-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-terracotta-200 bg-white px-3.5 py-2 text-xs font-bold text-terracotta-700 shadow-sm transition hover:border-terracotta-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="rounded-full border border-terracotta-200 bg-terracotta-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-terracotta-700">
          KalaSetu Craft Passport
        </div>
      </div>

      <div className="overflow-hidden rounded-[32px] border border-terracotta-100 bg-white shadow-craft">
        <div className="bg-gradient-to-r from-terracotta-50 via-white to-khadi px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-terracotta-700">KALASETU</p>
              <h1 className="mt-2 font-serif text-3xl text-indigoClay-900 sm:text-4xl">Craft Passport</h1>
            </div>

            <div className="rounded-2xl border border-terracotta-200 bg-white px-3 py-2 text-right shadow-sm">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">Passport ID</p>
              <p className="mt-1 font-mono text-sm font-bold text-terracotta-700">{passport.passportId}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[26px] border border-terracotta-100 bg-khadi">
              <img src={product.imageUrl} alt={product.name} className="h-[360px] w-full object-cover" />
            </div>

            <div className="rounded-[24px] border border-terracotta-100 bg-white p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <Package2 className="h-4 w-4 text-terracotta-600" />
                Product identity
              </div>
              <h2 className="mt-3 font-serif text-2xl text-indigoClay-900">{product.name}</h2>
              <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-gray-600">
                <span className="rounded-full border border-terracotta-200 bg-terracotta-50 px-2.5 py-1.5">{product.category}</span>
                <span className="rounded-full border border-terracotta-200 bg-terracotta-50 px-2.5 py-1.5">{product.material}</span>
                <span className="rounded-full border border-terracotta-200 bg-terracotta-50 px-2.5 py-1.5">{product.location}</span>
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-700">{passport.productSummary}</p>
            </div>
          </div>

          <div className="space-y-5">
            <section className="rounded-[24px] border border-terracotta-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <UserRound className="h-4 w-4 text-terracotta-600" />
                Meet the maker
              </div>

              <div className="mt-4 flex items-center gap-3 rounded-2xl bg-khadi p-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-100 text-xl">🪔</div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Artisan</p>
                  <button
                    type="button"
                    onClick={() => onSelectArtisan && onSelectArtisan(product.artisanId || product.userId)}
                    className="text-left text-base font-bold text-terracotta-700 transition hover:text-terracotta-800"
                  >
                    {product.artisanName || 'Artisan'}
                  </button>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-gray-700">{passport.artisanStory}</p>
            </section>

            <section className="rounded-[24px] border border-terracotta-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <Sparkles className="h-4 w-4 text-terracotta-600" />
                Craft DNA
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-khadi p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Origin</p>
                  <p className="mt-2 text-sm font-semibold text-indigoClay-900">{passport.origin}</p>
                </div>
                <div className="rounded-2xl bg-khadi p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Technique</p>
                  <p className="mt-2 text-sm font-semibold text-indigoClay-900">{passport.techniques[0] || 'Information not available'}</p>
                </div>
                <div className="rounded-2xl bg-khadi p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Materials</p>
                  <p className="mt-2 text-sm font-semibold text-indigoClay-900">{passport.materials.join(', ') || 'Information not available'}</p>
                </div>
                <div className="rounded-2xl bg-khadi p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Process</p>
                  <p className="mt-2 text-sm font-semibold text-indigoClay-900">{passport.process[0] || 'Information not available'}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-terracotta-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <BookOpen className="h-4 w-4 text-terracotta-600" />
                Craft story
              </div>
              <p className="mt-4 text-sm leading-7 text-gray-700">{passport.craftStory}</p>
            </section>

            <section className="rounded-[24px] border border-terracotta-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <ShieldCheck className="h-4 w-4 text-terracotta-600" />
                Care instructions
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-700">
                {passport.careInstructions.map((step) => (
                  <li key={step} className="flex items-start gap-2">
                    <Star className="mt-1 h-3.5 w-3.5 text-terracotta-600" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-[24px] border border-terracotta-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <Wrench className="h-4 w-4 text-terracotta-600" />
                Product information
              </div>
              <div className="mt-4 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                <div className="rounded-2xl bg-khadi p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Price</p>
                  <p className="mt-2 font-bold text-indigoClay-900">₹{Number(product.price || 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="rounded-2xl bg-khadi p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-gray-500">Location</p>
                  <p className="mt-2 font-bold text-indigoClay-900">{product.location || 'Information not available'}</p>
                </div>
              </div>
            </section>

            <section className="rounded-[24px] border border-terracotta-100 bg-white p-4 sm:p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigoClay-900">
                <BadgeCheck className="h-4 w-4 text-terracotta-600" />
                Transparency note
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-700">
                Information presented here is artisan-provided, AI-assisted, or drawn from existing product data. It is not an independent certification or legal verification.
              </p>
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                Public passport link: {passportLink}
              </div>
            </section>

            <button
              type="button"
              onClick={handleOpenWhatsApp}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1ea752]"
            >
              <MessageCircleMore className="h-4 w-4" />
              Support the maker on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
