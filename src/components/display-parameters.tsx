export default function DisplayParameters({
  params
}: {
  params: Record<string, any>
}) {
  return (
    <div className='flex flex-wrap gap-8 mt-4 text-sm'>
      {Object.entries(params).map(([key, value]) => (
        <p key={key} className='flex px-2 border-b-2 border-blue-500'>
          <span className='font-bold pr-1'>{key}:</span>
          <span className='min-w-8 text-right font-bold'>{value}</span>
        </p>
      ))}
    </div>
  )
}