import { HeroIcon } from '@/types'
import React from 'react'

interface BottomActionDialogItemProps extends React.ComponentPropsWithoutRef<'div'> {
  onClick?: () => void
  className?: string
  Icon: HeroIcon
  SelectedIcon: HeroIcon
  iconStyle?: string
  selectedIconStyle?: string
  selected: boolean
  title: string
}

export const BottomActionDialogItem = (props: BottomActionDialogItemProps) => {
  return (
    <div
      onClick={props.onClick}
      className={`flex bg-bg-primary hover:bg-bg-secondary active:bg-bg-secondary px-4 py-3 rounded-2xl items-center md:justify-center lg:justify-start gap-2 cursor-pointer ${props.className}`}
    >
      <button
        onClick={props.onClick}
        className={`rounded-full w-8 h-8 flex justify-center items-center `}
      >
        {!props.selected ? (
          <props.Icon className={props.iconStyle || ''} />
        ) : (
          <props.SelectedIcon className={props.selectedIconStyle || ''} />
        )}
      </button>
      <h3
        className={`font-bold ${
          props.selected ? 'text-primary-main' : 'text-text-primary'
        }`}
      >
        {props.title}
      </h3>
    </div>
  )
}
