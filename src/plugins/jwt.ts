// src/utils/jwt.ts
export function parseJwt(token: string) {
  const base64 = token.split(".")[1]
  const payload = atob(base64.replace(/-/g, "+").replace(/_/g, "/"))
  return JSON.parse(decodeURIComponent(escape(payload)))
}
