import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { VoiceRecorder } from '../components/VoiceRecorder';
import confetti from 'canvas-confetti';
import {
  Wand2,
  Sparkles,
  Copy,
  Check,
  Languages,
  PlusCircle,
  MessageSquare,
  Search,
  BookOpen,
  Share2,
  HelpCircle
} from 'lucide-react';

export const AICatalogGenerator = ({ onApplyToProduct }) => {
  const { lang, t, speakText } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: 'Jaipur Blue Pottery Floral Bowl',
    description: 'Handmade clay bowl with cobalt blue glaze, Persian motifs, lead-free.',
    category: 'Pottery & Ceramics',
    material: 'Quartz powder, glass, natural gums & organic glazes',
    craftType: 'Traditional Jaipur Blue Pottery',
    location: user?.location || 'Jaipur, Rajasthan',
    artisanName: user?.name || 'Radha Devi'
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('en'); // 'en', 'hi', 'seo', 'story', 'whatsapp'
  const [copiedKey, setCopiedKey] = useState(null);

  const categories = [
    'Pottery & Ceramics',
    'Textiles & Handloom',
    'Woodwork & Carvings',
    'Paintings & Folk Art',
    'Metalcraft & Brass',
    'Jewelry & Beads',
    'Leather & Footwear',
    'Other Handicrafts'
  ];

  const handleVoiceTranscribed = (transcript) => {
    setFormData((prev) => ({
      ...prev,
      description: transcript
    }));
  };

  const handleGenerate = async (e) => {
    if (e) e.preventDefault();

    setLoading(true);
    try {
      const res = await api.ai.generateCatalog(formData);
      if (res.data?.success) {
        setResult(res.data.data);
        try {
          confetti({ particleCount: 50, spread: 60 });
        } catch (err) {}
        addToast(
          lang === 'hi'
            ? '✨ एआई कैटलॉग सफलतापूर्वक तैयार हो गया!'
            : '✨ AI Multilingual Catalog generated successfully!',
          'success'
        );
      } else {
        addToast(res.data?.message || 'Error generating catalog', 'error');
      }
    } catch (error) {
      console.error('Catalog Generation error:', error);
      addToast('Failed to connect to AI catalog service', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    addToast(t('copied'), 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleCreateProductWithCatalog = () => {
    if (!result) return;
    onApplyToProduct({
      name: result.generatedTitle,
      description: result.englishDescription,
      hindiDescription: result.hindiDescription,
      category: formData.category,
      material: formData.material,
      craftType: formData.craftType,
      location: formData.location,
      aiCatalogData: result
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-terracotta-700 via-terracotta-600 to-sandalwood-500 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Wand2 className="w-3.5 h-3.5 text-sandalwood-300" />
            <span>AI Multilingual Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold leading-tight">
            {t('createCatalog')}
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-terracotta-100 font-medium">
            {lang === 'hi'
              ? 'अपनी भाषा में बोलें या संक्षेप में लिखें। एआई कुछ ही सेकंड में आकर्षक शीर्षक, अंग्रेजी और हिन्दी विवरण, और सोशल मीडिया संदेश तैयार कर देगा।'
              : 'Speak in your regional language or enter raw craft notes. Our AI instantly writes professional product titles, SEO descriptions, and Hindi translations.'}
          </p>
        </div>
      </div>

      {/* Voice Input Interface */}
      <div className="space-y-2">
        <VoiceRecorder
          onTranscriptionComplete={handleVoiceTranscribed}
          initialPrompt={formData.description}
        />
      </div>

      {/* Input Parameters Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-200 shadow-craft space-y-6">
        <h3 className="font-bold text-base sm:text-lg text-indigoClay-900 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-terracotta-600" />
          <span>{lang === 'hi' ? 'हस्तशिल्प की जानकारी दर्ज करें' : 'Craft Information'}</span>
        </h3>

        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('productName')} / Draft Title
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Handmade Ceramic Bowl"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
                {t('category')}
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 bg-white font-medium"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              {t('material')}
            </label>
            <input
              type="text"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="e.g. Pure Clay, Botanical Glaze, Brass Wire"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-indigoClay-900 uppercase tracking-wider mb-1.5">
              Rough Notes / Spoken Details
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe what makes this craft special, motifs, colors, artisan touch..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-xs sm:text-sm text-indigoClay-900 focus:ring-2 focus:ring-terracotta-500 font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl bg-terracotta-600 hover:bg-terracotta-700 text-white font-bold text-sm sm:text-base shadow-lg transition flex items-center justify-center gap-2 transform active:scale-98 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{t('generatingCatalog')}</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5 text-sandalwood-300" />
                <span>{lang === 'hi' ? 'एआई कैटलॉग तैयार करें' : 'Generate AI Catalog'}</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Generated AI Results Studio */}
      {result && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-terracotta-200 shadow-xl space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
            <div>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
                ✨ AI Generated Output
              </span>
              <h2 className="text-xl font-serif font-extrabold text-indigoClay-900 mt-1">
                {result.generatedTitle}
              </h2>
            </div>

            <button
              onClick={handleCreateProductWithCatalog}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md transition flex items-center gap-1.5 flex-shrink-0"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{t('applyToProduct')}</span>
            </button>
          </div>

          {/* Navigation Tabs for Output */}
          <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-2">
            <button
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'en' ? 'bg-terracotta-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{t('englishVersion')}</span>
            </button>

            <button
              onClick={() => setActiveTab('hi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'hi' ? 'bg-terracotta-600 text-white font-devanagari' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 font-devanagari'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{t('hindiVersion')}</span>
            </button>

            <button
              onClick={() => setActiveTab('seo')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'seo' ? 'bg-terracotta-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              <span>{t('seoKeywords')}</span>
            </button>

            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'whatsapp' ? 'bg-terracotta-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{t('whatsappPitch')}</span>
            </button>

            <button
              onClick={() => setActiveTab('story')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === 'story' ? 'bg-terracotta-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('artisanStory')}</span>
            </button>
          </div>

          {/* Active Tab Content Display */}
          <div className="p-5 rounded-2xl bg-khadi border border-terracotta-100 relative">
            {/* Tab 1: English */}
            {activeTab === 'en' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-terracotta-700 uppercase">English Product Copy</span>
                  <button
                    onClick={() => handleCopy(result.englishDescription, 'en')}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200"
                  >
                    {copiedKey === 'en' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'en' ? t('copied') : t('copyToClipboard')}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                  {result.englishDescription}
                </p>
              </div>
            )}

            {/* Tab 2: Hindi */}
            {activeTab === 'hi' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-terracotta-700 uppercase font-devanagari">हिन्दी विवरण</span>
                  <button
                    onClick={() => handleCopy(result.hindiDescription, 'hi')}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200"
                  >
                    {copiedKey === 'hi' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'hi' ? t('copied') : t('copyToClipboard')}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 whitespace-pre-line leading-relaxed font-devanagari">
                  {result.hindiDescription}
                </p>
              </div>
            )}

            {/* Tab 3: SEO Keywords */}
            {activeTab === 'seo' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-terracotta-700 uppercase">Search Optimization Keywords</span>
                  <button
                    onClick={() => handleCopy(result.seoKeywords.join(', '), 'seo')}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200"
                  >
                    {copiedKey === 'seo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'seo' ? t('copied') : t('copyToClipboard')}</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {result.seoKeywords.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-white border border-sandalwood-300 text-xs font-medium text-indigoClay-900 shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: WhatsApp Pitch */}
            {activeTab === 'whatsapp' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    WhatsApp Direct Marketing Pitch
                  </span>
                  <button
                    onClick={() => handleCopy(result.whatsappPitch, 'wa')}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200"
                  >
                    {copiedKey === 'wa' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'wa' ? t('copied') : t('copyToClipboard')}</span>
                  </button>
                </div>
                <pre className="text-xs font-sans bg-white p-4 rounded-xl border border-gray-200 text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {result.whatsappPitch}
                </pre>
              </div>
            )}

            {/* Tab 5: Artisan Story */}
            {activeTab === 'story' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-terracotta-700 uppercase">Artisan Heritage Story</span>
                  <button
                    onClick={() => handleCopy(result.artisanStory, 'story')}
                    className="text-xs font-bold text-gray-600 hover:text-gray-900 flex items-center gap-1 bg-white px-3 py-1 rounded-lg border border-gray-200"
                  >
                    {copiedKey === 'story' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedKey === 'story' ? t('copied') : t('copyToClipboard')}</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed italic">
                  "{result.artisanStory}"
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
