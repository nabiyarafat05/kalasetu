export const buildPassportFromProduct = (product = {}) => {
  const passport = product.craftPassport || {};
  const aiData = product.aiCatalogData || {};
  const artisanName = product.artisanName || 'Artisan';
  const location = product.location || 'Information not available';
  const materialLabel = product.material || 'Information not available';
  const category = product.category || 'Information not available';
  const craftType = product.craftType || 'Handmade craft';

  const ensureArray = (value, fallback = []) => {
    if (Array.isArray(value) && value.length > 0) return value;
    if (typeof value === 'string' && value.trim()) return [value.trim()];
    return fallback;
  };

  const passportId = passport.passportId || `KS-CRAFT-${String(product.id || product._id || '000000').slice(-6).toUpperCase()}`;

  return {
    passportId,
    artisanStory: passport.artisanStory || aiData.artisanStory || `${artisanName} crafts pieces in ${location}. The story behind each item is rooted in the artisan's daily practice and the traditions of the craft.` ,
    craftStory: passport.craftStory || product.description || 'Craft story not provided yet.',
    origin: passport.origin || location,
    craftCategory: passport.craftCategory || category,
    materials: ensureArray(passport.materials, [materialLabel]),
    techniques: ensureArray(passport.techniques, [craftType]),
    process: ensureArray(passport.process, ['Material selection', 'Handcrafting', 'Finishing', 'Quality review']),
    careInstructions: ensureArray(passport.careInstructions, ['Handle with care', 'Clean gently', 'Information not available']),
    culturalContext: passport.culturalContext || 'Information not available',
    productSummary: passport.productSummary || aiData.generatedDescription || product.description || 'Product story not provided yet.',
    status: passport.status || 'draft',
    published: Boolean(passport.published),
    generatedByAi: Boolean(passport.generatedByAi || aiData.artisanStory),
    categoryNote: 'AI-assisted summary; final product story remains artisan-led.'
  };
};
