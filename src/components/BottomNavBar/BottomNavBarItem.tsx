import { HeroIcon } from '@/types'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface BottomNavBarItemProps
  extends React.ComponentPropsWithoutRef<'button'> {
  onClick?: () => void
  className?: string
  Icon: HeroIcon
  SelectedIcon: HeroIcon
  iconStyle?: string
  selectedIconStyle?: string
  selected: boolean
}

export const BottomNavBarItem = ({
  onClick,
  className = '',
  iconStyle = '',
  selectedIconStyle = '',
  ...rest
}: BottomNavBarItemProps) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `rounded-full w-8 h-8 flex justify-center items-center `,
        className
      )}
    >
      {rest.selected ? (
        <rest.SelectedIcon
          className={`w-[24px] h-[24px] ${selectedIconStyle}`}
        />
      ) : (
        <rest.Icon className={`w-[24px] h-[24px] ${iconStyle}`} />
      )}
    </button>
  )
}
