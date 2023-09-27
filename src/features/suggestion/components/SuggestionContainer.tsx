import React from 'react'
import { twMerge } from 'tailwind-merge'

interface SuggestionContainerProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  className?: string
}

export const SuggestionContainer = (props: SuggestionContainerProps) => {
  return (
    <div
      className={twMerge(
        'flex flex-col text-sm rounded-3xl bg-bg-secondary/50 font-bold py-4',
        props.className
      )}
    >
      {props.children}
    </div>
  )
}
