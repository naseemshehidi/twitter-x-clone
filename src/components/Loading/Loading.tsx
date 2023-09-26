import { TAILWIND_CONFIG } from '@/types'
import React from 'react'
import { Oval } from 'react-loader-spinner'

interface LoadingProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Loading = (props: LoadingProps) => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Oval
        height={80}
        width={80}
        color={TAILWIND_CONFIG.theme.colors.primary.light}
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor={TAILWIND_CONFIG.theme.colors.primary.main}
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  )
}
