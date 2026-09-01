import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  CreditCard,
  QrCode,
  Truck,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal = ({ items, totalAmount, onClose, onOrderCompleted }) => {
  const { lang, t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.shippingAddress?.fullName || user?.name || 'Priya Sharma',
    phone: user?.shippingAddress?.phone || user?.phone || '+91 98111 22334',
    street: user?.shippingAddress?.street || 'Flat 402, Sea Breeze Apts, Perry Cross Road, Bandra West',
    city: user?.shippingAddress?.city || 'Mumbai',
    state: user?.shippingAddress?.state || 'Maharashtra',
    postalCode: user?.shippingAddress?.postalCode || '400050',
    country: 'India'
  });

  const [paymentMethod, setPaymentMethod] = useState('upi'); // 'cod', 'upi', 'card'
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccessData, setOrderSuccessData] = useState(null);

  const directArtisanShare = Math.round(totalAmount * 0.85);

  const handleInputChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.phone) {
      addToast(lang === 'hi' ? 'कृपया पूरा डिलीवरी पता भरें' : 'Please complete shipping address', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.orders.create({
        items,
        shippingAddress,
        paymentMethod,
        notes
      });

      if (res.data?.success) {
        setOrderSuccessData(res.data.data);
        try {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 }
          });
        } catch (err) {}
        addToast(t('orderSuccess'), 'success');
        if (onOrderCompleted) onOrderCompleted(res.data.data);
      } else {
        addToast(res.data?.message || 'Failed to place order', 'error');
      }
    } catch (error) {
      console.error('Order error:', error);
      addToast('Failed to place order', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-terracotta-200 shadow-2xl relative my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {orderSuccessData ? (
          /* Order Confirmation Screen */
          <div className="text-center py-6 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="font-serif text-2xl font-extrabold text-indigoClay-900">
              {lang === 'hi' ? 'ऑर्डर सफलतापूर्वक दर्ज हुआ! 🙏' : 'Order Placed Successfully! 🙏'}
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 max-w-xs mx-auto leading-relaxed">
              {lang === 'hi'
                ? `ऑर्डर संख्या ${orderSuccessData.orderNumber}। कारीगर को आपका अनुरोध मिल गया है और निर्माण शुरू किया जा रहा है।`
                : `Order #${orderSuccessData.orderNumber}. The master artisan has been notified to handcraft and dispatch your piece.`}
            </p>

            {/* Direct Artisan Share Callout */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
              ✨ <strong className="font-bold">₹{orderSuccessData.directArtisanShare}</strong> of this payment is routed directly to the master artisan.
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-4 rounded-xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-md transition"
            >
              {lang === 'hi' ? 'खरीदारी जारी रखें' : 'Continue Shopping'}
            </button>
          </div>
        ) : (
          /* Order Checkout Form */
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            <div className="border-b border-gray-100 pb-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold mb-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fair Trade Certified Checkout</span>
              </div>
              <h2 className="text-xl font-serif font-extrabold text-indigoClay-900">
                {t('checkout')}
              </h2>
            </div>

            {/* Items Mini-Summary */}
            <div className="p-3.5 rounded-2xl bg-khadi border border-terracotta-100 space-y-2">
              <div className="flex justify-between text-xs font-bold text-gray-700">
                <span>{items.length} {lang === 'hi' ? 'हस्तशिल्प उत्पाद' : 'Craft Items'}</span>
                <span className="text-terracotta-800">Total: ₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <p className="text-[11px] text-emerald-800 font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-sandalwood-500" />
                <span>₹{directArtisanShare.toLocaleString('en-IN')} goes directly to artisan living wages.</span>
              </p>
            </div>

            {/* Delivery Address Form */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-indigoClay-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-terracotta-600" />
                <span>{t('shippingAddress')}</span>
              </h3>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="col-span-2">
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="Recipient Full Name"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    name="phone"
                    required
                    placeholder="Mobile Phone (+91 ...)"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                  />
                </div>

                <div className="col-span-2">
                  <input
                    type="text"
                    name="street"
                    required
                    placeholder="Street Address, House/Flat No."
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    name="postalCode"
                    required
                    placeholder="PIN Code"
                    value={shippingAddress.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-terracotta-500 text-xs text-indigoClay-900"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-indigoClay-900 uppercase tracking-wider flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-terracotta-600" />
                <span>{t('paymentMethod')}</span>
              </h3>

              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                    paymentMethod === 'cod'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>COD</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-200'
                      : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 px-6 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm shadow-lg transition flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Connecting with Artisan...</span>
                </>
              ) : (
                <>
                  <span>{t('placeOrder')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
