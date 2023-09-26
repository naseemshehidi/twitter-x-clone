import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface TextAreaProps extends React.ComponentPropsWithRef<'textarea'> {
  className?: string
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className = '', ...rest }, ref) => {
    return (
      <textarea
        {...rest}
        className={twMerge(
          `px-4 py-2 rounded-2xl outline-none focus:border-primary-main `,
          className
        )}
        ref={ref}
      />
    )
  }
)

TextArea.displayName = 'PrimaryTextArea'
