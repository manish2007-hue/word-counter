import { ui, defaultLang, showDefaultLang, languages, type SupportedLang } from './ui';

/**
 * Extracts language code from URL pathname (e.g. /es/about -> 'es')
 */
export function getLangFromUrl(url: URL): SupportedLang {
  const segments = url.pathname.split('/').filter(Boolean);
  const maybeLang = segments[0] as SupportedLang;
  if (maybeLang && maybeLang in ui) {
    return maybeLang;
  }
  return defaultLang;
}

/**
 * Returns a translation function `t(key)` for the specified language
 */
export function useTranslations(lang: SupportedLang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    const localized = ui[lang];
    if (localized && key in localized) {
      return (localized as Record<string, string>)[key];
    }
    return ui[defaultLang][key];
  };
}

/**
 * Computes localized path for a given route
 * E.g. translatePath('/tools', 'es') -> '/es/tools'
 *      translatePath('/tools', 'en') -> '/tools' (when showDefaultLang=false)
 */
export function useTranslatedPath(lang: SupportedLang) {
  return function translatePath(path: string = '', targetLang: SupportedLang = lang): string {
    // Strip leading and trailing slashes and any existing lang prefix
    let clean = path.replace(/^\/+|\/+$/g, '');
    const parts = clean.split('/');
    if (parts[0] in languages) {
      parts.shift();
      clean = parts.join('/');
    }

    if (!showDefaultLang && targetLang === defaultLang) {
      return clean ? `/${clean}` : '/';
    }
    return clean ? `/${targetLang}/${clean}` : `/${targetLang}/`;
  };
}

/**
 * Generates an array of hreflang alternate links for SEO header injection
 */
export function getHreflangAlternates(canonicalSlug: string = '', siteOrigin: string = 'https://cleanwordcounter.com') {
  const cleanSlug = canonicalSlug.replace(/^\/+|\/+$/g, '');
  const slugPath = cleanSlug ? `${cleanSlug}/` : '';
  const origin = siteOrigin.replace(/\/$/, '');

  const alternates = [
    {
      hreflang: 'x-default',
      href: `${origin}/${slugPath}`,
    },
    {
      hreflang: 'en',
      href: `${origin}/${slugPath}`,
    },
    ...Object.keys(languages)
      .filter((lang) => lang !== 'en')
      .map((lang) => ({
        hreflang: lang,
        href: `${origin}/${lang}/${slugPath}`,
      })),
  ];

  return alternates;
}
