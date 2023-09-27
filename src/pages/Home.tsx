import { BottomActionDialog } from '@/components/BottomActionDialog'
import { BottomNavBar } from '@/components/BottomNavBar'
import { FloatingButton } from '@/components/FloatingButton'
import { NavBar, NavBarVariants } from '@/components/NavBar'
import { RightBar } from '@/features/suggestion/components/RightBar'
import { SideBar } from '@/components/SideBar'
import { SideDrawer } from '@/components/SideDrawer'
import { useAuth } from '@/features/user/hooks/useAuth'
import { useScreenSize } from '@/hooks/useScreenSize'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const Home = () => {
  const [navBarVariant, setNavBarVariant] = useState<NavBarVariants>('main')
  const [showFloatingButton, setShowFloatingButton] = useState(false)
  const [showSideDrawer, setShowSideDrawer] = useState(false)
  const [showBottomActionDialog, setShowBottomActionDialog] = useState(false)

  const { authUser } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  const screenSize = useScreenSize()

  const toggleSideDrawer = () => {
    setShowSideDrawer(!showSideDrawer)
    setShowFloatingButton(showSideDrawer)
  }

  useEffect(() => {
    setShowFloatingButton(!showBottomActionDialog)
  }, [showBottomActionDialog])

  useEffect(() => {
    if (location.pathname === '/') {
      setNavBarVariant('main')
      setShowFloatingButton(true)
    } else {
      setNavBarVariant('details')
      setShowFloatingButton(false)
    }
  }, [location.pathname])

  return (
    <>
      {authUser ? (
        <div className='md:fixed md:overflow-auto top-0 bottom-0 left-0 right-0 '>
          <div className=' min-h-full max-w-7xl flex flex-col md:flex-row md:mx-auto'>
            {screenSize === 'SM' && (
              <NavBar
                onStartClick={toggleSideDrawer}
                variant={navBarVariant}
                avatar={authUser.avatar as string}
              />
            )}
            {screenSize !== 'SM' && <SideBar />}
            <main className='max-w-[600px] flex-1 mt-16 mb-16 md:mb-0 md:mt-0 md:border-r'>
              <Outlet />
            </main>
            {screenSize !== 'SM' && screenSize !== 'MD' && <RightBar />}

            {screenSize === 'SM' && <BottomNavBar />}
            {screenSize === 'SM' && showFloatingButton && (
              <FloatingButton
                className='fixed bottom-[90px] right-8 z-50 shadow-xl'
                onClick={() => navigate('/post/new')}
              ></FloatingButton>
            )}
            {showSideDrawer && <SideDrawer toggle={toggleSideDrawer} />}
            {showBottomActionDialog && <BottomActionDialog />}
          </div>
        </div>
      ) : (
        'Not Logged In'
      )}
    </>
  )
}
