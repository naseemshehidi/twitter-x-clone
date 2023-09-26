import React from 'react'
import { twMerge } from 'tailwind-merge'

export interface AvatarProps extends React.ComponentPropsWithoutRef<'img'> {
  avatar?: string
  className?: string
}

export const Avatar = ({
  avatar = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png',
  className = '',
}: AvatarProps) => {
  return (
    <img
      src={avatar}
      alt=''
      className={twMerge(
        `w-10 h-10 rounded-full filter hover:brightness-50 `,
        className
      )}
    />
  )
}
