export default function DisplayArray({
  array,
  comparing = [],
  sortedIndex = -1
}: {
  array: number[]
  comparing?: number[]
  sortedIndex?: number
}) {
  return (
    <ul className="flex w-fit">
      {array.map((num, i) => {
        let color: string;
        if (i <= sortedIndex) {
          color = 'bg-green-400';
        } else if (comparing.includes(i)) {
          color = 'bg-red-400';
        } else {
          color = 'bg-white';
        }

        return (
          <li
            key={i}
            className="flex flex-col items-center py-1"
          >
            <span className="text-xs text-gray-500 mb-1">{i}</span>
            <div className={`flex items-center justify-center w-10 h-10 font-bold border-y border-l ${i + 1 >= array.length && 'border-r'} ${color}`}>
              {num}
            </div>
          </li>
        );
      })}
    </ul>
  );
}


export function TraceInsertionSort({
  array,
  t,
  comparing,
  sortedIndex,
  isDone
}: {
  array:       number[]
  t:           number
  comparing:   number
  sortedIndex: number
  isDone:      boolean
}) {
  return (
    <ul className="flex w-fit">
      {array.map((num, i) => {
        let color: string;
        if (isDone) {
          color = 'bg-green-400';
        } else if (i === comparing) {
          color = 'bg-red-400';
        } else if (i <= sortedIndex) {
          color = 'bg-green-400';
        } else {
          color = 'bg-white';
        }

        return (
          <li
            key={i}
            className="flex flex-col items-center py-1"
          >
            <span className="text-xs text-gray-500 mb-1">{i}</span>
            <div className={`flex items-center justify-center w-10 h-10 font-bold border-y border-l ${i + 1 >= array.length && 'border-r'} ${color}`}>
              {num}
            </div>
          </li>
        );
      })}

      <li className="flex flex-col items-center py-1 ml-12">
        <span className="text-xs text-gray-500 mb-1">work</span>
          <div className={`flex items-center justify-center w-10 h-10 font-bold border-y border ${isDone ? 'bg-white' : 'bg-red-400'}`}>
            {t}
          </div>
      </li>
    </ul>
  );
}

export function TraceQuickSort({
  array,
  range,
  pivot,
  comparing,
  sortedIdx,
  isDone
}: {
  array:     number[]
  range:     number[]
  pivot:     number
  comparing: number
  sortedIdx: number[]
  isDone:    boolean
}) {
  return (
    <ul className='flex w-fit'>
      {array.map((num, i) => {
        let color  = 'bg-white';
        let active = 'before:absolute before:w-full before:h-full before:bg-gray-500 before:opacity-60';

        if (range[0] <= i && i <= range[1]) active = '';

        if (isDone) {
          color = 'bg-green-400';
          active = ''
        } else if (i === pivot) {
          color = 'bg-orange-300';
        } else if (i === comparing) {
          color = 'bg-red-400';
        } else if (sortedIdx.includes(i)) {
          color = 'bg-green-400';
        }

        return (
          <li
            key={i}
            className='flex flex-col items-center py-1'
          >
            <span className='text-xs text-gray-500 mb-1'>{i}</span>
            <div className={`relative flex items-center justify-center w-10 h-10 font-bold border-y border-l ${i + 1 >= array.length && 'border-r'} ${color} ${active}`}>
              {num}
            </div>
          </li>
        );
      })}
    </ul>
  );
}