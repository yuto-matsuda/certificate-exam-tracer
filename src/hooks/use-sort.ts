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

export function useQuickSort({
    len = 7,
}: {
    len?:     number
} = {}): [
    array:  number[],
    left:   number,
    right:  number,
    pivot:  number,
    lp:     number,
    rp:     number,
    action: string,
    sorted: number[],
    cnt:    number,
    isDone: boolean,
    step:   () => void,
    reset:  (dataset: number[] | null, pivotPos: string) => void,
]{
    type Action = 
        | 'startPartition'
        | 'moveLp'
        | 'moveRp'
        | 'finishPartition'
        | 'done';

    const _array = generateArray({ len });
    const [array, setArray]       = useState(_array);
    const [left, setLeft]         = useState(0);
    const [right, setRight]       = useState(len - 1);
    const [pivotPos, setPivotPos] = useState(0); 
    const [lp, setLp]             = useState(0);
    const [rp, setRp]             = useState(len - 1);
    const [stack, setStack]       = useState([[0, len - 1]]);
    const [action, setAction]     = useState<Action>('startPartition');
    const [sorted, setSorted]     = useState<number[]>([]);
    const [cnt, setCnt]           = useState(0);
    const [isDone, setIsDone]     = useState(false);
    const [pivotConfig, setPivotCongig] = useState('left');

    const step = () => {
        if (isDone) return;
        let newArray = [...array];
        const newStack = [...stack];
        const pivotValue = newArray[pivotPos];

        switch (action) {
            case 'startPartition':
                const [_left, _right] = newStack.pop()!;
                if (_left >= _right) {
                    if (newStack.length === 0) {
                        setIsDone(true);
                        setAction('done');
                    }
                    setStack(newStack);
                    setSorted(prev => [...prev, _left]);
                    return;
                }
                
                setLeft(_left);
                setRight(_right);
                setPivotPos(pivotConfig === 'left' ? _left : _right);
                setLp(pivotConfig === 'left' ? _left + 1 : _left);
                setRp(pivotConfig === 'left' ? _right : _right - 1);
                setStack(newStack);
                setAction('moveLp');
                break;

            case 'moveLp':
                if (lp <= rp && ((pivotConfig === 'left' && newArray[lp] <= pivotValue) || (pivotConfig === 'right' && newArray[lp] < pivotValue))) {
                    setLp(prev => prev + 1);
                } else {
                    setAction('moveRp');
                }
                setCnt(prev => prev + 1);
                break;

            case 'moveRp':
                if (lp <= rp && ((pivotConfig === 'left' && newArray[rp] > pivotValue) || (pivotConfig === 'right' && newArray[rp] >= pivotValue))) {
                    setRp(prev => prev - 1);
                    setCnt(prev => prev + 1);
                } else if (lp < rp) {
                    [newArray[lp], newArray[rp]] = [newArray[rp], newArray[lp]];
                    setArray(newArray);
                    setAction('moveLp');
                    setCnt(prev => prev + 1);
                } else {
                    if (pivotConfig === 'left') {
                        [newArray[pivotPos], newArray[rp]] = [newArray[rp], newArray[pivotPos]];
                    } else {
                        [newArray[pivotPos], newArray[lp]] = [newArray[lp], newArray[pivotPos]];
                    }
                    setArray(newArray);
                    setPivotPos(pivotConfig === 'left' ? rp : lp);
                    setSorted(prev => [...prev, pivotConfig === 'left' ? rp : lp]);

                    newStack.push(pivotConfig === 'left' ? [rp + 1, right] : [lp + 1, right]);
                    newStack.push(pivotConfig === 'left' ? [left, rp - 1]  : [left, lp - 1]);
                    setStack(newStack);

                    setAction('startPartition');
                }
                break;
        }
    }

    const reset = (dataset:  number[] | null, pivotPos: string) => {
        const _array = dataset ?? generateArray({ len });
        setArray(_array);
        setLeft(0);
        setRight(len - 1);
        setPivotPos(pivotPos === 'left' ? 0 : len - 1);
        setLp(0);
        setRp(len - 1);
        setStack([[0, len - 1]]);
        setAction('startPartition');
        setSorted([]);
        setCnt(0);
        setIsDone(false);
        setPivotCongig(pivotPos);
    }

    return [array, left, right, pivotPos, lp, rp, action, sorted, cnt, isDone, step, reset];
}