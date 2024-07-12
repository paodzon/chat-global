import  { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "hi"
  | "ja"
  | "la"
  | "ru"
  | "zh"
  | "ar"
  | "pt"
  | "it"
  | "ko"
  | "nl"
  | "tr"
  | "tl";

export const LanguagesSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  hi: "Hindi",
  ja: "Japanese",
  la: "Latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
  pt: "Portuguese",
  it: "Italian",
  ko: "Korean",
  nl: "Dutch",
  tr: "Turkish",
  tl: "Tagalog"
};

const LANGUAGES_IN_FREE = 2;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

interface SubscriptionState {
  subscription: Subscription | undefined | null,
  setSubscription: (subscription: Subscription | null) => void;
}

export const useLanguageStore = create<LanguageState>((set,get) => ({
  language: 'en',
  setLanguage: (language: LanguagesSupported) => set({language}),
  getLanguages: (isPro: boolean) => {
    if(isPro){
      return Object.keys(LanguagesSupportedMap) as LanguagesSupported[]
    }
    return Object.keys(LanguagesSupportedMap).slice(0,LANGUAGES_IN_FREE) as LanguagesSupported[]
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if(isPro) return [];
    
    return Object.keys(LanguagesSupportedMap).slice(LANGUAGES_IN_FREE) as LanguagesSupported[]
  }
}))

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({subscription}),
}));