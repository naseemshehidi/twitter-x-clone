import { ICONS } from '@/types'
import React from 'react'

interface TrendItemProps extends React.ComponentPropsWithoutRef<'div'> {
  location: string
  title: string
  postCount: string
}
export const TrendItem = (props: TrendItemProps) => {
  return (
    <div className='flex justify-between cursor-pointer hover:bg-bg-secondary px-4 py-2'>
      <div className='flex flex-col gap-1 pt-1'>
        <span className=' text-xs text-text-secondary font-normal'>
          {props.location}
        </span>

        <span className=' text-sm font-bold'>{props.title}</span>
        <span className=' text-xs text-text-secondary font-normal'>
          {props.postCount}
        </span>
      </div>
      <div className='rounded-full flex justify-center items-center w-[25px] h-[25px]'>
        <ICONS.OUTLINE.MORE_HORIZONTAL />
      </div>
    </div>
  )
}
