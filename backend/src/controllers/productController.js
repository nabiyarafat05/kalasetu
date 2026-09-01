const Product = require('../models/Product');
const { isConnectedToMongo, memoryStore } = require('../config/db');

/**
 * @route GET /api/products
 * @desc Get all artisan products with rich multi-faceted filtering and search
 */
const getProducts = async (req, res) => {
  try {
    const {
      category,
      region,
      status,
      search,
      minPrice,
      maxPrice,
      artisanId,
      sort = 'newest',
      limit = 100
    } = req.query;

    if (isConnectedToMongo()) {
      let query = {};

      if (category && category !== 'All' && category !== 'all') {
        query.category = { $regex: category.trim(), $options: 'i' };
      }

      if (status && status !== 'all') {
        query.status = status;
      }

      if (artisanId) {
        query.userId = artisanId;
      }

      if (region && region !== 'All' && region !== 'all') {
        query.$or = [
          { location: { $regex: region, $options: 'i' } },
          { craftType: { $regex: region, $options: 'i' } },
          { region: { $regex: region, $options: 'i' } }
        ];
      }

      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }

      if (search) {
        const s = search.trim();
        query.$or = [
          { name: { $regex: s, $options: 'i' } },
          { description: { $regex: s, $options: 'i' } },
          { craftType: { $regex: s, $options: 'i' } },
          { location: { $regex: s, $options: 'i' } },
          { artisanName: { $regex: s, $options: 'i' } },
          { material: { $regex: s, $options: 'i' } }
        ];
      }

      let sortOptions = { createdAt: -1 };
      if (sort === 'price_low') sortOptions = { price: 1 };
      if (sort === 'price_high') sortOptions = { price: -1 };
      if (sort === 'name') sortOptions = { name: 1 };

      const products = await Product.find(query).sort(sortOptions).limit(Number(limit));
      return res.json({
        success: true,
        count: products.length,
        data: products
      });
    } else {
      // In-Memory store filtering
      let results = [...memoryStore.products];

      if (category && category !== 'All' && category !== 'all') {
        const cat = category.toLowerCase().trim();
        results = results.filter(p => p.category && (p.category.toLowerCase().includes(cat) || cat.includes(p.category.toLowerCase())));
      }

      if (status && status !== 'all') {
        results = results.filter(p => p.status === status);
      }

      if (artisanId) {
        results = results.filter(p => p.userId === artisanId || p.artisanId === artisanId);
      }

      if (region && region !== 'All' && region !== 'all') {
        const r = region.toLowerCase().trim();
        results = results.filter(p => 
          (p.location && p.location.toLowerCase().includes(r)) ||
          (p.craftType && p.craftType.toLowerCase().includes(r)) ||
          (p.region && p.region.toLowerCase().includes(r))
        );
      }

      if (minPrice) {
        results = results.filter(p => p.price >= Number(minPrice));
      }
      if (maxPrice) {
        results = results.filter(p => p.price <= Number(maxPrice));
      }

      if (search) {
        const s = search.toLowerCase().trim();
        results = results.filter(p =>
          (p.name && p.name.toLowerCase().includes(s)) ||
          (p.description && p.description.toLowerCase().includes(s)) ||
          (p.hindiDescription && p.hindiDescription.includes(s)) ||
          (p.craftType && p.craftType.toLowerCase().includes(s)) ||
          (p.location && p.location.toLowerCase().includes(s)) ||
          (p.artisanName && p.artisanName.toLowerCase().includes(s)) ||
          (p.material && p.material.toLowerCase().includes(s))
        );
      }

      // Sort
      if (sort === 'price_low') {
        results.sort((a, b) => a.price - b.price);
      } else if (sort === 'price_high') {
        results.sort((a, b) => b.price - a.price);
      } else if (sort === 'name') {
        results.sort((a, b) => a.name.localeCompare(b.name));
      } else {
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      return res.json({
        success: true,
        count: results.length,
        data: results
      });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch products', error: error.message });
  }
};

/**
 * @route GET /api/products/:id
 * @desc Get single product details
 */
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      if (!product) {
        product = await Product.findOne({ id });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      return res.json({ success: true, data: product });
    } else {
      const product = memoryStore.products.find(p => p.id === id || p._id === id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      return res.json({ success: true, data: product });
    }
  } catch (error) {
    console.error('Error fetching single product:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch product details', error: error.message });
  }
};

/**
 * @route POST /api/products
 * @desc Create a new craft product
 */
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      hindiDescription,
      category,
      material,
      dimensions,
      weight,
      craftType,
      location,
      price,
      imageUrl,
      enhancedImageUrl,
      status = 'active',
      artisanName,
      aiCatalogData,
      priceSuggestion
    } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: 'Product name and price are required.' });
    }

    const defaultImage = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80';
    const productPayload = {
      userId: req.user?.id || req.user?._id || '65e000000000000000000001',
      artisanId: req.user?.id || req.user?._id || '65e000000000000000000001',
      artisanName: artisanName || req.user?.name || 'Radha Devi',
      name,
      description: description || 'Beautifully handcrafted artisan item.',
      hindiDescription: hindiDescription || '',
      category: category || 'Pottery & Ceramics',
      material: material || 'Natural Materials',
      dimensions: dimensions || 'Standard Handcrafted Size',
      weight: weight || 'Approx 500g',
      craftType: craftType || 'Handmade Craft',
      location: location || req.user?.location || 'Rajasthan, India',
      price: Number(price),
      imageUrl: imageUrl || defaultImage,
      enhancedImageUrl: enhancedImageUrl || '',
      status: status || 'active',
      aiCatalogData: aiCatalogData || null,
      priceSuggestion: priceSuggestion || null,
      createdAt: new Date().toISOString()
    };

    if (isConnectedToMongo()) {
      const product = await Product.create(productPayload);
      return res.status(201).json({
        success: true,
        message: 'Product created and listed successfully!',
        data: product
      });
    } else {
      const newProduct = {
        _id: 'prod_' + Date.now(),
        id: 'prod_' + Date.now(),
        ...productPayload
      };
      memoryStore.products.unshift(newProduct);

      return res.status(201).json({
        success: true,
        message: 'Product created and listed successfully!',
        data: newProduct
      });
    }
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Failed to create product', error: error.message });
  }
};

/**
 * @route PUT /api/products/:id
 * @desc Update an existing craft product
 */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (isConnectedToMongo()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
      }
      if (!product) {
        product = await Product.findOneAndUpdate({ id }, updates, { new: true });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found to update.' });
      }

      return res.json({
        success: true,
        message: 'Product updated successfully!',
        data: product
      });
    } else {
      const index = memoryStore.products.findIndex(p => p.id === id || p._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found to update.' });
      }

      memoryStore.products[index] = {
        ...memoryStore.products[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };

      return res.json({
        success: true,
        message: 'Product updated successfully!',
        data: memoryStore.products[index]
      });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Failed to update product', error: error.message });
  }
};

/**
 * @route DELETE /api/products/:id
 * @desc Delete a product
 */
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo()) {
      let deleted = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        deleted = await Product.findByIdAndDelete(id);
      }
      if (!deleted) {
        deleted = await Product.findOneAndDelete({ id });
      }

      if (!deleted) {
        return res.status(404).json({ success: false, message: 'Product not found to delete.' });
      }

      return res.json({ success: true, message: 'Product removed from catalog.' });
    } else {
      const index = memoryStore.products.findIndex(p => p.id === id || p._id === id);
      if (index === -1) {
        return res.status(404).json({ success: false, message: 'Product not found to delete.' });
      }

      memoryStore.products.splice(index, 1);
      return res.json({ success: true, message: 'Product removed from catalog.' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Failed to delete product', error: error.message });
  }
};

/**
 * @route PATCH /api/products/:id/toggle-status
 * @desc Quick toggle product status (active <-> sold)
 */
const toggleProductStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (isConnectedToMongo()) {
      let product = null;
      if (id.match(/^[0-9a-fA-F]{24}$/)) {
        product = await Product.findById(id);
      }
      if (!product) {
        product = await Product.findOne({ id });
      }

      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      product.status = product.status === 'active' ? 'sold' : 'active';
      await product.save();

      return res.json({
        success: true,
        message: `Product marked as ${product.status}.`,
        data: product
      });
    } else {
      const product = memoryStore.products.find(p => p.id === id || p._id === id);
      if (!product) {
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      product.status = product.status === 'active' ? 'sold' : 'active';
      return res.json({
        success: true,
        message: `Product marked as ${product.status}.`,
        data: product
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to toggle status', error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductStatus
};
