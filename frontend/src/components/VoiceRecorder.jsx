import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mic, MicOff, Volume2, Sparkles, Check } from 'lucide-react';

export const VoiceRecorder = ({ onTranscriptionComplete, initialPrompt = '' }) => {
  const { lang, t } = useLanguage();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
        if (onTranscriptionComplete) {
          onTranscriptionComplete(currentTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error/blocked:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      setIsSupported(false);
    }
  }, [lang, onTranscriptionComplete]);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Restart recognition
          recognitionRef.current.stop();
          setTimeout(() => recognitionRef.current?.start(), 100);
        }
      } else {
        // Fallback simulation for browsers without Web Speech
        simulateVoiceInput();
      }
    }
  };

  const simulateVoiceInput = () => {
    setIsListening(true);
    const sampleSpokenNotes = lang === 'hi' 
      ? 'यह हस्तनिर्मित मिट्टी का पारंपरिक फूलदान है। इसमें प्राकृतिक रंगों से मोर और कमल के फूल बनाए गए हैं। आकार 10 इंच है।'
      : 'This is a hand-carved traditional wooden jewellery box made of Sheesham wood with brass inlay work and velvet lining.';
    
    let i = 0;
    const interval = setInterval(() => {
      if (i <= sampleSpokenNotes.length) {
        const textChunk = sampleSpokenNotes.slice(0, i);
        setTranscript(textChunk);
        if (onTranscriptionComplete) onTranscriptionComplete(textChunk);
        i += 4;
      } else {
        clearInterval(interval);
        setIsListening(false);
      }
    }, 40);
  };

  return (
    <div className="bg-gradient-to-r from-sandalwood-50 via-terracotta-50 to-khadi p-4 sm:p-5 rounded-2xl border border-terracotta-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left explanation */}
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse ring-4 ring-red-200 shadow-lg' 
              : 'bg-terracotta-600 text-white shadow-md'
          }`}>
            {isListening ? <Mic className="w-6 h-6 animate-bounce" /> : <Mic className="w-6 h-6" />}
          </div>
          <div>
            <h4 className="font-bold text-sm sm:text-base text-indigoClay-900 flex items-center gap-1.5">
              {t('voiceInput')}
              <span className="bg-sandalwood-100 text-sandalwood-800 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">
                {lang === 'hi' ? 'हिन्दी वॉयस' : 'Voice-to-Text'}
              </span>
            </h4>
            <p className="text-xs text-gray-600 mt-0.5">
              {isListening ? t('listening') : t('voiceHint')}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleListening}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition transform active:scale-95 shadow-sm ${
              isListening
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-terracotta-600 hover:bg-terracotta-700 text-white'
            }`}
          >
            {isListening ? (
              <>
                <MicOff className="w-4 h-4" />
                <span>Stop Recording</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>{lang === 'hi' ? 'बोलना शुरू करें' : 'Start Speaking'}</span>
              </>
            )}
          </button>

          {/* Quick Demo Sample Voice filler */}
          <button
            type="button"
            onClick={simulateVoiceInput}
            title="Auto-fill sample voice notes for quick demo"
            className="p-2.5 rounded-xl bg-white border border-sandalwood-200 text-sandalwood-700 hover:bg-sandalwood-50 text-xs font-semibold flex items-center gap-1"
          >
            <Sparkles className="w-4 h-4 text-sandalwood-500" />
            <span className="hidden sm:inline">Sample Voice</span>
          </button>
        </div>
      </div>

      {/* Spoken Transcript preview box */}
      {transcript && (
        <div className="mt-3 p-3 bg-white rounded-xl border border-sandalwood-200 text-xs text-indigoClay-900 flex items-start gap-2 shadow-xs">
          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-gray-500 mr-1">Transcribed:</span>
            <span className="italic font-medium">"{transcript}"</span>
          </div>
        </div>
      )}
    </div>
  );
};
