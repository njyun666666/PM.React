import 'react-i18next';
import { resources } from '../i18n/config';

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['zh-Hant'];
  }
}
