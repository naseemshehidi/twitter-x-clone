import { twMerge } from 'tailwind-merge'

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string
  children?: React.ReactNode
  variant: ButtonVariants
}

export type ButtonVariants = 'primary' | 'secondary'

const variants = {
  primary: 'bg-primary-main text-white',
  secondary: 'bg-bg-primary text-primary-main border border-primary-main',
}

export const Button = ({
  className = '',
  children = '',
  variant,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={twMerge(
        `px-4 py-2 ${variants[variant]} rounded-full`,
        className
      )}
    >
      {children}
    </button>
  )
}
