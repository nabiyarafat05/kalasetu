import React, { useMemo, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, SendHorizonal, Sparkles, Volume2, Bot, CheckCircle2 } from 'lucide-react';

export const JagoChatbot = () => {
  const { lang } = useLanguage();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: lang === 'hi'
        ? 'नमस्ते! मैं JAGO हूँ। मैं आपकी पात्रता, आवेदन स्थिति और आवश्यक दस्तावेज़ों के बारे में हिंदी या अंग्रेज़ी में मदद कर सकता हूँ।'
        : 'Hello! I am JAGO, your multilingual scholarship assistant. I can help with eligibility, application status, and required documents in Hindi or English.'
    }
  ]);

  const quickPrompts = useMemo(() => (lang === 'hi'
    ? [
        'मैं ST छात्र हूँ, क्या मैं आवेदन कर सकता हूँ?',
        ' मेरे आवेदन की स्थिति क्या है?',
        'कौन-कौन से दस्तावेज़ चाहिए?' 
      ]
    : [
        'Am I eligible for the ST scholarship?',
        'What is the status of my application?',
        'What documents are required?' 
      ]), [lang]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newUserMessage = { sender: 'user', text: input.trim() };
    const replyText = lang === 'hi'
      ? 'आपका आवेदन वर्तमान में सत्यापन के चरण में है। ST प्रमाणपत्र और आय प्रमाणपत्र की सत्यापन रिपोर्ट जमा हो चुकी है। अगर आप चाहें, तो मैं आपको अगले चरणों के लिए मार्गदर्शन कर सकता हूँ।'
      : 'Your application is currently in the verification stage. Your ST certificate and income proof have already been reviewed. I can guide you through the next steps if you want.';

    setMessages((prev) => [...prev, newUserMessage, { sender: 'bot', text: replyText }]);
    setInput('');
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-8 animate-fadeIn">
      <section className="rounded-[32px] border border-terracotta-100 bg-white shadow-craft">
        <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:px-10 lg:py-12">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-sandalwood-200 bg-sandalwood-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-sandalwood-700">
              <Bot className="h-3.5 w-3.5" />
              JAGO Multilingual Assistant
            </span>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl leading-tight text-indigoClay-900 sm:text-5xl">
                {lang === 'hi' ? 'आपकी स्कॉलरशिप सहायता, आवाज़ और टेक्स्ट में.' : 'Scholarship support in voice and text.'}
              </h1>
              <p className="max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
                {lang === 'hi'
                  ? 'JAGO छात्र सहायता के लिए डिज़ाइन किया गया है—पात्रता, आवेदन स्थिति, सत्यापन, और आवश्यकताओं की जानकारी तुरंत उपलब्ध कराता है।'
                  : 'JAGO is designed to help students check eligibility, monitor application flow, and understand scholarship requirements in real time.'}
              </p>
            </div>

            <div className="space-y-3 rounded-[28px] bg-gradient-to-br from-sandalwood-50 via-white to-terracotta-50 p-4 ring-1 ring-sandalwood-100">
              {['Eligibility checks', 'Application status updates', 'Document requirement guidance'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/80 p-3 text-sm text-gray-700 shadow-sm">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-terracotta-100 bg-gray-50 p-4 shadow-inner">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-600 text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-bold text-indigoClay-900">JAGO</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500">AI assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                <Sparkles className="h-3 w-3" />
                Online
              </div>
            </div>

            <div className="space-y-3 rounded-2xl bg-white p-3 shadow-sm">
              {messages.map((message, idx) => (
                <div key={`${message.sender}-${idx}`} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-6 ${message.sender === 'user' ? 'bg-terracotta-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button key={prompt} type="button" onClick={() => setInput(prompt)} className="rounded-full border border-terracotta-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-indigoClay-800 transition hover:border-terracotta-400">
                  {prompt}
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={lang === 'hi' ? 'अपना सवाल लिखें या बोलें...' : 'Type or speak your question...'}
                className="flex-1 border-0 bg-transparent px-2 py-2 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 transition hover:bg-amber-200">
                <Mic className="h-4 w-4" />
              </button>
              <button type="button" onClick={handleSend} className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta-600 text-white transition hover:bg-terracotta-700">
                <SendHorizonal className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.12em] text-gray-500">
              <Volume2 className="h-3.5 w-3.5" />
              {lang === 'hi' ? 'ध्वनि सहायता उपलब्ध' : 'Voice support available'}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
