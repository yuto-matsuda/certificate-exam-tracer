import React from 'react'

export default function Heading({
  children,
  small = false
}: {
  children: React.ReactNode
  small?:   boolean
}) {
  return small ? (
    <h2 className='
      relative
      px-8 mb-2
      text-lg font-semibold
      before:absolute before:top-1/2 before:w-4 before:h-0.5 before:bg-blue-400 before:left-0
      after:absolute after:top-1/2 after:w-4 after:h-0.5 after:bg-blue-400 after:right-0
    '>
      {children}
    </h2>
  ) : (
    <h1 className='
      relative
      w-fit mx-auto mb-8 px-8 
      font-semibold text-2xl text-center
      border-b-4 border-gray-300
      after:absolute
      after:-bottom-1 after:left-1/2 after:-translate-x-1/2
      after:w-20 after:h-1
      after:bg-blue-400
    '>
      {children}
    </h1>
  )
}