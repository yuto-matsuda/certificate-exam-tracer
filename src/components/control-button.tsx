import  React from 'react'

export default function ControlButton({
  onClick,
  disabled = false,
  children
}: {
  onClick:   () => void
  disabled?: boolean
  children:  React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className='
        w-12 px-4 py-1 text-center text-white
        rounded bg-blue-500
      hover:bg-blue-600
      disabled:text-gray-100 disabled:bg-blue-300
      '
    >
      {children}
    </button>
  )
}