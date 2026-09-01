const mongoose = require('mongoose');

const PriceSuggestionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false
    },
    category: {
      type: String,
      required: true
    },
    material: {
      type: String,
      required: true
    },
    rawMaterialCost: {
      type: Number,
      required: true
    },
    productionCost: {
      type: Number,
      required: true
    },
    laborHours: {
      type: Number,
      default: 8
    },
    craftComplexity: {
      type: String,
      enum: ['standard', 'intricate', 'masterpiece'],
      default: 'intricate'
    },
    minimumPrice: {
      type: Number,
      required: true
    },
    recommendedPrice: {
      type: Number,
      required: true
    },
    maximumPrice: {
      type: Number,
      required: true
    },
    breakdown: {
      rawMaterial: Number,
      fairLaborWage: Number,
      packagingDelivery: Number,
      platformFee: Number,
      artisanNetProfit: Number,
      profitMarginPercent: Number
    },
    explanation: {
      type: String,
      required: true
    },
    hindiExplanation: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('PriceSuggestion', PriceSuggestionSchema);
