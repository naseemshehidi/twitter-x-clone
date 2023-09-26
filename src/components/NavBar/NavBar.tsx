import React from 'react'
import { HeroIcon } from '@/types'
import { IconButton } from '@/components/IconButton'
import { Avatar } from '@/components/Avatar'
import { Cog6ToothIcon as Cog6ToothIconOutline } from '@heroicons/react/24/outline'
import { Cog6ToothIcon as Cog6ToothIconSolid } from '@heroicons/react/24/solid'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export type NavBarVariants = 'main' | 'details'

export interface NavBarProps extends React.ComponentPropsWithoutRef<'nav'> {
  className?: string
  variant: NavBarVariants
  iconStart?: HeroIcon
  iconStartSelected?: HeroIcon
  iconEnd?: HeroIcon
  iconEndSelected?: HeroIcon
  title?: string
  avatar?: string
  onStartClick?: () => void
  onEndClick?: () => void
}

export const NavBar = ({
  className = '',
  variant = 'main',
  iconStart = ArrowLeftIcon,
  iconStartSelected = ArrowLeftIcon,
  iconEnd = Cog6ToothIconOutline,
  iconEndSelected = Cog6ToothIconSolid,
  title = '',
  avatar,
  onStartClick,
  onEndClick,
}: NavBarProps) => {
  const navigate = useNavigate()
  return (
    <nav
      className={twMerge(
        `fixed top-0 left-0 right-0 flex items-center gap-4 px-3 h-16 bg-bg-primary `,
        className
      )}
    >
      {variant === 'main' ? (
        <>
          <button onClick={onStartClick}>
            <Avatar className={'w-8 h-8'} avatar={avatar} />
          </button>

          <input
            type='text'
            placeholder='Search'
            className='px-2 py-1 outline-none border focus:border-primary-main focus:bg-bg-primary rounded-3xl bg-bg-secondary min-w-0 flex-1'
          />
          <IconButton
            Icon={iconEnd}
            SelectedIcon={iconEndSelected}
            iconStyle='w-[24px]'
            selectedIconStyle='w-[24px]'
            onClick={onEndClick}
          />
        </>
      ) : (
        <>
          <IconButton
            Icon={iconStart}
            SelectedIcon={iconStartSelected}
            onClick={() => navigate(-1)}
            iconStyle='w-[24px]'
            selectedIconStyle='w-[24px]'
          />

          <span>{title}</span>
        </>
      )}
    </nav>
  )
}
