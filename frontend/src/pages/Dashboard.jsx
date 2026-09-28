import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight,
  Banknote,
  BellRing,
  CheckCircle2,
  FileText,
  GraduationCap,
  Landmark,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  WalletCards
} from 'lucide-react';

export const Dashboard = () => {
  const { lang } = useLanguage();

  const scholarships = [
    {
      title: 'Pre-Matric Scholarship for ST Students',
      status: 'Verified',
      amount: '₹12,000',
      tag: 'Student Support',
      accent: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      note: 'Tuition and maintenance support for school students',
      icon: GraduationCap
    },
    {
      title: 'Post-Matric Scholarship for ST',
      status: 'Pending Verification',
      amount: '₹25,000',
      tag: 'Application in progress',
      accent: 'bg-amber-50 text-amber-700 border-amber-200',
      note: 'Academic fee and hostel support for higher education',
      icon: WalletCards
    },
    {
      title: 'National Overseas Scholarship',
      status: 'Not Applied',
      amount: '₹10,00,000',
      tag: 'Career path',
      accent: 'bg-sky-50 text-sky-700 border-sky-200',
      note: 'Full funding for international higher studies',
      icon: Landmark
    }
  ];

  const quickStats = [
    { label: 'Eligibility Score', value: '92%', icon: TrendingUp },
    { label: 'Documents Verified', value: '4/5', icon: ShieldCheck },
    { label: 'Next Disbursement', value: 'Nov 2026', icon: Banknote }
  ];

  const checklist = [
    'ST certificate fetched from DigiLocker',
    'Income certificate status confirmed',
    'Aadhaar and bank linkage complete',
    'Academic record uploaded'
  ];

  return (
    <div className="min-w-0 max-w-full space-y-8 overflow-x-hidden animate-fadeIn">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-700 via-terracotta-600 to-sandalwood-500 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-5 top-4 text-white/10 pointer-events-none select-none flex items-center justify-center w-32 h-32">
          <img src="/kalasetu-logo.jpeg" alt="Kalyan Setu logo" className="w-full h-full object-contain opacity-30" />
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-200" />
            <span>{lang === 'hi' ? 'जनजातीय छात्र सहायता प्लेटफ़ॉर्म' : 'Tribal Student Support Platform'}</span>
          </div>

          <h1 className="mt-4 text-2xl font-extrabold font-serif tracking-tight text-white sm:text-4xl">
            {lang === 'hi' ? 'नमस्ते, ज्योति' : 'Welcome back, Jyoti'}
          </h1>

          <p className="mt-2 max-w-xl text-sm text-emerald-50 sm:text-base">
            {lang === 'hi'
              ? 'आपका Unified छात्र स्कॉलरशिप डैशबोर्ड तैयार है। DigiLocker प्रमाणपत्र, आवेदन स्थिति और दिशा-निर्देश एक ही जगह देखें।'
              : 'Your unified scholarship dashboard is ready. Track DigiLocker verification, application status, and next-step guidance in one place.'}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 font-semibold">📍 Bastar, Chhattisgarh</span>
            <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 font-semibold">🎓 B.Tech — 1st Year</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-terracotta-100 bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.14em] text-gray-500">{label}</span>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta-700">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-extrabold text-indigoClay-900">{value}</p>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-indigoClay-900">{lang === 'hi' ? 'स्कॉलरशिप योजनाएँ' : 'Scholarship Schemes'}</h2>
          <button className="inline-flex items-center gap-2 rounded-full bg-terracotta-600 px-3 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-terracotta-700">
            {lang === 'hi' ? 'सब्सिडी खोजें' : 'Explore schemes'}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {scholarships.map(({ title, status, amount, tag, accent, note, icon: Icon }) => (
            <div key={title} className="rounded-[28px] border border-terracotta-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-700">
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${accent}`}>
                  {status}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold text-indigoClay-900">{title}</h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">{tag}</p>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Amount</p>
                  <p className="text-2xl font-extrabold text-terracotta-700">{amount}</p>
                </div>
                <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">{lang === 'hi' ? 'लाभ योग्य' : 'Eligible'}</div>
              </div>

              <p className="mt-3 text-sm leading-6 text-gray-600">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-terracotta-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-indigoClay-900">{lang === 'hi' ? 'सत्यापन checklist' : 'Verification Checklist'}</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Ready
            </span>
          </div>

          <div className="mt-4 space-y-3">
            {checklist.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-emerald-50 px-3 py-3 text-sm text-emerald-900">
                <CheckCircle2 className="h-4 w-4 flex-none text-emerald-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-terracotta-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-indigoClay-900">{lang === 'hi' ? 'अगला कदम' : 'Next Step'}</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{lang === 'hi' ? 'सत्यापन लंबित' : 'Verification pending'}</p>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 rounded-2xl bg-white p-3 shadow-sm">
              <FileText className="mt-1 h-4 w-4 text-terracotta-600" />
              <div>
                <p className="text-sm font-bold text-indigoClay-900">{lang === 'hi' ? 'Post-Matric आवेदन को सत्यापित करें' : 'Verify the Post-Matric application'}</p>
                <p className="text-xs text-gray-500">{lang === 'hi' ? 'आवश्यक दस्तावेज़ और आय प्रमाणपत्र अभी अपलोड कीजिए।' : 'Upload required documents and proof of income to continue.'}</p>
              </div>
            </div>
            <button className="w-full rounded-2xl bg-indigoClay-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-indigoClay-800">
              {lang === 'hi' ? 'DigiLocker सत्यापन शुरू करें' : 'Start DigiLocker verification'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
