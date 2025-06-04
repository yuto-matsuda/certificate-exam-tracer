export default function Dataset({
  name,
  data,
  onClick
}: {
  name:     string
  data:     number[]
  onClick?: (data: number[]) => void
}) {
  const array = `[${data.map(num => `${num}`).join(', ')}]`;

  return (
    <div className='cursor-pointer flex flex-col rounded-xl mb-4 p-2 border border-gray-400 hover:bg-gray-300/10 hover:border-blue-400 hover:border-2' onClick={() => onClick?.(data)}>
      <h1 className='font-bold text-sm mb-2'>{name}</h1>
      <div className='u-code w-fit' style={{ margin: '0 auto', fontSize: '1em' }}>{array}</div>
    </div>
  )
}