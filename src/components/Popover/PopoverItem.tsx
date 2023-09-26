import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface PopoverItemProps
  extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
  onClick?: () => void
  title: string
}

export const PopoverItem = ({ className = '', ...rest }: PopoverItemProps) => {
  return (
    <div
      onClick={rest.onClick}
      className={twMerge(
        `flex bg-bg-primary min-w-fit hover:bg-bg-secondary active:bg-bg-secondary px-4 py-3 items-center md:justify-center lg:justify-start gap-2 cursor-pointer `,
        className
      )}
    >
      <h3 className='text-base text-text-primary min-w-[250px]'>
        {rest.title}
      </h3>
    </div>
  )
}
