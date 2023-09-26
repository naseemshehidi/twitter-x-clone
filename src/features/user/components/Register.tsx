import React, { useState } from 'react'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useRegisterMutation } from '../api/userApi'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { TUserWithoutIdAndDate } from '../types'
import { userReceived } from '../api/authUserSlice'
import { ErrorMessage } from '@hookform/error-message'
import { NavBar } from '@/components/NavBar'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { useScreenSize } from '@/hooks/useScreenSize'
import { CenteredContainer } from '@/components/CenteredContainer'

export const Register = () => {
  const [step, setStep] = useState(1)
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm()
  const [registerUser] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const requiredError = 'This field is required'
  const matchError = 'Fields do not match'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0) {
      if (step !== 3) {
        nextStep()
      } else {
        const user: TUserWithoutIdAndDate = {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          birthDate: new Date(data.birth).getTime(),
          avatar: data.avatar,
          bio: '',
        }
        try {
          const result = await registerUser(user).unwrap()
          dispatch(userReceived(result))
          navigate('/')
        } catch (error) {
          console.error(error)
        }
      }
    }
  }
  const previousStep = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1)
    }
  }

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1)
  }

  const screenSize = useScreenSize()

  const PARENT = screenSize === 'SM' ? React.Fragment : CenteredContainer

  return (
    <PARENT>
      <NavBar variant='details' />
      <div className='flex flex-col px-6 py-4 gap-12 mt-16'>
        <div className='flex flex-col gap-2'>
          <h1 className='font-bold text-2xl'>Create Account</h1>
          <p className='text-lg'>Connect with your friends today!</p>
        </div>
        <form className='flex flex-col gap-2'>
          {step === 1 && (
            <>
              <Input
                {...register('username', { required: requiredError })}
                placeholder='Username'
              />
              <ErrorMessage errors={errors} name='username' />
              <Input
                {...register('firstName', { required: requiredError })}
                placeholder='First Name'
              />
              <ErrorMessage errors={errors} name='firstName' />
              <Input
                {...register('lastName', { required: requiredError })}
                placeholder='Last Name'
              />
              <ErrorMessage errors={errors} name='lastName' />
              <Input
                {...register('birth', { required: requiredError })}
                type='date'
                id='birth'
              />
              <ErrorMessage errors={errors} name='birth' />
            </>
          )}
          {step === 2 && (
            <>
              <Input
                {...register('email', { required: requiredError })}
                placeholder='Email'
              />
              <ErrorMessage errors={errors} name='email' />
              <Input
                {...register('confirmEmail', {
                  required: requiredError,
                  validate: {
                    value: (value) =>
                      value === getValues('email') || matchError,
                  },
                })}
                placeholder='Confirm Email'
              />
              <ErrorMessage errors={errors} name='confirmEmail' />
              <Input
                {...register('password', { required: requiredError })}
                type='password'
                placeholder='password'
              />
              <ErrorMessage errors={errors} name='password' />
            </>
          )}
          {step === 3 && (
            <Input
              {...register('avatar', { required: false })}
              placeholder='Avatar'
              type='file'
            />
          )}

          <Button
            type='submit'
            variant='primary'
            onClick={handleSubmit(onSubmit)}
          >
            {step !== 3 ? 'Next' : 'Submit'}
          </Button>

          {step !== 1 && (
            <Button type='button' variant='secondary' onClick={previousStep}>
              Back
            </Button>
          )}
        </form>
        <div>
          <p>
            Already have an account ?{' '}
            <Link to={'/login'} className='text-primary-main'>
              Log in
            </Link>
          </p>
        </div>
      </div>
    </PARENT>
  )
}
