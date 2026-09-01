import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import {
  PackageCheck,
  Truck,
  Clock,
  CheckCircle2,
  MapPin,
  Sparkles,
  RefreshCw,
  Phone,
  User,
  ShoppingBag,
  Layers,
  ChevronRight
} from 'lucide-react';

export const OrdersPage = ({ onSelectProduct }) => {
  const { lang, t } = useLanguage();
  const { user, isArtisan, isBuyer } = useAuth();
  const { addToast } = useToast();

  const [activeView, setActiveView] = useState(isArtisan ? 'artisan' : 'buyer');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      let res;
      if (activeView === 'artisan') {
        res = await api.orders.getArtisanOrders();
      } else {
        res = await api.orders.getBuyerOrders();
      }

      if (res.data?.success) {
        setOrders(res.data.data);
      }
    } catch (error) {
      console.error('Fetch orders error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeView]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      const res = await api.orders.updateStatus(orderId, newStatus);
      if (res.data?.success) {
        addToast(res.data.message, 'success');
        fetchOrders();
      }
    } catch (error) {
      addToast('Failed to update status', 'error');
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_crafting':
        return {
          label: lang === 'hi' ? 'कारीगर निर्माण में' : 'In Crafting by Artisan',
          bg: 'bg-sandalwood-100 text-sandalwood-900 border-sandalwood-300'
        };
      case 'dispatched':
        return {
          label: lang === 'hi' ? 'डिस्पैच / रवाना हुआ' : 'Dispatched / In Transit',
          bg: 'bg-blue-100 text-blue-900 border-blue-300'
        };
      case 'delivered':
        return {
          label: lang === 'hi' ? 'सफलतापूर्वक प्राप्त हुआ' : 'Delivered to Buyer',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300'
        };
      default:
        return {
          label: lang === 'hi' ? 'ऑर्डर दर्ज हुआ' : 'Order Placed',
          bg: 'bg-gray-100 text-gray-800 border-gray-300'
        };
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-terracotta-700 via-indigoClay-900 to-terracotta-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <PackageCheck className="w-3.5 h-3.5 text-sandalwood-300" />
              <span>Real-Time Craft Fulfillment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold leading-tight">
              {t('orders')}
            </h1>
            <p className="text-xs sm:text-sm text-terracotta-100 mt-1 font-medium">
              {lang === 'hi' ? 'अपने ऑर्डर की स्थिति और डिलीवरी विवरण ट्रैक करें' : 'Track orders, delivery timelines, and artisan crafting progress'}
            </p>
          </div>

          <button
            onClick={fetchOrders}
            className="p-3 bg-white/20 hover:bg-white/30 rounded-2xl transition self-start sm:self-auto flex items-center gap-2 text-xs font-bold"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Two-Sided Tab Switcher (Buyer Orders vs Artisan Incoming Orders) */}
      <div className="flex items-center justify-center">
        <div className="bg-white p-1.5 rounded-2xl border border-terracotta-200 shadow-xs flex items-center gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveView('buyer')}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeView === 'buyer'
                ? 'bg-terracotta-600 text-white shadow-sm'
                : 'text-gray-700 hover:text-terracotta-600'
            }`}
          >
            {t('myOrders')} (Buyer View)
          </button>

          <button
            onClick={() => setActiveView('artisan')}
            className={`px-5 py-2.5 rounded-xl transition ${
              activeView === 'artisan'
                ? 'bg-terracotta-600 text-white shadow-sm'
                : 'text-gray-700 hover:text-terracotta-600'
            }`}
          >
            {t('incomingOrders')} (Artisan View)
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {loading ? (
          <div className="space-y-4">
            {[1, 2].map((n) => (
              <div key={n} className="bg-white rounded-3xl p-6 border border-gray-100 animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-16 bg-gray-100 rounded-2xl"></div>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          orders.map((order) => {
            const statusInfo = getStatusBadge(order.orderStatus);
            return (
              <div
                key={order.id || order._id}
                className="bg-white rounded-3xl p-6 border border-terracotta-200 shadow-craft space-y-5"
              >
                {/* Top Order Metadata */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-extrabold text-indigoClay-900">
                        {order.orderNumber}
                      </span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusInfo.bg}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-0.5 block">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Artisan Status Updater Control (If in Artisan view) */}
                  {activeView === 'artisan' && (
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-gray-500 uppercase">Update Status:</span>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleUpdateStatus(order.id || order._id || order.orderNumber, e.target.value)}
                        className="bg-khadi border border-terracotta-200 text-xs rounded-xl px-3 py-1.5 font-bold text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500"
                      >
                        <option value="placed">Order Placed</option>
                        <option value="in_crafting">In Crafting (कारीगरी जारी)</option>
                        <option value="dispatched">Dispatched (रवाना हुआ)</option>
                        <option value="delivered">Delivered (प्राप्त हुआ)</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Items in this Order */}
                <div className="space-y-3">
                  {order.items?.map((it, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-khadi border border-terracotta-100 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={it.imageUrl || 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=400&q=80'}
                          alt={it.name}
                          className="w-14 h-14 rounded-xl object-cover border border-terracotta-200 flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-indigoClay-900">
                            {it.name}
                          </h4>
                          <p className="text-[11px] text-gray-500">
                            by {it.artisanName || 'Master Artisan'} • Qty: {it.quantity || 1}
                          </p>
                        </div>
                      </div>

                      <div className="text-sm font-extrabold text-terracotta-800 flex-shrink-0">
                        ₹{(it.price * (it.quantity || 1)).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping & Payment Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100 text-xs text-gray-600">
                  {/* Delivery details */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                    <span className="font-bold text-indigoClay-900 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-terracotta-600" />
                      <span>{t('shippingAddress')}</span>
                    </span>
                    <p className="font-medium text-gray-800">{order.shippingAddress?.fullName} ({order.shippingAddress?.phone})</p>
                    <p className="text-gray-500 text-[11px]">
                      {order.shippingAddress?.street}, {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.postalCode}
                    </p>
                  </div>

                  {/* Payment & Total Amount */}
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-emerald-950">Payment Method:</span>
                      <span className="uppercase font-bold text-[10px] bg-emerald-200 px-2 py-0.5 rounded-md text-emerald-900">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-extrabold text-indigoClay-900 pt-1">
                      <span>Total Amount:</span>
                      <span className="text-terracotta-800">₹{order.totalAmount?.toLocaleString('en-IN')}</span>
                    </div>
                    <p className="text-[10px] text-emerald-700 font-semibold pt-0.5">
                      ✨ Direct Artisan Living Share: ₹{order.directArtisanShare?.toLocaleString('en-IN') || Math.round(order.totalAmount * 0.85)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-terracotta-200 p-8">
            <PackageCheck className="w-12 h-12 text-gray-300 mx-auto mb-2" />
            <h3 className="font-bold text-base text-indigoClay-900">
              {activeView === 'artisan' ? 'No incoming customer orders yet' : 'No past orders found'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {activeView === 'artisan'
                ? 'When buyers purchase your handicrafts, orders will appear here for fulfillment.'
                : 'Browse the artisan marketplace and place your first craft purchase!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
