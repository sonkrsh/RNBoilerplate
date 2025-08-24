import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en.json';
import hi from './locales/hi.json';

const resources = {
  en: { translation: en },
  hi: { translation: hi },
};

const fallback = { languageTag: 'en', isRTL: false };
const { languageTag } =
  RNLocalize.findBestLanguageTag(Object.keys(resources)) || fallback;

i18n.use(initReactI18next).init({
  resources,
  lng: languageTag,
  fallbackLng: 'en',
  compatibilityJSON: 'v4',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
