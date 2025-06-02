import type React from 'react'
import { Link as RouterLink } from 'react-router'

export default function Link({
  to,
  children
}: {
  to: string
  children: React.ReactNode
}) {
  return (
    <RouterLink
      to={to}
      className='
        w-fit px-2
        text-cyan-500 border-b border-b-cyan-500
        hover:text-cyan-700 hover:border-b-2 hover:border-b-cyan-700
      '
    >
      {children}
    </RouterLink>
  )
}