import { en } from './locales/en'
import { esCO } from './locales/es-CO'
import type { Locale, TranslationKey, TranslateFn } from './types'

export type { Locale, TranslationKey, TranslateFn }

export const LOCALES: Locale[] = ['en', 'es-CO']

export const localeLabels: Record<Locale, string> = {
  en: 'English',
  'es-CO': 'Español (CO)',
}

const dictionaries: Record<Locale, Record<TranslationKey, string>> = {
  en,
  'es-CO': esCO,
}

export function createTranslator(locale: Locale): TranslateFn {
  const dict = dictionaries[locale] ?? en
  return (key, params) => {
    let text = dict[key] ?? en[key] ?? key
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        text = text.replaceAll(`{${k}}`, String(v))
      }
    }
    return text
  }
}
