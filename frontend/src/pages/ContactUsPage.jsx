import React, { useState } from 'react';
import {
  ArrowUpRight,
  Bot,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  Send,
  Sparkles,
  Trash2
} from 'lucide-react';

const WHATSAPP_CONFIG = {
  number: '',
  prefilledMessage: 'Hi KalaSetu, I need help with the platform.',
  note: 'WhatsApp support is being configured. Add the official business number and credentials in the backend environment before enabling live routing.',
  statusLabel: 'WhatsApp support is being configured.'
};

const quickQuestions = [
  'What is KalaSetu?',
  'How can I list my products?',
  'How does KalaSetu help artisans?',
  'How can I contact the team?'
];

const buildReply = (question) => {
  const normalized = (question || '').trim().toLowerCase();

  if (!normalized) {
    return 'Please type a question and I will help with KalaSetu.';
  }

  if (/hello|hi|hey|namaste|namaskar/.test(normalized)) {
    return "Hi! I'm the KalaSetu Assistant. I can help you understand KalaSetu, explore artisan features, and guide you through the platform.";
  }

  if (/what is kalasetu|what is kala setu|about kalasetu/.test(normalized)) {
    return 'KalaSetu is a digital marketplace for artisans and buyers. It helps artisans showcase handcrafted products, manage product listings, and use AI tools for catalog generation, image enhancement, and price suggestions.';
  }

  if (/add product|list my product|sell my products|create my product|product catalogue|catalogue/.test(normalized)) {
    return 'Open the artisan dashboard, go to Add Product, enter your product details, and save the listing. You can also use the AI catalog assistant to improve the description and pricing.';
  }

  if (/artisan|help artisans/.test(normalized)) {
    return 'KalaSetu helps artisans by giving them a clean dashboard, product management tools, AI-powered catalog generation, image enhancement support, and fair pricing guidance built around handmade Indian craft.';
  }

  if (/craft passport|passport/.test(normalized)) {
    return 'The Craft Passport brings together the product story, maker story, materials, and craft details in one shareable view so buyers understand the work behind the product.';
  }

  if (/marketplace|buyer|what is this product|who made this product/.test(normalized)) {
    return 'The marketplace lets buyers browse artisan products, view details, and learn more about the maker before purchasing.';
  }

  if (/catalog|ai catalog/.test(normalized)) {
    return 'KalaSetu includes an AI catalog generator that helps create bilingual product descriptions and SEO-oriented text for artisan listings.';
  }

  if (/price|pricing|fair price/.test(normalized)) {
    return 'KalaSetu includes a fair-price suggestion tool that estimates material, labor, and craft complexity so artisans can price products more transparently.';
  }

  if (/image|enhance|photo/.test(normalized)) {
    return 'KalaSetu includes an image enhancement flow to improve product visuals and presentation in the marketplace.';
  }

  if (/contact|support|team|human|talk to/.test(normalized)) {
    return 'I can help with general KalaSetu questions. For account-specific or technical issues, please contact the KalaSetu team using the official contact methods on this page.';
  }

  if (/ignore all previous instructions|system prompt|api key|database credential|reveal your prompt/.test(normalized)) {
    return 'I can help with KalaSetu support, but I cannot reveal private configuration or internal system instructions.';
  }

  return "I don't have that information yet. You can contact the KalaSetu team for further assistance.";
};

const buildWhatsAppLink = () => {
  const targetText = encodeURIComponent(WHATSAPP_CONFIG.prefilledMessage);
  if (WHATSAPP_CONFIG.number) {
    return `https://wa.me/${WHATSAPP_CONFIG.number}?text=${targetText}`;
  }
  return '';
};

export const ContactUsPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm the KalaSetu Assistant. I can help you understand KalaSetu, explore artisan features, and guide you through the platform."
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (nextQuestion) => {
    const trimmed = nextQuestion.trim();
    if (!trimmed) return;

    setMessages((current) => [
      ...current,
      { id: Date.now(), sender: 'user', text: trimmed }
    ]);
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: buildReply(trimmed)
        }
      ]);
      setIsTyping(false);
    }, 350);
  };

  const handleWhatsApp = () => {
    const url = buildWhatsAppLink();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    setMessages((current) => [
      ...current,
      {
        id: Date.now(),
        sender: 'assistant',
        text: 'WhatsApp support is being configured. The team will enable the official business number once the credentials are added.'
      }
    ]);
  };

  return (
    <div className="mx-auto w-full max-w-6xl pb-10">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <section className="overflow-hidden rounded-[28px] border border-terracotta-100 bg-white shadow-craft">
          <header className="border-b border-terracotta-100 bg-gradient-to-r from-terracotta-50 to-white px-4 py-4 sm:px-6">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta-600 text-white shadow-sm shadow-terracotta-300/50">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-terracotta-700">KALASETU ASSISTANT</p>
                  <p className="mt-1 text-sm text-gray-600">How can we help you?</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMessages([{ id: 1, sender: 'assistant', text: "Hi! I'm the KalaSetu Assistant. I can help you understand KalaSetu, explore artisan features, and guide you through the platform." }])}
                className="inline-flex items-center gap-2 rounded-full border border-terracotta-200 bg-white px-3 py-2 text-xs font-semibold text-terracotta-700 transition hover:border-terracotta-300 hover:bg-terracotta-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear
              </button>
            </div>
          </header>

          <div className="space-y-3 bg-khadi p-4 sm:p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                    message.sender === 'user'
                      ? 'rounded-br-md bg-terracotta-600 text-white'
                      : 'rounded-bl-md border border-terracotta-100 bg-white text-slate-700'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-terracotta-100 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
                  <Sparkles className="h-4 w-4 text-terracotta-600" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-terracotta-100 bg-white p-4 sm:p-5">
            <div className="mb-3 flex flex-wrap gap-2">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  onClick={() => sendMessage(question)}
                  className="rounded-full border border-terracotta-200 bg-terracotta-50 px-3 py-2 text-xs font-medium text-terracotta-700 transition hover:border-terracotta-300 hover:bg-terracotta-100"
                >
                  {question}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-terracotta-100 bg-khadi px-3 py-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder="Type your question..."
                className="w-full border-0 bg-transparent px-1 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
                aria-label="Type your question"
              />

              <button
                type="button"
                onClick={() => sendMessage(input)}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-terracotta-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-terracotta-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                disabled={!input.trim()}
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </section>

        <aside className="rounded-[28px] border border-terracotta-100 bg-white p-5 shadow-craft sm:p-6">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-terracotta-200 bg-terracotta-50 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.22em] text-terracotta-700">
            <MessageCircleMore className="h-3.5 w-3.5" />
            Need help?
          </div>

          <h2 className="font-serif text-3xl text-indigoClay-900">Need to talk to us directly?</h2>
          <p className="mt-3 text-sm leading-7 text-gray-600">
            Reach out to the KalaSetu team for additional support, partnership questions, or product guidance.
          </p>

          <button
            type="button"
            onClick={handleWhatsApp}
            disabled={!WHATSAPP_CONFIG.number}
            className={`mt-5 flex w-full items-center justify-center gap-3 rounded-2xl px-4 py-4 text-base font-bold shadow-sm transition ${WHATSAPP_CONFIG.number ? 'bg-[#25D366] text-white hover:bg-[#1da851]' : 'cursor-not-allowed border border-amber-200 bg-amber-50 text-amber-800'}`}
          >
            <MessageCircleMore className="h-5 w-5" />
            {WHATSAPP_CONFIG.number ? 'Chat with us on WhatsApp' : 'WhatsApp Assistant — Coming Soon'}
            {WHATSAPP_CONFIG.number && <ArrowUpRight className="h-4 w-4" />}
          </button>

          {!WHATSAPP_CONFIG.number && (
            <p className="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
              {WHATSAPP_CONFIG.note}
            </p>
          )}

          <div className="mt-6 space-y-3 border-t border-terracotta-100 pt-5">
            <div className="flex items-start gap-3 rounded-2xl bg-khadi p-3">
              <Mail className="mt-0.5 h-4 w-4 text-terracotta-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigoClay-900">Email</p>
                <a href="mailto:radha.devi@kalasetu.org" className="mt-1 block text-sm text-terracotta-700 hover:text-terracotta-800">radha.devi@kalasetu.org</a>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-khadi p-3">
              <Phone className="mt-0.5 h-4 w-4 text-terracotta-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigoClay-900">Phone</p>
                <a href="tel:+919829012345" className="mt-1 block text-sm text-terracotta-700 hover:text-terracotta-800">+91 98290 12345</a>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl bg-khadi p-3">
              <MapPin className="mt-0.5 h-4 w-4 text-terracotta-700" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigoClay-900">Location</p>
                <p className="mt-1 text-sm text-gray-700">Sanganer, Jaipur, Rajasthan</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
