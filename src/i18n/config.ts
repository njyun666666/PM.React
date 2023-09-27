import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import zh_Hant from './zh-Hant.json';

export const resources = {
  en: {
    translation: en,
  },
  'zh-Hant': {
    translation: zh_Hant,
  },
};

i18n.use(initReactI18next).init({
  resources: resources,
  lng:
    localStorage.getItem('lang') ||
    (navigator.language.toLowerCase().startsWith('zh') ? 'zh-Hant' : 'en'),
  fallbackLng: 'zh-Hant',
  interpolation: {
    escapeValue: false,
  },
});

// i18n.changeLanguage("zh-Hant");

document.documentElement.setAttribute('lang', i18n.language);
localStorage.setItem('lang', i18n.language);

i18n.on('languageChanged', (lng) => {
  document.documentElement.setAttribute('lang', lng);
  localStorage.setItem('lang', i18n.language);
});
