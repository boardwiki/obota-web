import {createI18n} from "vue-i18n"
//import {messages} from "@/locales"

// 지원 언어 목록
const supported = ["ko", "en", "zh", "zh-TW", "ja"] as const
export type Lang = (typeof supported)[number]

// 언어 감지 함수
function detectLang(): Lang {
  const path = location.pathname.toLowerCase()

  // URL prefix 로케일 감지 (긴 경로 먼저!)
  if (path.startsWith("/zh-tw")) return "zh-TW"
  else if (path.startsWith("/en")) return "en"
  else if (path.startsWith("/zh")) return "zh"
  else if (path.startsWith("/ja")) return "ja"

  // LocalStorage 저장값 우선
  const ls = localStorage.getItem("lang")
  if (ls && supported.includes(ls as Lang)) {
    return ls as Lang
  }

  // 기본 언어
  return "ko"
}

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: detectLang(),
  fallbackLocale: "en",
  //messages,
})
