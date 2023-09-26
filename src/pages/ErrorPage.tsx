import { Link } from 'react-router-dom'

export const ErrorPage = () => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <h1>Oops!</h1>
      <p>Sorry there is nothing here!</p>
      <Link to='/' className='text-primary-main'>
        Go Home
      </Link>
    </div>
  )
}
