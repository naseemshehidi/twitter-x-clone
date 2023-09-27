import { IconButton } from '@/components/IconButton'
import { ICONS } from '@/types'
import { twMerge } from 'tailwind-merge'

interface FloatingButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  className?: string
  onClick?: () => void
}

export const FloatingButton = ({
  className = '',
  ...rest
}: FloatingButtonProps) => {
  return (
    <IconButton
      {...rest}
      className={twMerge(
        `flex items-center justify-center bg-primary-main text-text-contrast w-[60px] h-[60px] rounded-[100%] `,
        className
      )}
      Icon={ICONS.OUTLINE.POST}
      SelectedIcon={ICONS.OUTLINE.POST}
      iconStyle='text-white w-[24px]'
      selectedIconStyle='text-white h-[24px]'
    />
  )
}
