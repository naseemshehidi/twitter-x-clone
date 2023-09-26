import { Button } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { useNavigate } from 'react-router-dom'

export const Landing = () => {
  const navigate = useNavigate()
  return (
    <div className='md:h-full px-4 py-4 flex flex-col  gap-8 md:flex-row items-center justify-center'>
      <header>
        <Logo />
      </header>
      <main className='flex flex-col gap-4'>
        <h1 className='text-5xl font-bold'>Happening now</h1>
        <h2 className='text-2xl '>Join today.</h2>

        <div className='flex items-center justify-center md:w-[300px]'>
          <Button
            variant='primary'
            onClick={() => navigate('/register')}
            className='w-full'
          >
            Create account
          </Button>
        </div>

        <h3 className='text-lg'>Already have an account?</h3>
        <div className='flex items-center justify-center md:w-[300px]'>
          <Button
            variant='secondary'
            onClick={() => navigate('/login')}
            className='w-full'
          >
            Sign in
          </Button>
        </div>
      </main>

      <footer className='absolute bottom-10 right-0 left-0 px-4'>
        <ul className='flex flex-wrap justify-center gap-2 '>
          <a href='#'>
            <li className='text-xs text-text-secondary hover:underline'>
              About
            </li>
          </a>
          <a href='#'>
            <li className='text-xs text-text-secondary hover:underline'>
              Privacy policy
            </li>
          </a>
          <a href='#'>
            <li className='text-xs text-text-secondary hover:underline'>
              Terms of service
            </li>
          </a>
          <a href='#'>
            <li className='text-xs text-text-secondary hover:underline'>
              Cookie policy
            </li>
          </a>
          <a href='#'>
            <li className='text-xs text-text-secondary hover:underline'>
              Advertising
            </li>
          </a>
        </ul>
      </footer>
    </div>
  )
}
