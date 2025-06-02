interface Props {
    min?: number
    max?: number
    len?: number
}

export default function generateArray({
    min = 0,
    max = 99,
    len = 10
}: Props = {}) {
    const getRandomInt = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        const rand = Math.floor(Math.random() * (max - min + 1) + min);
        return rand;
    }

    const array = [];

    for (let i = 0; i < len; i++) {
        array.push(getRandomInt(min, max));
    }

    return array;
}