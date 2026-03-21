interface FormatUtcToLocalOptions {
    locale?: string
    timeZone?: string
    showSeconds?: boolean
    fallback?: string
}

const hasExplicitTimeZone = (value: string): boolean => /(?:[zZ]|[+-]\d{2}:?\d{2})$/.test(value)

const parseUtcDate = (value: string | number | Date): Date | null => {
    if (value instanceof Date) {
        return Number.isNaN(value.getTime()) ? null : value
    }

    if (typeof value === "number") {
        const date = new Date(value)
        return Number.isNaN(date.getTime()) ? null : date
    }

    const text = value.trim()
    if (!text) return null

    const normalized = text.replace(" ", "T")
    const utcText = hasExplicitTimeZone(normalized) ? normalized : `${normalized}Z`
    const date = new Date(utcText)

    if (!Number.isNaN(date.getTime())) return date

    const fallbackDate = new Date(text)
    return Number.isNaN(fallbackDate.getTime()) ? null : fallbackDate
}

export const formatUtcToLocal = (
    value: string | number | Date | null | undefined,
    options: FormatUtcToLocalOptions = {},
): string => {
    const {
        locale,
        timeZone,
        showSeconds = true,
        fallback = "-",
    } = options

    if (value === null || value === undefined) return fallback

    const date = parseUtcDate(value)
    if (!date) return fallback

    const dateText = new Intl.DateTimeFormat(locale, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone,
    }).format(date)

    const timeText = new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: showSeconds ? "2-digit" : undefined,
        hour12: false,
        timeZone,
    }).format(date)

    return `${dateText} ${timeText}`
}
