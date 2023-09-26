import { Logo } from '@/components/Logo'
import React, { useEffect, useState } from 'react'
import { IconLinkItem } from '../IconLinkItem'

import tailwindConfig from '@/../tailwind.config'
import { useAuth } from '@/features/user/hooks/useAuth'
import { ICONS, sideBarListNames } from '@/types'
import { useMediaQuery } from 'react-responsive'
import { useLocation, useNavigate } from 'react-router-dom'
import resolveConfig from 'tailwindcss/resolveConfig'
import { AccountMenu } from '../AccountMenu'
import { Button } from '../Button'
import { FloatingButton } from '../FloatingButton'
import { Popover, PopoverItem } from '../Popover'
import { Unavailable } from '../Unavailable'

export interface SideBarProps extends React.ComponentPropsWithoutRef<'div'> {}

export const SideBar = (props: SideBarProps) => {
  const [selected, setSelected] = useState(sideBarListNames.HOME)
  const [collapsed, setCollapsed] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const { authUser } = useAuth()

  const twConfig = resolveConfig(tailwindConfig) as any

  const isLargeQuery = useMediaQuery({
    query: `(min-width: ${twConfig.theme.screens.lg})`,
  })

  useEffect(() => {
    setCollapsed(!isLargeQuery)
  }, [isLargeQuery])

  const location = useLocation()
  useEffect(() => {
    if (location.pathname === '/') {
      setSelected(sideBarListNames.HOME)
    } else if (location.pathname === `/profile/${authUser?.id}`) {
      setSelected(sideBarListNames.PROFILE)
    } else {
      setSelected(sideBarListNames.NOTHING)
    }
  }, [location.pathname])

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen)
    console.log('popover clicked')
  }

  const navigate = useNavigate()

  const sideBarItems = [
    {
      name: sideBarListNames.HOME,
      icon: ICONS.OUTLINE.HOME,
      selectedIcon: ICONS.SOLID.HOME,
      path: '/',
      unavailable: false,
    },
    {
      name: sideBarListNames.EXPLORE,
      icon: ICONS.OUTLINE.SEARCH,
      selectedIcon: ICONS.SOLID.SEARCH,
      path: '/search',
      unavailable: true,
    },
    {
      name: sideBarListNames.NOTIFICATIONS,
      icon: ICONS.OUTLINE.NOTIFICATIONS,
      selectedIcon: ICONS.SOLID.NOTIFICATIONS,
      path: '/notifications',
      unavailable: true,
    },
    {
      name: sideBarListNames.MESSAGES,
      icon: ICONS.OUTLINE.MAIL,
      selectedIcon: ICONS.SOLID.MAIL,
      path: '/messages',
      unavailable: true,
    },
    {
      name: sideBarListNames.LISTS,
      icon: ICONS.OUTLINE.LISTS,
      selectedIcon: ICONS.SOLID.LISTS,
      path: '/lists',
      unavailable: true,
    },
    {
      name: sideBarListNames.BOOKMARKS,
      icon: ICONS.OUTLINE.BOOKMARK,
      selectedIcon: ICONS.SOLID.BOOKMARK,
      path: '/bookmarks',
      unavailable: true,
    },
    {
      name: sideBarListNames.COMMUNITIES,
      icon: ICONS.OUTLINE.COMMUNITY,
      selectedIcon: ICONS.SOLID.COMMUNITY,
      path: '/communities',
      unavailable: true,
    },
    {
      name: sideBarListNames.VERIFIED,
      icon: ICONS.OUTLINE.VERIFIED,
      selectedIcon: ICONS.SOLID.VERIFIED,
      path: '/verified',
      unavailable: true,
    },
    {
      name: sideBarListNames.PROFILE,
      icon: ICONS.OUTLINE.USER,
      selectedIcon: ICONS.SOLID.USER,
      path: `/profile/${authUser?.id}`,
      unavailable: false,
    },
    {
      name: sideBarListNames.MORE,
      icon: ICONS.OUTLINE.MORE_CIRCLE,
      selectedIcon: ICONS.SOLID.MORE_CIRCLE,
      path: '/more',
      unavailable: true,
    },
  ]

  return (
    <div className='border-r'>
      <div
        className='bg-bg-primary md:sticky top-0 h-screen flex flex-col px-4 '
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full flex items-center justify-center lg:justify-start px-4 pt-6 '>
          <Logo svgStyle='w-6 h-6' />
        </div>

        <div className='pt-4 pb-1 flex-1'>
          <ul className='flex flex-col items-center lg:items-start'>
            {sideBarItems.map((item) => (
              <li key={item.name}>
                {item.unavailable ? (
                  <Unavailable>
                    <IconLinkItem
                      title={item.name}
                      Icon={item.icon}
                      SelectedIcon={item.selectedIcon}
                      collapsed={collapsed}
                      selected={selected === item.name}
                      onClick={() => {
                        setSelected(item.name)
                        navigate(item.path)
                      }}
                    />
                  </Unavailable>
                ) : (
                  <IconLinkItem
                    title={item.name}
                    Icon={item.icon}
                    SelectedIcon={item.selectedIcon}
                    collapsed={collapsed}
                    selected={selected === item.name}
                    onClick={() => {
                      setSelected(item.name)
                      navigate(item.path)
                    }}
                  />
                )}
              </li>
            ))}
            <li
              className={
                `w-full flex items-center justify-center pt-2` +
                (collapsed ? '' : ' pl-4')
              }
            >
              {collapsed ? (
                <div className={!collapsed ? ' pr-4' : ''}>
                  <FloatingButton
                    className='shadow-xl h-[45px] w-[45px]'
                    onClick={() => navigate('/post/new')}
                  />
                </div>
              ) : (
                <Button
                  variant='primary'
                  className='w-[275px] font-bold h-12'
                  onClick={() => navigate('/post/new')}
                >
                  Post
                </Button>
              )}
            </li>
          </ul>
        </div>

        <Popover
          open={popoverOpen}
          button={
            <AccountMenu
              onClick={togglePopover}
              username={authUser?.username as string}
              avatar={authUser?.avatar as string}
              collapsed={collapsed}
            />
          }
          className='lg:mx-2'
        >
          <Unavailable className='rounded-none'>
            <PopoverItem title='Add an existing account' />
          </Unavailable>
          <PopoverItem
            title={`Log out @${authUser?.username}`}
            onClick={() => navigate('/logout')}
          />
        </Popover>
      </div>
    </div>
  )
}
