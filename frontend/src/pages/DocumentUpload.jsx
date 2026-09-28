import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  FileText,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';

export const DocumentUpload = () => {
  const { lang } = useLanguage();

  const records = [
    { name: 'ST Certificate', source: 'DigiLocker', status: 'Verified', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'PVTG Status', source: 'DigiLocker', status: 'Verified', tone: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { name: 'Income Certificate', source: 'DigiLocker', status: 'Pending Review', tone: 'bg-amber-50 text-amber-700 border-amber-200' },
    { name: 'Aadhaar / Bank Link', source: 'eKYC', status: 'Ready', tone: 'bg-sky-50 text-sky-700 border-sky-200' }
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-8 animate-fadeIn">
      <section className="overflow-hidden rounded-[32px] border border-terracotta-100 bg-white shadow-craft">
        <div className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-12">
          <div className="space-y-5">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              DigiLocker Verification
            </span>

            <div className="space-y-3">
              <h1 className="font-serif text-4xl leading-tight text-indigoClay-900 sm:text-5xl">
                {lang === 'hi' ? 'DigiLocker से प्रमाणपत्र सत्यापन' : 'Secure certificate verification with DigiLocker'}
              </h1>
              <p className="max-w-2xl text-base leading-7 text-gray-600 sm:text-lg">
                {lang === 'hi'
                  ? 'ST/PVTG जाति प्रमाणपत्र, आय प्रमाणपत्र और आधार-संबंधित दस्तावेज़ को सहजता से सत्यापित करें और हर छात्र के लिए स्कॉलरशिप पात्रता को तेज़ी से पूरा करें।'
                  : 'Fetch ST/PVTG caste certificates, income records, and linked identity proof seamlessly to accelerate scholarship eligibility screening for every eligible student.'}
              </p>
            </div>
          </div>

          <div className="rounded-[28px] bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-5 ring-1 ring-emerald-100">
            <div className="flex h-full flex-col justify-center gap-4">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">{lang === 'hi' ? 'कुल स्थिति' : 'Current status'}</p>
                  <BadgeCheck className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-indigoClay-900">84%</span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">Verified</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{lang === 'hi' ? 'आधार, वर्ग, और आय रिकॉर्ड सत्यापन पूर्ण हो चुका है।' : 'Identity, caste, and income records are currently validated.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {records.map(({ name, source, status, tone }) => (
          <div key={name} className="rounded-[26px] border border-terracotta-100 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-700">
                <FileCheck2 className="h-5 w-5" />
              </div>
              <span className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] ${tone}`}>
                {status}
              </span>
            </div>
            <h3 className="mt-4 text-base font-bold text-indigoClay-900">{name}</h3>
            <p className="mt-1 text-sm text-gray-500">Source: {source}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-terracotta-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-700">
              <UploadCloud className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-indigoClay-900">{lang === 'hi' ? 'दस्तावेज़ अपलोड करें' : 'Upload supporting documents'}</h2>
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{lang === 'hi' ? 'सुरक्षित रूप से' : 'Safely stored'}</p>
            </div>
          </div>

          <div className="mt-5 rounded-3xl border-2 border-dashed border-emerald-200 bg-emerald-50 p-6 text-center">
            <FileText className="mx-auto h-10 w-10 text-emerald-600" />
            <p className="mt-3 text-sm font-semibold text-indigoClay-900">
              {lang === 'hi' ? 'ST/PVTG और आय प्रमाणपत्र यहाँ अपलोड करें' : 'Upload ST/PVTG and income certificates here'}
            </p>
            <p className="mt-1 text-xs text-gray-500">PDF, JPG, PNG supported</p>
            <button className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700">
              {lang === 'hi' ? 'फ़ाइल चुनें' : 'Choose file'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="rounded-[28px] border border-terracotta-100 bg-gradient-to-br from-sky-50 to-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-indigoClay-900">{lang === 'hi' ? 'सत्यापन परिणाम' : 'Verification outcome'}</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{lang === 'hi' ? 'जाति प्रमाणपत्र' : 'Caste certificate'}</p>
              <p className="mt-1 text-sm font-bold text-emerald-700">{lang === 'hi' ? 'सत्यापित' : 'Verified'}</p>
            </div>
            <div className="rounded-2xl bg-white p-3 shadow-sm">
              <p className="text-xs uppercase tracking-[0.14em] text-gray-500">{lang === 'hi' ? 'आय प्रमाणपत्र' : 'Income certificate'}</p>
              <p className="mt-1 text-sm font-bold text-amber-700">{lang === 'hi' ? 'समीक्षा लंबित' : 'Under review'}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
