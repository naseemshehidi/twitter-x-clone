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
  return (
    <div className='border-r'>
      <div
        className='bg-bg-primary md:sticky top-0 h-screen flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='w-full flex items-center justify-center pt-6'>
          <Logo svgStyle='w-6 h-6' />
        </div>

        <div className='pt-4 pb-1 px-2 flex-1'>
          <ul>
            <li>
              <IconLinkItem
                title={sideBarListNames.HOME}
                Icon={ICONS.OUTLINE.HOME}
                SelectedIcon={ICONS.SOLID.HOME}
                collapsed={collapsed}
                selected={selected === sideBarListNames.HOME}
                onClick={() => {
                  setSelected(sideBarListNames.HOME)
                  navigate('/')
                }}
              />
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.EXPLORE}
                  Icon={ICONS.OUTLINE.SEARCH}
                  SelectedIcon={ICONS.SOLID.SEARCH}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.EXPLORE}
                  onClick={() => {
                    setSelected(sideBarListNames.EXPLORE)
                    navigate(`/search`)
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.NOTIFICATIONS}
                  Icon={ICONS.OUTLINE.NOTIFICATIONS}
                  SelectedIcon={ICONS.SOLID.NOTIFICATIONS}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.NOTIFICATIONS}
                  onClick={() => {
                    setSelected(sideBarListNames.NOTIFICATIONS)
                    navigate('/notifications')
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.MESSAGES}
                  Icon={ICONS.OUTLINE.MAIL}
                  SelectedIcon={ICONS.OUTLINE.MAIL}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.MESSAGES}
                  onClick={() => {
                    setSelected(sideBarListNames.MESSAGES)
                    navigate('/messages')
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.LISTS}
                  Icon={ICONS.OUTLINE.LISTS}
                  SelectedIcon={ICONS.SOLID.LISTS}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.LISTS}
                  onClick={() => {
                    setSelected(sideBarListNames.LISTS)
                    navigate('/lists')
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.BOOKMARKS}
                  Icon={ICONS.OUTLINE.BOOKMARK}
                  SelectedIcon={ICONS.SOLID.BOOKMARK}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.BOOKMARKS}
                  onClick={() => {
                    setSelected(sideBarListNames.BOOKMARKS)
                    navigate('/bookmarks')
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.COMMUNITIES}
                  Icon={ICONS.OUTLINE.COMMUNITY}
                  SelectedIcon={ICONS.SOLID.COMMUNITY}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.COMMUNITIES}
                  onClick={() => {
                    setSelected(sideBarListNames.COMMUNITIES)
                    navigate('/communities')
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.VERIFIED}
                  Icon={ICONS.OUTLINE.VERIFIED}
                  SelectedIcon={ICONS.SOLID.VERIFIED}
                  collapsed={collapsed}
                  selected={selected === sideBarListNames.VERIFIED}
                  onClick={() => {
                    setSelected(sideBarListNames.VERIFIED)
                    navigate('/verified')
                  }}
                />
              </Unavailable>
            </li>
            <li>
              <IconLinkItem
                title={sideBarListNames.PROFILE}
                Icon={ICONS.OUTLINE.USER}
                SelectedIcon={ICONS.SOLID.USER}
                collapsed={collapsed}
                selected={selected === sideBarListNames.PROFILE}
                onClick={() => {
                  setSelected(sideBarListNames.PROFILE)
                  navigate(`/profile/${authUser?.id}`)
                }}
              />
            </li>
            <li>
              <Unavailable>
                <IconLinkItem
                  title={sideBarListNames.MORE}
                  Icon={ICONS.OUTLINE.MORE_CIRCLE}
                  SelectedIcon={ICONS.SOLID.MORE_CIRCLE}
                  collapsed={collapsed}
                  selected={false}
                  onClick={() => {
                    navigate('/more')
                  }}
                />
              </Unavailable>
            </li>
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
                  className='w-full'
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
