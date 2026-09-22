const MAX_MESSAGE_LENGTH = 2000;

const createAssistantContext = () => ({ history: [] });

const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  return input.trim().slice(0, MAX_MESSAGE_LENGTH);
};

const detectLanguage = (text) => {
  if (!text) return 'en';
  if (/[\u0900-\u097F]/.test(text)) return 'hi';
  if (/\b(hi|namaste|namaskar|kya|kaise|hai|hoga|mujhe|main)\b/i.test(text)) return 'hi';
  return 'en';
};

const classifyIntent = (text) => {
  const normalized = sanitizeInput(text).toLowerCase();
  if (!normalized) return 'UNKNOWN';
  if (/(^|\s)(hello|hi|hey|namaste|namaskar)(\s|$)/.test(normalized)) return 'GREETING';
  if (/craft passport|passport/.test(normalized)) return 'CRAFT_PASSPORT';
  if (/add product|list my product|create my product|product catalogue|catalogue|catalog/.test(normalized)) return 'ARTISAN_HELP';
  if (/buyer|what is this product|who made this product|how can i contact the artisan|what craft is this/.test(normalized)) return 'BUYER_HELP';
  if (/marketplace|buy|sell|product search/.test(normalized)) return 'MARKETPLACE';
  if (/contact|support|human|team|talk to/.test(normalized)) return 'CONTACT_SUPPORT';
  if (/problem|error|not working|bug|technical|issue|failed|cannot/.test(normalized)) return 'TECHNICAL_PROBLEM';
  if (/what is kalasetu|how does kalasetu work|about kalasetu|how do i use/.test(normalized)) return 'GENERAL_INFORMATION';
  if (/ignore all previous instructions|system prompt|api key|database credential|internal instruction|reveal your prompt/.test(normalized)) return 'SECURITY';
  return 'UNKNOWN';
};

const buildFollowUpResponse = (normalized, context) => {
  const history = Array.isArray(context?.history) ? context.history : [];
  const hasAddProductContext = history.some((item) => /add product|list my product|create my product|product catalogue/i.test(item || ''));
  const hasCraftPassportContext = history.some((item) => /craft passport/i.test(item || ''));

  if (hasAddProductContext && /(what information do i need|what info do i need|information do i need|what do i need)/.test(normalized)) {
    return 'For a product listing, you usually need a product name, category, material, location, price, a short description, and a clear image. The artisan dashboard also helps you generate product copy and pricing guidance.';
  }

  if (hasCraftPassportContext && /(how do i create|create.*passport|what is passport)/.test(normalized)) {
    return 'Open your product, create or review the Craft Passport, add your story and material details, then review the AI-assisted information before publishing.';
  }

  return null;
};

const getKnowledgeResponse = (normalized, context) => {
  const followUp = buildFollowUpResponse(normalized, context);
  if (followUp) return { text: followUp, intent: classifyIntent(normalized), language: detectLanguage(normalized) };

  if (!normalized.trim()) {
    return { text: 'Please type a question and I will help with KalaSetu.', intent: 'UNKNOWN', language: 'en' };
  }

  if (/(^|\s)(hello|hi|hey|namaste|namaskar)(\s|$)/.test(normalized)) {
    return { text: "Hi! I'm the KalaSetu Assistant. I can help you understand KalaSetu, explore artisan features, and guide you through the platform.", intent: 'GREETING', language: detectLanguage(normalized) };
  }

  if (/what is kalasetu|what is kala setu|about kalasetu/.test(normalized)) {
    return { text: 'KalaSetu is a digital marketplace for artisans and buyers. It helps artisans showcase handcrafted products, manage listings, and use AI tools for catalog generation, image enhancement, and fair pricing guidance.', intent: 'GENERAL_INFORMATION', language: detectLanguage(normalized) };
  }

  if (/how does kalasetu work|how does it work|how to use/.test(normalized)) {
    return { text: 'KalaSetu combines an artisan dashboard, product management, marketplace browsing, AI catalog creation, pricing suggestions, and buyer discovery in one platform.', intent: 'GENERAL_INFORMATION', language: detectLanguage(normalized) };
  }

  if (/add product|list my products|sell my products|create my product|how do i add a product/.test(normalized)) {
    return { text: 'Open the artisan dashboard, go to Add Product, enter your product details, then save the listing. You can also use the AI catalog assistant to improve the description and pricing.', intent: 'ARTISAN_HELP', language: detectLanguage(normalized) };
  }

  if (/catalog|catalogue|ai catalog|create.*catalog/.test(normalized)) {
    return { text: 'KalaSetu includes an AI catalog generator for bilingual product copy, SEO keywords, and a stronger product story for artisan listings.', intent: 'ARTISAN_HELP', language: detectLanguage(normalized) };
  }

  if (/craft passport|passport/.test(normalized)) {
    return { text: 'The Craft Passport brings together the product story, the maker story, craft origin, materials, process, and care details in one easy-to-share view. It helps buyers understand what they are purchasing and supports transparency.', intent: 'CRAFT_PASSPORT', language: detectLanguage(normalized) };
  }

  if (/what is this product|who made this product|what craft is this|what kind of craft/.test(normalized)) {
    return { text: 'Each product page shows the product name, material, origin, craft type, and artisan information so buyers can understand the item and the maker behind it.', intent: 'BUYER_HELP', language: detectLanguage(normalized) };
  }

  if (/how can i contact the artisan|contact the artisan|artisan profile/.test(normalized)) {
    return { text: 'You can open the product details or artisan profile, then use the relevant contact or inquiry option to reach the maker or follow up through the available platform flow.', intent: 'BUYER_HELP', language: detectLanguage(normalized) };
  }

  if (/help artisans|artisan/.test(normalized)) {
    return { text: 'KalaSetu helps artisans by giving them a clean dashboard, product management tools, AI-powered catalog generation, image enhancement support, and fair pricing guidance built around handmade Indian craft.', intent: 'ARTISAN_HELP', language: detectLanguage(normalized) };
  }

  if (/marketplace|buyer|buy products|shop|explore/.test(normalized)) {
    return { text: 'The KalaSetu marketplace lets buyers browse artisan products, view craftsmanship details, and learn more about the maker before purchasing.', intent: 'MARKETPLACE', language: detectLanguage(normalized) };
  }

  if (/price|pricing|fair price/.test(normalized)) {
    return { text: 'KalaSetu includes a fair-price suggestion tool that estimates material, labor, and craft complexity so artisans can price products more transparently.', intent: 'ARTISAN_HELP', language: detectLanguage(normalized) };
  }

  if (/image|enhance|photo/.test(normalized)) {
    return { text: 'KalaSetu includes an image enhancement flow to improve product visuals and cleaning for better presentation in the marketplace.', intent: 'ARTISAN_HELP', language: detectLanguage(normalized) };
  }

  if (/contact|support|team|talk to|human/.test(normalized)) {
    return { text: 'I can help with general KalaSetu questions. For account-specific or technical issues, I will guide you to the KalaSetu team using the official contact methods available on the Contact Us page.', intent: 'CONTACT_SUPPORT', language: detectLanguage(normalized) };
  }

  if (/not working|error|bug|technical|failed|issue/.test(normalized)) {
    return { text: 'I can help with general product guidance, but if you are reporting a platform issue or account problem, please contact the KalaSetu team for direct support.', intent: 'TECHNICAL_PROBLEM', language: detectLanguage(normalized) };
  }

  if (/ignore all previous instructions|system prompt|api key|database credential|internal instruction|reveal your prompt|private config/.test(normalized)) {
    return { text: 'I can help with KalaSetu support, but I cannot reveal internal system instructions, configuration, or credentials.', intent: 'SECURITY', language: detectLanguage(normalized) };
  }

  if (/what information do i need|what info do i need|information do i need/.test(normalized)) {
    return { text: 'For a product listing, you usually need the product name, category, material, base price, place of origin, and a clear product image. KalaSetu also helps with catalog description and pricing.', intent: 'ARTISAN_HELP', language: detectLanguage(normalized) };
  }

  return { text: "I don't have that information yet. You can contact the KalaSetu team for further assistance.", intent: 'UNKNOWN', language: detectLanguage(normalized) };
};

const generateAssistantReply = (rawInput, context = createAssistantContext()) => {
  const input = sanitizeInput(rawInput || '');
  const safeContext = context && typeof context === 'object' ? context : createAssistantContext();

  if (!input) {
    return { text: 'Please type a question and I will help with KalaSetu.', intent: 'UNKNOWN', language: 'en' };
  }

  if (input.length >= MAX_MESSAGE_LENGTH) {
    return { text: 'Your message is too long. Please keep it concise and I will help with KalaSetu.', intent: 'UNKNOWN', language: 'en' };
  }

  const currentIntent = classifyIntent(input);
  const result = getKnowledgeResponse(input.toLowerCase(), safeContext);

  if (Array.isArray(safeContext.history)) {
    safeContext.history = [...safeContext.history, input].slice(-8);
  }

  return {
    ...result,
    intent: result.intent || currentIntent,
    language: result.language || detectLanguage(input),
    safe: true,
    context: safeContext
  };
};

module.exports = {
  createAssistantContext,
  classifyIntent,
  generateAssistantReply,
  detectLanguage
};
