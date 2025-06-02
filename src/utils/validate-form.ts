export function validateNumber(ref: React.RefObject<HTMLInputElement | null>, min: number, max: number, replace: number) {
    if (ref.current === null) return NaN;

    const num = Number(ref.current.value);

    if (isNaN(num) || num < min || num > max) {
        ref.current.value = replace.toString();
        return replace;
    }
    return num;
}