import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';
import { useLanguage } from './LanguageContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('kalasetu_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    localStorage.setItem('kalasetu_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Sync with backend if available
  const fetchCart = async () => {
    try {
      const res = await api.cart.get();
      if (res.data?.success && Array.isArray(res.data.data)) {
        setCartItems(res.data.data);
      }
    } catch (e) {
      // Keep local
    }
  };

  const addToCart = async (product, quantity = 1) => {
    const productId = product.id || product._id;
    const item = {
      productId: productId.toString(),
      name: product.name,
      price: Number(product.price),
      quantity: Number(quantity),
      imageUrl: product.enhancedImageUrl || product.imageUrl || '',
      category: product.category || 'Handicrafts',
      artisanId: product.artisanId || product.userId || '65e000000000000000000001',
      artisanName: product.artisanName || 'Master Artisan'
    };

    setCartItems(prev => {
      const existingIdx = prev.findIndex(it => it.productId === item.productId);
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, item];
    });

    addToast(t('addedToCart'), 'success');

    try {
      await api.cart.add(item);
    } catch (e) {
      // Local state is already updated
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      return removeFromCart(productId);
    }

    setCartItems(prev =>
      prev.map(item => item.productId === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const removeFromCart = async (productId) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
    addToast('Item removed from cart', 'info');
    try {
      await api.cart.remove(productId);
    } catch (e) {}
  };

  const clearCart = async () => {
    setCartItems([]);
    try {
      await api.cart.clear();
    } catch (e) {}
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
  const cartTotal = cartItems.reduce((acc, curr) => acc + (curr.price * (curr.quantity || 1)), 0);
  const directArtisanShare = Math.round(cartTotal * 0.85);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      directArtisanShare,
      isCartOpen,
      setIsCartOpen,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
