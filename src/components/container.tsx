import  React from 'react'

export default function Container({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-col items-center  max-w-[700px] mx-auto my-8 px-8'>
      {children}
    </div>
  )
}