import {pinyin} from 'pinyin-pro'

const CHINESE_CHAR_REGEXP = /[\u4e00-\u9fff]/
const LATIN_OR_DIGIT_REGEXP = /[a-z0-9]/

const normalizeToken = (token: string): string => {
    return token.replace(/[^a-z0-9]/g, '')
}

export function toUrlSlug(input: string): string {
    if (!input) return ''

    const text = input
        .trim()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()

    const result: string[] = []
    let latinBuffer = ''

    const flushLatinBuffer = () => {
        if (!latinBuffer) return
        const normalized = normalizeToken(latinBuffer)
        if (normalized) result.push(normalized)
        latinBuffer = ''
    }

    for (const char of text) {
        if (CHINESE_CHAR_REGEXP.test(char)) {
            flushLatinBuffer()
            const py = normalizeToken(
                pinyin(char, {
                    toneType: 'none',
                    type: 'string',
                    v: true,
                }),
            )

            if (py) result.push(py)
            continue
        }

        if (LATIN_OR_DIGIT_REGEXP.test(char)) {
            latinBuffer += char
            continue
        }

        flushLatinBuffer()
    }

    flushLatinBuffer()

    return result
        .join('-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
}
