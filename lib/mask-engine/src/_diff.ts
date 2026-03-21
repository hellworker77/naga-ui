export function diff(prev: string, next: string) {
    let start = 0

    while (
        start < prev.length &&
        start < next.length &&
        prev[start] === next[start]
        ) {
        start++
    }

    let endPrev = prev.length
    let endNext = next.length

    while (
        endPrev > start &&
        endNext > start &&
        prev[endPrev - 1] === next[endNext - 1]
        ) {
        endPrev--
        endNext--
    }

    return {
        start,
        removed: prev.slice(start, endPrev),
        inserted: next.slice(start, endNext)
    }
}