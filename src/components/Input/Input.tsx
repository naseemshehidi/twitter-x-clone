import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, ...rest } = props
    return (
      <input
        {...rest}
        className={twMerge(
          `px-4 py-2 border border-border-secondary rounded-2xl outline-none focus:border-primary-main `,
          className
        )}
        ref={ref}
      />
    )
  }
)

Input.displayName = 'Input'
