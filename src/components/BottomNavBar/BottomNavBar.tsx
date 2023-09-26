import { BottomNavBarListNames, ICONS } from '@/types'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BottomNavBarItem } from './BottomNavBarItem'

export const BottomNavBar = () => {
  const [selected, setSelected] = useState(BottomNavBarListNames.HOME)
  const navigate = useNavigate()
  return (
    <nav className='fixed bottom-0 left-0 right-0 flex items-center justify-around gap-4 px-3 h-16 bg-bg-primary border-t'>
      <BottomNavBarItem
        Icon={ICONS.OUTLINE.HOME}
        SelectedIcon={ICONS.SOLID.HOME}
        selected={selected === BottomNavBarListNames.HOME}
        onClick={() => {
          setSelected(BottomNavBarListNames.HOME)
          navigate('/')
        }}
      />
      <BottomNavBarItem
        Icon={ICONS.OUTLINE.SEARCH}
        SelectedIcon={ICONS.SOLID.SEARCH}
        selected={selected === BottomNavBarListNames.SEARCH}
        onClick={() => {
          setSelected(BottomNavBarListNames.SEARCH)
          navigate('/search')
        }}
      />
      <BottomNavBarItem
        Icon={ICONS.OUTLINE.NOTIFICATIONS}
        SelectedIcon={ICONS.SOLID.NOTIFICATIONS}
        selected={selected === BottomNavBarListNames.NOTIFICATIONS}
        onClick={() => {
          setSelected(BottomNavBarListNames.NOTIFICATIONS)
          navigate('/notifications')
        }}
      />
      <BottomNavBarItem
        Icon={ICONS.OUTLINE.MAIL}
        SelectedIcon={ICONS.SOLID.MAIL}
        selected={selected === BottomNavBarListNames.MAIL}
        onClick={() => {
          setSelected(BottomNavBarListNames.MAIL)
          navigate('/mail')
        }}
      />
    </nav>
  )
}
