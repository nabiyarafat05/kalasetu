const mongoose = require('mongoose');

const CatalogSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: false
    },
    generatedTitle: {
      type: String,
      required: true
    },
    generatedDescription: {
      type: String,
      required: true
    },
    englishDescription: {
      type: String,
      required: true
    },
    hindiDescription: {
      type: String,
      required: true
    },
    seoKeywords: [{
      type: String
    }],
    bulletPoints: [{
      type: String
    }],
    artisanStory: {
      type: String
    },
    whatsappPitch: {
      type: String
    },
    inputCraftData: {
      name: String,
      notes: String,
      category: String,
      material: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Catalog', CatalogSchema);
