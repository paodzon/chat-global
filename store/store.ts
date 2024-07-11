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

interface SubscriptionState {
  subscription: Subscription | undefined | null,
  setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({subscription}),
}));