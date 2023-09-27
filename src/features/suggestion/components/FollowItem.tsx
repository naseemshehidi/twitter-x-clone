import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import React from 'react'

interface FollowItemProps extends React.ComponentPropsWithoutRef<'div'> {
  avatar?: string
  username: string
}
export const FollowItem = (props: FollowItemProps) => {
  return (
    <div className='flex cursor-pointer items-center gap-4 hover:bg-bg-secondary px-4 py-2'>
        <Avatar avatar={props.avatar} className='mt-1'/>
        <div className='flex-grow hover:underline'>
            {props.username}
        </div>
        <Button variant='primary' className='bg-black hover:bg-black/80'>Follow</Button>
    </div>
  )
}
