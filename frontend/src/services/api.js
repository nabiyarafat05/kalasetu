const API_BASE = '/api';

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('kalasetu_token') || 'demo_token';
  const headers = {
    'Authorization': `Bearer ${token}`
  };
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  return headers;
};

export const api = {
  // Auth Endpoints
  auth: {
    login: async (email, password) => {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ email, password })
      });
      return { data: await res.json() };
    },
    register: async (userData) => {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(userData)
      });
      return { data: await res.json() };
    },
    demoLogin: async (role = 'artisan') => {
      const res = await fetch(`${API_BASE}/auth/demo`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ role })
      });
      return { data: await res.json() };
    },
    getMe: async () => {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    updateProfile: async (profileData) => {
      const res = await fetch(`${API_BASE}/auth/profile`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(profileData)
      });
      return { data: await res.json() };
    }
  },

  // Artisans Directory
  artisans: {
    getAll: async () => {
      const res = await fetch(`${API_BASE}/artisans`);
      return { data: await res.json() };
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE}/artisans/${id}`);
      return { data: await res.json() };
    }
  },

  // Products Endpoints
  products: {
    getAll: async (params = {}) => {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE}/products${query ? '?' + query : ''}`);
      return { data: await res.json() };
    },
    getById: async (id) => {
      const res = await fetch(`${API_BASE}/products/${id}`);
      return { data: await res.json() };
    },
    create: async (productData) => {
      const res = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(productData)
      });
      return { data: await res.json() };
    },
    update: async (id, productData) => {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(productData)
      });
      return { data: await res.json() };
    },
    delete: async (id) => {
      const res = await fetch(`${API_BASE}/products/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    toggleStatus: async (id) => {
      const res = await fetch(`${API_BASE}/products/${id}/toggle-status`, {
        method: 'PATCH',
        headers: getHeaders()
      });
      return { data: await res.json() };
    }
  },

  // Cart Endpoints
  cart: {
    get: async () => {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    add: async (item) => {
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(item)
      });
      return { data: await res.json() };
    },
    remove: async (productId) => {
      const res = await fetch(`${API_BASE}/cart/${productId}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    clear: async () => {
      const res = await fetch(`${API_BASE}/cart`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      return { data: await res.json() };
    }
  },

  // Favourites Endpoints
  favourites: {
    get: async () => {
      const res = await fetch(`${API_BASE}/favourites`, {
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    toggle: async (productId) => {
      const res = await fetch(`${API_BASE}/favourites/${productId}`, {
        method: 'POST',
        headers: getHeaders()
      });
      return { data: await res.json() };
    }
  },

  // Orders Endpoints
  orders: {
    create: async (orderData) => {
      const res = await fetch(`${API_BASE}/orders`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(orderData)
      });
      return { data: await res.json() };
    },
    getBuyerOrders: async () => {
      const res = await fetch(`${API_BASE}/orders/buyer`, {
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    getArtisanOrders: async () => {
      const res = await fetch(`${API_BASE}/orders/artisan`, {
        headers: getHeaders()
      });
      return { data: await res.json() };
    },
    updateStatus: async (orderId, orderStatus) => {
      const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: getHeaders(),
        body: JSON.stringify({ orderStatus })
      });
      return { data: await res.json() };
    }
  },

  // AI Endpoints
  ai: {
    generateCatalog: async (craftData) => {
      const res = await fetch(`${API_BASE}/ai/catalog`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(craftData)
      });
      return { data: await res.json() };
    },
    getPriceSuggestion: async (pricingData) => {
      const res = await fetch(`${API_BASE}/ai/price-suggestion`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(pricingData)
      });
      return { data: await res.json() };
    },
    enhanceImage: async (formDataOrJson, isForm = false) => {
      const res = await fetch(`${API_BASE}/ai/enhance-image`, {
        method: 'POST',
        headers: getHeaders(isForm),
        body: isForm ? formDataOrJson : JSON.stringify(formDataOrJson)
      });
      return { data: await res.json() };
    }
  }
};
