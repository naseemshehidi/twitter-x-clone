import React from 'react'
import { Link } from 'react-router-dom'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'

export interface LogoProps extends React.ComponentPropsWithoutRef<'div'> {
  className?: string
  fill?: string
  svgStyle?: string
}

export const Logo = ({
  className = '',
  fill = '',
  svgStyle = '',
}: LogoProps) => {
  const twConfig = resolveConfig(tailwindConfig) as any

  return (
    <div className={className}>
      <Link to='/'>
        <svg
          width='93.07239262413788'
          viewBox='0.8905462622642517 -35.20000076293945 32.418636322021484 35.25'
          height='101.20104000000002'
          className={svgStyle}
        >
          <path
            d='M17.1-25L21.05-33.65Q21.65-35.15 27.3-35.15L27.3-35.15Q28.75-35.15 30.88-34.93 33-34.7 33-34.5L33-34.5 24.5-17.2 33.3-0.65Q33.45-0.4 31.15-0.18 28.85 0.05 27.25 0.05L27.25 0.05Q20.9 0.05 20.3-1.65L20.3-1.65 16.55-11.2 13.15-1.35Q12.65 0.05 6.75 0.05L6.75 0.05Q5.3 0.05 3.15-0.15 1-0.35 1.2-0.7L1.2-0.7 9-18 0.9-34.5Q0.75-34.75 2.98-34.98 5.2-35.2 6.75-35.2L6.75-35.2Q13.05-35.2 13.65-33.4L13.65-33.4 17.1-25Z'
            opacity='1'
            transform='matrix(1,0,0,1,0,0)'
            fill={fill || twConfig.theme.colors.primary.main}
          />
        </svg>
      </Link>
    </div>
  )
}
