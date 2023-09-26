import React from 'react'
import { Popover as HeadlessPopover } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

interface PopoverProps {
  children?: React.ReactNode
  button?: React.ReactNode
  className?: string
  open: boolean
  variant?: PopoverVariants
}

export type PopoverVariants = 'left' | 'top' | 'bottom' | 'right'

export const variants = {
  left: 'right-[100%] mr-2',
  top: 'bottom-[100%] mb-2',
  bottom: 'top-[100%] mt-2',
  right: 'left-[100%] ml-2',
}

export const Popover = ({
  className = '',
  variant = 'top',
  ...props
}: PopoverProps) => {
  return (
    <HeadlessPopover className={twMerge(`relative `, className)}>
      <HeadlessPopover.Panel
        className={`absolute ${variants[variant]} min-w-fit bg-white rounded-2xl popover-shadow border border-border-secondary outline-border-primary py-2`}
      >
        {props.children}
      </HeadlessPopover.Panel>

      <HeadlessPopover.Button className='mb-4 flex bg-bg-primary hover:bg-bg-secondary active:bg-bg-secondary px-4 py-3 rounded-2xl items-center md:justify-center lg:justify-start gap-2 cursor-pointer outline-none w-full'>
        {props.button}
      </HeadlessPopover.Button>
    </HeadlessPopover>
  )
}
