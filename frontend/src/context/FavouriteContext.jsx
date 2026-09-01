import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';
import { useLanguage } from './LanguageContext';

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favouriteIds, setFavouriteIds] = useState(() => {
    const saved = localStorage.getItem('kalasetu_fav_ids');
    return saved ? JSON.parse(saved) : [];
  });
  const [favouriteProducts, setFavouriteProducts] = useState([]);
  const { addToast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    localStorage.setItem('kalasetu_fav_ids', JSON.stringify(favouriteIds));
  }, [favouriteIds]);

  const toggleFavourite = async (product) => {
    const productId = (product.id || product._id).toString();
    const exists = favouriteIds.includes(productId);

    if (exists) {
      setFavouriteIds(prev => prev.filter(id => id !== productId));
      setFavouriteProducts(prev => prev.filter(p => (p.id || p._id).toString() !== productId));
      addToast(t('removeFromWishlist'), 'info');
    } else {
      setFavouriteIds(prev => [...prev, productId]);
      setFavouriteProducts(prev => [...prev, product]);
      addToast(t('saveToWishlist'), 'success');
    }

    try {
      await api.favourites.toggle(productId);
    } catch (e) {}
  };

  const isFavourite = (productId) => {
    if (!productId) return false;
    return favouriteIds.includes(productId.toString());
  };

  const favCount = favouriteIds.length;

  return (
    <FavouriteContext.Provider value={{
      favouriteIds,
      favouriteProducts,
      favCount,
      toggleFavourite,
      isFavourite
    }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = () => useContext(FavouriteContext);
