// src/plugins/countries.ts
import countries from "i18n-iso-countries"

// locales (존재하는 것만!)
import en from "i18n-iso-countries/langs/en.json"
import ko from "i18n-iso-countries/langs/ko.json"
import ja from "i18n-iso-countries/langs/ja.json"
import zh from "i18n-iso-countries/langs/zh.json"

// ✅ 반드시 등록
countries.registerLocale(en)
countries.registerLocale(ko)
countries.registerLocale(ja)
countries.registerLocale(zh)

// ==============================
// types
// ==============================
export type CountryCode = string
export type AppLocale = "ko" | "en" | "ja" | "zh" | "zh_tw"

export interface CountryItem {
  code: CountryCode
  name: string
}

// ==============================
// locale normalize
// ==============================
function normalizeLocale(locale: AppLocale): "en" | "ko" | "ja" | "zh" {
  // zh_tw → zh 로 통일 (너가 말한 정책 그대로)
  if (locale === "zh_tw") return "zh"
  if (locale === "ko" || locale === "en" || locale === "ja" || locale === "zh") {
    return locale
  }
  return "en"
}

// ==============================
// APIs
// ==============================
export function getCountryName(code: CountryCode, locale: AppLocale): string {
  const l = normalizeLocale(locale)

  return countries.getName(code, l) || countries.getName(code, "en") || ""
}

export function getAllCountries(locale: AppLocale): CountryItem[] {
  const l = normalizeLocale(locale)

  const names = countries.getNames(l, {select: "official"})
  // names = { KR: '대한민국', JP: '일본', ... }

  return Object.entries(names).map(([code, name]) => ({
    code,
    name,
  }))
}
