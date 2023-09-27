import React from 'react'
import { Avatar } from '../Avatar'
import { ICONS } from '@/types'

interface AccountMenuProps extends React.ComponentPropsWithoutRef<'button'> {
  onClick: () => void
  avatar?: string
  username: string
  collapsed: boolean
}

export const AccountMenu = (props: AccountMenuProps) => {
  return (
    <>
      <Avatar avatar={props.avatar} />
      {props.collapsed || (
        <>
          <span className='flex-1 flex'>{props.username}</span>
          <ICONS.OUTLINE.MORE_HORIZONTAL className='w-[25px] h-[25px]' />
        </>
      )}
    </>
  )
}
