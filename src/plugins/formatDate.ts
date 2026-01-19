/**
 * ISO 8601 -> "YYYY.MM.DD"
 * 예: "2026-02-01T16:04:00+00:00" -> "2026.02.01"
 */
export const formatToYYYYMMDD = (dateStr: string | null | undefined): string => {
  if (!dateStr) return ""
  // 날짜 부분(10자리)만 추출: "2026-02-01" -> "2026.02.01"
  return dateStr.substring(0, 10).replace(/-/g, ".")
}

/**
 * ISO 8601 -> "MM.DD"
 * 예: "2026-02-01T16:04:00+00:00" -> "02.01"
 */
export const formatToMMDD = (dateStr: string | null | undefined): string => {
  if (!dateStr) return ""
  const formatted = formatToYYYYMMDD(dateStr) // 먼저 "2026.02.01"로 만듦
  return formatted.substring(5) // "02.01" 부분만 추출
}

/**
 * 기간 표시 (YYYY.MM.DD ~ MM.DD)
 */
export const formatPeriod = (start: string | null | undefined, end: string | null | undefined): string => {
  if (!start || !end) return ""
  return `${formatToYYYYMMDD(start)} ~ ${formatToMMDD(end)}`
}

/**
 * D-Day 계산 함수
 */
export const calculateDDay = (targetDateString: string | null | undefined): number => {
  if (!targetDateString) return 0

  const normalizedDate = targetDateString.substring(0, 10).replace(/\./g, "-")
  const targetDate = new Date(normalizedDate)
  const today = new Date()

  targetDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)

  const diffTime = targetDate.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}
