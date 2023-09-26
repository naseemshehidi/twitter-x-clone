import {
  useGetFollowedByUserQuery,
  useGetFollowersByUserQuery,
} from '@/features/user/api/followApi'
import { useAuth } from '@/features/user/hooks/useAuth'
import { ICONS, sideBarListNames } from '@/types'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Avatar } from '../Avatar'
import { SideDrawerItem } from './SideDrawerItem'

export interface SideDrawerInterface
  extends React.ComponentPropsWithoutRef<'div'> {
  toggle: () => void
}

export const SideDrawer = ({ toggle }: SideDrawerInterface) => {
  const [selected, setSelected] = useState(sideBarListNames.NOTHING)

  const { authUser } = useAuth()

  const { data: followers } = useGetFollowersByUserQuery(authUser?.id!)
  const { data: followed } = useGetFollowedByUserQuery(authUser?.id!)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setSelected(sideBarListNames.HOME)
    } else if (location.pathname === `/profile/${authUser?.id}`) {
      setSelected(sideBarListNames.PROFILE)
    } else if (location.pathname === '/settings') {
      setSelected(sideBarListNames.SETTINGS)
    } else {
      setSelected(sideBarListNames.NOTHING)
    }
  }, [location.pathname])

  return (
    <div
      className={
        'z-40 fixed h-full top-0 right-0 left-0 bg-opacity-50 bg-black m-0 p-0 '
      }
      onClick={toggle}
    >
      <div
        className='bg-bg-primary absolute h-full left-0 right-1/4 overflow-auto z-50'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col'>
          <Avatar className='mx-4 mt-4' avatar={authUser?.avatar as string} />
          <h1 className='px-4 pt-2 font-bold'>{authUser?.username}</h1>
          <div className='flex gap-4 px-4 pt-4 text-xs'>
            <div className='flex items-center gap-1'>
              <span>{followed && followed.length || 0}</span>
              <span>Following</span>
            </div>
            <div className='flex items-center gap-1'>
              <span>{followers && followers.length || 0}</span>
              <span>Followers</span>
            </div>
          </div>
        </div>
        <div className='pt-4 pb-1'>
          <ul>
            <li>
              <SideDrawerItem
                Icon={ICONS.OUTLINE.HOME}
                SelectedIcon={ICONS.SOLID.HOME}
                selected={selected === sideBarListNames.HOME}
                title={sideBarListNames.HOME}
                onClick={() => {
                  setSelected(sideBarListNames.HOME)
                  toggle()
                  navigate('/')
                }}
              />
            </li>
            <li>
              <SideDrawerItem
                Icon={ICONS.OUTLINE.USER}
                SelectedIcon={ICONS.SOLID.USER}
                selected={selected === sideBarListNames.PROFILE}
                title={sideBarListNames.PROFILE}
                onClick={() => {
                  setSelected(sideBarListNames.PROFILE)
                  toggle()
                  navigate(`/profile/${authUser?.id}`)
                }}
              />
            </li>
          </ul>
        </div>
        <hr />
        <div>
          <ul>
            <li>
              <SideDrawerItem
                title={sideBarListNames.SETTINGS}
                Icon={ICONS.OUTLINE.SETTINGS}
                SelectedIcon={ICONS.SOLID.SETTINGS}
                selected={selected === sideBarListNames.SETTINGS}
                onClick={() => {
                  setSelected(sideBarListNames.SETTINGS)
                  navigate('/settings')
                }}
              />
            </li>
            <li>
              <SideDrawerItem
                title={sideBarListNames.LOGOUT}
                Icon={ICONS.OUTLINE.LOGOUT}
                SelectedIcon={ICONS.OUTLINE.LOGOUT}
                selected={selected === sideBarListNames.LOGOUT}
                onClick={() => {
                  setSelected(sideBarListNames.LOGOUT)
                  navigate('/logout')
                }}
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
