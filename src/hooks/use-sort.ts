import { useState } from 'react';
import generateArray from '../utils/generate-array';

type ReturnParams =  [
    array:  number[],
    i:      number,
    j:      number,
    cnt:    number,
    isDone: boolean,
    step:   () => void,
    reset:  () => void,
]

export function useBubbleSort({
    len = 7,
    from = 'tail'
}: {
    len?: number
    from?: 'head' | 'tail'
} = {}): ReturnParams {
    const [array, setArray] = useState(generateArray({ len }));
    const [i, setI] = useState(0);
    const [j, setJ] = useState(len - 1);
    const [cnt, setCnt] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const sortFromHead = () => {
        
    }

    const sortFromTail = () => {
        let newArray = [...array];
        const len = array.length;

        if (newArray[j - 1] > newArray[j]) {
            const tmp       = newArray[j];
            newArray[j]     = newArray[j - 1];
            newArray[j - 1] = tmp;
        }
        setArray(newArray);

        const nextI = i + 1;  // isDone判定に更新直後のiを用いるため
        if (j <= i + 1) {
            setI(nextI);
            setJ(len - 1);
        } else {
            setJ(prev => prev - 1);
        }
    
        if (nextI >= len - 1) {
            setJ(prev => prev - 1);  // 最後のデクリメントを反映
            setIsDone(true);
        }

        setCnt(prev => prev + 1);
    }

    const step = from === 'head' ? sortFromHead : sortFromTail;

    const reset = () => {
        setArray(generateArray({ len }));
        setI(0);
        setJ(len - 1);
        setCnt(0);
        setIsDone(false);
    }

    return [array, i, j, cnt, isDone, step, reset];
}

export function useInsertionSort({
    len = 7,
}: {
    len?: number
} = {}): [
    array:  number[],
    i:      number,
    j:      number,
    t:      number,
    cnt:    number,
    isDone: boolean,
    step:   () => void,
    reset:  () => void,
] {
    const _array = generateArray({ len });
    const [array, setArray] = useState(_array);
    const [i, setI] = useState(0);
    const [j, setJ] = useState(0);
    const [t, setT] = useState(_array[1]); 
    const [cnt, setCnt] = useState(0);
    const [isDone, setIsDone] = useState(false);

    // const step = () => {
    //     let newArray = [...array];
    //     const len = array.length;


    //     const nextI = i + 1;
    //     if (j < 0 || array[j] <= t) {
    //         newArray[j + 1] = t;
    //         setArray(newArray);
    //         setI(nextI);
    //         setJ(nextI);
    //         setT(newArray[nextI + 1]);
    //     } else {
    //         newArray[j + 1] = newArray[j];
    //         setArray(newArray);
    //         setJ(prev => prev - 1);
    //     }

    //     if (nextI >= len - 1) {
    //         setIsDone(true);
    //     }

    //     setCnt(prev => prev + 1);
    // }

    const step = () => {
    if (isDone) return;

    let newArray = [...array];
    const len = array.length;

    if (j < 0 || array[j] <= t) {
        newArray[j + 1] = t;
        const nextI = i + 1;

        setArray(newArray);
        setI(nextI);

        if (nextI >= len - 1) {
            setIsDone(true);
        } else {
            setT(newArray[nextI + 1]);
            setJ(nextI);
        }
    } else {
        newArray[j + 1] = newArray[j];
        setArray(newArray);
        setJ((prev) => prev - 1);
    }

    setCnt((prev) => prev + 1);
};

    const reset = () => {
        const _array = generateArray({ len });
        setArray(_array);
        setI(0);
        setJ(0);
        setT(_array[1]);
        setCnt(0);
        setIsDone(false);
    }

    return [array, i, j, t, cnt, isDone, step, reset];
}