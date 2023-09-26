import React from 'react'

interface CenteredContainerProps extends React.ComponentPropsWithoutRef<'div'> {
  children?: React.ReactNode
}
export const CenteredContainer = (props: CenteredContainerProps) => {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='shadow-lg border border-gray-200 rounded-md'>
        {props.children}
      </div>
    </div>
  )
}
