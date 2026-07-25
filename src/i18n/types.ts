export type Locale = 'en' | 'es-CO'

export type TranslationKey = keyof typeof import('./locales/en').en

export type TranslateFn = (
  key: TranslationKey,
  params?: Record<string, string | number>,
) => string
