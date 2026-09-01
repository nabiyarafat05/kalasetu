import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { CheckoutModal } from './CheckoutModal';
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ShoppingBag
} from 'lucide-react';

export const CartDrawer = () => {
  const { lang, t } = useLanguage();
  const {
    cartItems,
    cartCount,
    cartTotal,
    directArtisanShare,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
        {/* Backdrop */}
        <div
          onClick={() => setIsCartOpen(false)}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-terracotta-100 animate-slideLeft">
            
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-indigoClay-900">{t('cart')}</h3>
                  <p className="text-xs text-gray-500">{cartCount} {lang === 'hi' ? 'हस्तशिल्प उत्पाद' : 'handcrafted items'}</p>
                </div>
              </div>

              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.productId}
                    className="p-3.5 rounded-2xl bg-khadi border border-terracotta-100 flex items-center gap-3.5"
                  >
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80'}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover border border-terracotta-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-indigoClay-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-terracotta-700 font-semibold mt-0.5">
                        by {item.artisanName || 'Master Artisan'}
                      </p>
                      <div className="text-xs font-extrabold text-indigoClay-900 mt-1">
                        ₹{item.price?.toLocaleString('en-IN')}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg p-1 shadow-2xs">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-600 transition"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold px-1 text-gray-800">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100 rounded text-gray-600 transition"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-gray-400 hover:text-red-600 text-xs p-1 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-terracotta-50 text-terracotta-600 flex items-center justify-center">
                    <ShoppingBag className="w-7 h-7" />
                  </div>
                  <p className="font-bold text-sm text-indigoClay-900">{t('cartEmpty')}</p>
                  <p className="text-xs text-gray-500">
                    {lang === 'hi' ? 'कारीगरों के हस्तशिल्प देखने के लिए बाजार में घूमें' : 'Browse authentic Indian handicrafts in the marketplace'}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white space-y-4 shadow-lg">
                {/* Fair Living Wage Direct Share Badge */}
                <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                    <div>
                      <span className="font-bold text-emerald-900 block">Direct Artisan Share</span>
                      <span className="text-[10px] text-emerald-700">85% goes directly to rural artisan</span>
                    </div>
                  </div>
                  <span className="font-extrabold text-emerald-800 text-sm">
                    ₹{directArtisanShare.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Subtotal & Free Shipping */}
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('shipping')}</span>
                    <span className="text-emerald-700 font-bold">{t('freeShipping')}</span>
                  </div>
                  <div className="flex justify-between text-sm font-extrabold text-indigoClay-900 pt-2 border-t border-gray-100">
                    <span>{t('total')}</span>
                    <span className="text-terracotta-700 text-base">₹{cartTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full py-3.5 px-4 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2 transform active:scale-98"
                >
                  <span>{t('checkout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          items={cartItems}
          totalAmount={cartTotal}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderCompleted={() => {
            clearCart();
            setIsCheckoutOpen(false);
          }}
        />
      )}
    </>
  );
};
