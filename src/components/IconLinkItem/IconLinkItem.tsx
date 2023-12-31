import { HeroIcon } from '@/types'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface IconLinkItemProps
  extends React.ComponentPropsWithoutRef<'button'> {
  className?: string
  Icon: HeroIcon
  SelectedIcon: HeroIcon
  iconStyle?: string
  selectedIconStyle?: string
  title: string
  collapsed: boolean
  selected: boolean
}

export const IconLinkItem = ({
  className = '',
  iconStyle = '',
  selectedIconStyle = '',
  collapsed,
  selected,
  ...rest
}: IconLinkItemProps) => {
  return (
    <button
      onClick={rest.onClick}
      className={twMerge(
        `flex bg-bg-primary hover:bg-bg-secondary active:bg-bg-secondary px-4 py-3 rounded-2xl items-center md:justify-center lg:justify-start gap-4 cursor-pointer `,
        className
      )}
    >
      {selected ? (
        <rest.SelectedIcon
          className={`w-[25px] h-[25px] ${selectedIconStyle}`}
        />
      ) : (
        <rest.Icon className={twMerge(`w-[25px] h-[25px] ${iconStyle}`)} />
      )}
      {collapsed || (
        <h3
          className={twMerge(
            ` text-lg ${selected ? 'text-primary-main font-bold' : 'text-text-primary'}`
          )}
        >
          {rest.title}
        </h3>
      )}
    </button>
  )
}
