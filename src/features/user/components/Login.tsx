import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { NavBar } from '@/components/NavBar'
import { ErrorMessage } from '@hookform/error-message'
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { userReceived } from '../api/authUserSlice'
import { useLoginMutation } from '../api/userApi'
import { CenteredContainer } from '@/components/CenteredContainer'
import { useScreenSize } from '@/hooks/useScreenSize'
import { SCREENS } from '@/types'

export interface LoginProps extends React.ComponentPropsWithoutRef<'div'> {}

export const Login = (props: LoginProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  const [login] = useLoginMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const screenSize = useScreenSize()

  const PARENT = screenSize === 'SM' ? React.Fragment : CenteredContainer

  const requiredError = 'This field is required'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0) {
      const user = {
        email: data.email as string,
        password: data.password as string,
      }
      try {
        const result = await login(user).unwrap()
        dispatch(userReceived(result))
        // localStorage.setItem("currentUser", JSON.stringify(result));
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  }
  return (
    <PARENT>
      <NavBar variant='details' />
      <div className='flex flex-col px-6 py-4 gap-12 mt-16'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-2xl'>Welcome Back!</h1>
          <p className='text-lg'>Log in to your account</p>
        </div>
        <form className='flex flex-col px-6 gap-2 py-4'>
          <Input
            {...register('email', { required: requiredError })}
            placeholder='Email'
          />
          <ErrorMessage errors={errors} name='email' />
          <Input
            {...register('password', { required: requiredError })}
            type='password'
            placeholder='password'
          />
          <ErrorMessage errors={errors} name='password' />

          <Button
            type='submit'
            variant='primary'
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
        </form>
        <div>
          <p>
            Don{"'"}t have an account ?{' '}
            <Link to={'/register'} className='text-primary-main'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </PARENT>
  )
}
