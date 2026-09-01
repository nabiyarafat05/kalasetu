const { generateAICatalog, calculatePriceSuggestion, enhanceProductImage } = require('../services/aiService');
const Catalog = require('../models/Catalog');
const PriceSuggestion = require('../models/PriceSuggestion');
const { isConnectedToMongo, memoryStore } = require('../config/db');

/**
 * @route POST /api/ai/catalog
 * @desc Generate AI Product Catalog (English + Hindi + SEO + Story)
 */
const generateCatalog = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      material,
      craftType,
      location,
      artisanName,
      productId
    } = req.body;

    const catalogResult = await generateAICatalog({
      name: name || '',
      description: description || '',
      category: category || 'Pottery & Ceramics',
      material: material || 'Natural Materials',
      craftType: craftType || 'Handmade Indian Craft',
      location: location || req.user?.location || 'Rajasthan, India',
      artisanName: artisanName || req.user?.name || 'Artisan'
    });

    // Save record if productId passed
    if (productId) {
      if (isConnectedToMongo()) {
        await Catalog.create({
          productId,
          ...catalogResult
        });
      } else {
        memoryStore.catalogs.push({
          id: 'cat_' + Date.now(),
          productId,
          ...catalogResult,
          createdAt: new Date().toISOString()
        });
      }
    }

    return res.json({
      success: true,
      message: 'AI Catalog generated successfully with English & Hindi translations!',
      data: catalogResult
    });
  } catch (error) {
    console.error('AI Catalog Generation Error:', error);
    res.status(500).json({ success: false, message: 'Failed to generate AI catalog.', error: error.message });
  }
};

/**
 * @route POST /api/ai/price-suggestion
 * @desc Calculate fair-trade price recommendations with breakdown
 */
const getPriceSuggestion = async (req, res) => {
  try {
    const {
      category = 'Pottery & Ceramics',
      material = 'Natural Clay',
      rawMaterialCost = 300,
      productionCost = 400,
      laborHours = 6,
      craftComplexity = 'intricate',
      productId
    } = req.body;

    const priceResult = calculatePriceSuggestion({
      category,
      material,
      rawMaterialCost: Number(rawMaterialCost) || 0,
      productionCost: Number(productionCost) || 0,
      laborHours: Number(laborHours) || 6,
      craftComplexity,
      location: req.user?.location || 'India'
    });

    // Save record if productId passed
    if (productId) {
      if (isConnectedToMongo()) {
        await PriceSuggestion.create({
          productId,
          ...priceResult
        });
      } else {
        memoryStore.priceSuggestions.push({
          id: 'price_' + Date.now(),
          productId,
          ...priceResult,
          createdAt: new Date().toISOString()
        });
      }
    }

    return res.json({
      success: true,
      message: 'Fair-trade price suggestion calculated successfully!',
      data: priceResult
    });
  } catch (error) {
    console.error('Price Suggestion Error:', error);
    res.status(500).json({ success: false, message: 'Failed to calculate price suggestion.', error: error.message });
  }
};

/**
 * @route POST /api/ai/enhance-image
 * @desc Process and enhance product image for e-commerce readiness
 */
const enhanceImage = async (req, res) => {
  try {
    let imageUrl = '';
    const preset = req.body.preset || 'studio-white';

    if (req.file) {
      // In uploaded file mode
      imageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.imageUrl) {
      imageUrl = req.body.imageUrl;
    } else {
      imageUrl = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80';
    }

    const enhancementResult = await enhanceProductImage({
      imageUrl,
      enhancementPreset: preset
    });

    return res.json({
      success: true,
      message: 'Product image successfully enhanced for e-commerce showcase!',
      data: enhancementResult
    });
  } catch (error) {
    console.error('Image Enhancement Error:', error);
    res.status(500).json({ success: false, message: 'Failed to enhance image.', error: error.message });
  }
};

module.exports = {
  generateCatalog,
  getPriceSuggestion,
  enhanceImage
};
