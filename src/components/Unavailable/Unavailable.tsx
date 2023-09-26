// this is a container for features that are unavailable, should make components unclickable and display message on hover

import React from 'react'
import { twMerge } from 'tailwind-merge'

interface UnavailableProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
  className?: string
}
export const Unavailable = ({ className = '', children }: UnavailableProps) => {
  return (
    <>
      <div className='relative max-w-fit'>
        <div className='absolute flex items-center top-0 left-0 w-full h-full'>
          <div
            className={twMerge(
              'w-full h-full opacity-0 hover:opacity-100 active:opacity-100 z-[9999] bg-error-main/30 rounded-3xl text-center flex items-center justify-center',
              className
            )}
            onMouseOver={(e) => {
              e.stopPropagation()
            }}
            title='this feature is not available'
          >
            <svg width='100%' height='100%' className=''>
              <line x1='0' y1='0' x2='100%' y2='100%' stroke='white' />
            </svg>
          </div>
        </div>

        {children}
      </div>
    </>
  )
}
