const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    artisanName: {
      type: String,
      default: 'Radha Devi'
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    hindiDescription: {
      type: String,
      default: ''
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Pottery & Ceramics', 'Textiles & Handloom', 'Woodwork & Carvings', 'Jewelry & Beads', 'Paintings & Folk Art', 'Metalcraft & Brass', 'Leather & Footwear', 'Other Handicrafts']
    },
    material: {
      type: String,
      default: 'Organic / Traditional Materials'
    },
    dimensions: {
      type: String,
      default: '12 x 8 x 6 inches'
    },
    weight: {
      type: String,
      default: '500g'
    },
    craftType: {
      type: String,
      default: 'Handmade Craft'
    },
    location: {
      type: String,
      default: 'Rajasthan, India'
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0
    },
    imageUrl: {
      type: String,
      required: [true, 'Product image is required']
    },
    enhancedImageUrl: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'draft'],
      default: 'active'
    },
    aiCatalogData: {
      generatedTitle: String,
      generatedDescription: String,
      englishDescription: String,
      hindiDescription: String,
      seoKeywords: [String],
      bulletPoints: [String],
      artisanStory: String,
      whatsappPitch: String
    },
    priceSuggestion: {
      minimumPrice: Number,
      recommendedPrice: Number,
      maximumPrice: Number,
      rawMaterialCost: Number,
      productionCost: Number,
      explanation: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
