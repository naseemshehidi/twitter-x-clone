import { SCREENS, SCREEN_VARIANTS } from '@/types'
import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'

export const useScreenSize = (): SCREEN_VARIANTS => {
  const [size, setSize] = useState<SCREEN_VARIANTS>('SM')

  const isSmallScreen = useMediaQuery({
    query: `(max-width: ${SCREENS.MD})`,
  })

  const isMediumScreen = useMediaQuery({
    query: `(min-width: ${SCREENS.MD}) and (max-width: ${SCREENS.LG})`,
  })

  const isLargeScreen = useMediaQuery({
    query: `(min-width: ${SCREENS.LG}) and (max-width: ${SCREENS.XL})`,
  })

  const isExtraLargeScreen = useMediaQuery({
    query: `(min-width: ${SCREENS.XL})`,
  })

  useEffect(() => {
    if (isSmallScreen) {
      setSize('SM')
    } else if (isMediumScreen) {
      setSize('MD')
    } else if (isLargeScreen) {
      setSize('LG')
    } else if (isExtraLargeScreen) {
      setSize('XL')
    }
  }, [isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen])

  return size
}
