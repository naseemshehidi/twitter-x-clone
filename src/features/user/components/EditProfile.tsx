import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import moment from 'moment'
import { useSelector } from 'react-redux'
import { ErrorMessage } from '@hookform/error-message'
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/stores/store'
import { useGetProfileQuery, useUpdateProfileMutation } from '../api/userApi'
import { TUser } from '../types'
import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '../hooks/useAuth'
import { Loading } from '@/components/Loading'

export const EditProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { authUser } = useAuth()
  const navigate = useNavigate()
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileQuery(authUser ? authUser.id : '')

  const [updateProfile] = useUpdateProfileMutation()
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <>Error Loading!</>
  }

  const requiredError = 'This Field is required!'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0) {
      const req: TUser = {
        id: profile!.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.dateOfBirth,
        password: data.password,
        avatar: data.avatar,
        createdAt: profile!.createdAt,
        updatedAt: profile!.updatedAt,
      }
      try {
        await updateProfile(req).unwrap()
        authUser && navigate(`/profile/${authUser.id}`)
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <div className='flex flex-col px-6 gap-6 md:mt-16'>
      <div className='flex gap-4 items-center'>
        <Avatar avatar={profile!.avatar} className='w-[100px] h-[100px]' />
      </div>
      <form className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <label htmlFor='username' className='text-xs text-text-primary'>
            Username:
          </label>
          <Input
            {...register('username', { required: requiredError })}
            placeholder='Username'
            defaultValue={profile!.username}
          />
          <ErrorMessage errors={errors} name='username' />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='email' className='text-xs text-text-primary'>
            Email:
          </label>
          <Input
            {...register('email', { required: requiredError })}
            placeholder='Email'
            defaultValue={profile!.email}
          />
          <ErrorMessage errors={errors} name='email' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='firstName' className='text-xs text-text-primary'>
            First Name:
          </label>
          <Input
            {...register('firstName', { required: requiredError })}
            placeholder='First Name'
            defaultValue={profile!.firstName}
          />
          <ErrorMessage errors={errors} name='firstName' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='lastName' className='text-xs text-text-primary'>
            Last Name:
          </label>
          <Input
            {...register('lastName', { required: requiredError })}
            placeholder='Last Name'
            defaultValue={profile!.lastName}
          />
          <ErrorMessage errors={errors} name='lastName' />
        </div>
        <div className='flex flex-col'>
          <label htmlFor='dateOfBirth' className='text-xs text-text-primary'>
            Date of Birth:
          </label>
          <Input
            {...register('dateOfBirth', { required: requiredError })}
            type='date'
            id='dateOfBirth'
            defaultValue={moment(profile!.birthDate).format('YYYY-MM-DD')}
          />
          <ErrorMessage errors={errors} name='dateOfBirth' />
        </div>
        <label htmlFor='dateOfBirth' className='text-xs text-text-primary'>
          Change Avatar
        </label>
        <Input
          {...register('avatar', { required: false })}
          placeholder='Avatar'
          type='file'
        />

        <label htmlFor='password' className='text-xs text-text-primary mt-6'>
          Enter your password:
        </label>
        <Input
          {...register('password', { required: requiredError })}
          type='password'
          placeholder='password'
        />
        <ErrorMessage errors={errors} name='password' />
        <Button
          variant='primary'
          type='submit'
          onClick={handleSubmit(onSubmit)}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}
