import i18n from "i18next";

import { initReactI18next } from "react-i18next"
// import Backend from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
 
// import { NativeModules, Platform } from 'react-native';
import en from './src/translations/en/translation.json';
import fr from './src/translations/fr/translation.json'


const resources = {

  en: {
    translation: en
  },
  fr: {
    translation: fr
  }
};
// const resources = {
//   en: {
//     translation: {
//       "Welcome to React": "Welcome to React and react-i18next"
//     }
//   },
//   fr: {
//     translation: {
//       "Welcome to React": "Bienvenue à React et react-i18next"
//     }
//   }
// };
// const locale =
//   Platform.OS === 'ios'
//     ? NativeModules.SettingsManager.settings.AppleLocale
//     : NativeModules.I18nManager.localeIdentifier;
// console.log("i18next:", locale.substring(0, 2));
// i18n.locale = locale

i18n
  // .use(LanguageDetector)
  // .use(Backend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    compatibilityJSON: 'v3',
    resources,
    lng:'en',
    // lng: locale.substring(0, 2),
    fallbackLng: "en", // use en if detected lng is not available

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    },
    // backend: {
    //   loadPath: '/src/translations/{{lng}}/translation.json',
    // },
    // detection: {
    //   order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
    //   caches: ['cookie'],
    // },
    react: {
      useSuspense: false
    }

  })
  .then(() => {
    // this called after the init finished
    i18n.services.pluralResolver.addRule('pl', {
      numbers: [1, 2, 3],
      plurals: function (n) {
        return Number(
          n === 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
        );
      },
    });
  });
  

export default i18n;