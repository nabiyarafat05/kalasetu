import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowRight, BadgeCheck, HeartHandshake, Lightbulb, MapPinned, Sparkles } from 'lucide-react';

export const AboutUsPage = () => {
  const { lang } = useLanguage();
  const isHindi = lang === 'hi';
  const pillars = [
    {
      title: isHindi ? 'हमारा मिशन' : 'Our Mission',
      description: isHindi
        ? 'कला सेतु हाशिए पर मौजूद कारीगरों को अपनी कला डिजिटल रूप से प्रस्तुत करने, व्यापक खरीदारों तक पहुँचने और उन्नत तकनीकी विशेषज्ञता की आवश्यकता के बिना टिकाऊ आजीविका बनाने में मदद करता है।'
        : 'KalaSetu helps marginalized artisans present their craftsmanship digitally, reach wider buyers, and build sustainable livelihoods without needing advanced technical expertise.',
      icon: HeartHandshake
    },
    {
      title: isHindi ? 'हमारी समस्या का समाधान' : 'The Problem We Address',
      description: isHindi
        ? 'कई कारीगर समुदाय खंडित डिजिटल पहुँच, कमजोर उत्पाद प्रस्तुति, भाषा की बाधाओं और बिचौलियों से अनुचित मूल्य निर्धारण से जूझते हैं। कला सेतु उन्हें ऑनलाइन दृश्यता और निष्पक्ष खोज का एक स्पष्ट मार्ग प्रदान करता है।'
        : 'Many artisan communities struggle with fragmented digital access, weak product presentation, language barriers, and unfair pricing from middlemen. KalaSetu gives them a clear path to online visibility and fairer discovery.',
      icon: MapPinned
    },
    {
      title: isHindi ? 'हमारा दृष्टिकोण' : 'Our Approach',
      description: isHindi
        ? 'यह मंच एक गर्मजोशी से भरे, कारीगर-अनुकूल हाट बाजार को एआई-सहायता प्राप्त कैटलॉग निर्माण, छवि संवर्द्धन और निष्पक्ष व्यापार सिद्धांतों पर आधारित पारदर्शी मूल्य मार्गदर्शन के साथ जोड़ता है।'
        : 'The platform combines a warm, artisan-friendly marketplace with AI-assisted catalog creation, image enhancement, and transparent price guidance rooted in fair-trade principles.',
      icon: Sparkles
    }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8">
      <section className="overflow-hidden rounded-[32px] border border-terracotta-100 bg-white shadow-craft">
        <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-12">
          <div className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-terracotta-200 bg-terracotta-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-terracotta-700">
              KALASETU
            </span>
            <div className="space-y-3">
              <h1 className="font-serif text-4xl leading-tight text-indigoClay-900 sm:text-5xl">
                {isHindi ? 'पारंपरिक कारीगरी को डिजिटल अवसरों से जोड़ना' : 'Bridging Traditional Craftsmanship with Digital Opportunity'}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                {isHindi ? 'कला सेतु कारीगरों को अपनी कला डिजिटल रूप से प्रस्तुत करने और व्यापक बाजार से जुड़ने में मदद करता है, साथ ही सांस्कृतिक विरासत और उचित मूल्य को बनाए रखता है।' : 'KalaSetu is designed to help marginalized artisans digitally present their craftsmanship and connect with wider market opportunities while preserving cultural heritage and fair value.'}
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-terracotta-50 via-white to-sandalwood-50 p-5 ring-1 ring-terracotta-100">
            <div className="flex h-full flex-col justify-center gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-terracotta-600">{isHindi ? 'यह किन चीजों में सहायता करता है' : 'What it supports'}</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> {isHindi ? 'उत्पाद की कहानी और कैटलॉग निर्माण' : 'Product storytelling and catalog generation'}</li>
                  <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> {isHindi ? 'बेहतर उत्पाद फोटोग्राफी और प्रस्तुति' : 'Better product photography and presentation'}</li>
                  <li className="flex items-start gap-2"><BadgeCheck className="mt-0.5 h-4 w-4 text-emerald-600" /> {isHindi ? 'पारदर्शी मूल्य निर्धारण और निष्पक्ष खोज' : 'Transparent pricing and fairer discovery'}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        {pillars.map(({ title, description, icon: Icon }) => (
          <article key={title} className="rounded-[28px] border border-terracotta-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-700">
              <Icon className="h-5 w-5" />
            </div>
            <h2 className="mb-3 text-xl font-bold text-indigoClay-900">{title}</h2>
            <p className="text-sm leading-7 text-gray-600">{description}</p>
          </article>
        ))}
      </section>

      <section className="rounded-[32px] border border-terracotta-100 bg-white p-5 shadow-craft sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sandalwood-100 text-sandalwood-700">
            <Lightbulb className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold text-indigoClay-900">{isHindi ? 'हमारी सेवा किसके लिए है' : 'Who We Serve'}</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-khadi p-5">
            <h3 className="text-lg font-bold text-indigoClay-900">{isHindi ? 'कारीगर और निर्माता' : 'Artisans and makers'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {isHindi
                ? 'कला सेतु ऐसे शिल्प समुदायों के लिए बनाया गया है जिन्हें कैटलॉग लेखन, उच्च गुणवत्ता वाली दृश्य प्रस्तुति, मूल्य स्पष्टता और डिजिटल स्टोरफ्रंट readiness में सहायता की आवश्यकता है।'
                : 'KalaSetu is built for craft communities that need support in catalog writing, high-quality visual presentation, pricing clarity, and digital storefront readiness.'}
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-khadi p-5">
            <h3 className="text-lg font-bold text-indigoClay-900">{isHindi ? 'खरीदार और जागरूक ग्राहक' : 'Buyers and conscious shoppers'}</h3>
            <p className="mt-3 text-sm leading-7 text-gray-600">
              {isHindi
                ? 'खरीदार प्रामाणिक हस्तशिल्प कार्य खोज सकते हैं, प्रत्येक उत्पाद के पीछे की निर्माता की कहानी को समझ सकते हैं, और अधिक स्पष्ट तथा भरोसेमंद बाजार अनुभव के माध्यम से कारीगरों से जुड़ सकते हैं।'
                : 'Buyers can discover authentic handcrafted work, understand the maker story behind each product, and connect with artisans through a clearer and more trustworthy marketplace experience.'}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[32px] border border-terracotta-100 bg-gradient-to-br from-indigoClay-900 to-indigoClay-800 p-5 text-white shadow-craft sm:p-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-sandalwood-200">
            <ArrowRight className="h-5 w-5" />
          </div>
          <h2 className="text-2xl font-bold">{isHindi ? 'कला सेतु क्यों' : 'Why KalaSetu'}</h2>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-200 sm:text-base">
          {isHindi
            ? 'क्योंकि पारंपरिक शिल्पों को डिजिटल अर्थव्यवस्था में दृश्यता, सम्मान और फलने-फूलने का अवसर मिलना चाहिए। कला सेतु व्यावहारिक डिजिटल उपकरणों को कारीगर-प्रथम अनुभव के साथ जोड़ता है ताकि शिल्प कौशल को ईमानदारी से प्रस्तुत किया जा सके, उचित मूल्य दिया जा सके और अधिक व्यापक रूप से खोजा जा सके।'
            : 'Because heritage crafts deserve visibility, respect, and an opportunity to thrive in a digital economy. KalaSetu combines practical digital tools with an artisan-first experience so craftsmanship can be presented honestly, valued fairly, and discovered more widely.'}
        </p>
      </section>
    </div>
  );
};