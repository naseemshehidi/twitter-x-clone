import { HeroIcon } from '@/types'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface IconButtonProps
  extends React.ComponentPropsWithoutRef<'button'> {
  Icon: HeroIcon
  SelectedIcon?: HeroIcon
  iconStyle?: string
  selectedIconStyle?: string
  onClick?: React.MouseEventHandler
  className?: string
  selected?: boolean
}

export const IconButton = ({
  Icon,
  SelectedIcon = Icon,
  iconStyle = '',
  selectedIconStyle = '',
  onClick,
  className = '',
  ...rest
}: IconButtonProps) => {
  const [selected, setSelected] = React.useState(rest.selected)

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        setSelected(!selected)
        onClick && onClick(e)
      }}
      className={twMerge(
        `rounded-full w-8 h-8 flex justify-center items-center `,
        className
      )}
    >
      {!selected ? (
        <Icon className={`${iconStyle}`} />
      ) : (
        <SelectedIcon className={`text-primary-main ${selectedIconStyle}`} />
      )}
    </button>
  )
}
