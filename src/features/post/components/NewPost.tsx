import { RootState } from '@/stores/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { useCreatePostMutation } from '../api/postApi'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Avatar } from '@/components/Avatar'
import { TextArea } from '@/components/TextArea'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '@/components/Button'
import { useAuth } from '@/features/user/hooks/useAuth'

export const NewPost = () => {
  const { authUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [createPost] = useCreatePostMutation()
  const navigate = useNavigate()

  const requiredError = 'This field is required'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0 && authUser) {
      try {
        await createPost({
          type: 'text',
          content: data.content,
          userId: authUser.id,
        })
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error(errors)
    }
  }
  return (
    <>
      {authUser ? (
        <div className=' py-2 md:mt-16'>
          <div className='flex items-center gap-2 px-6'>
            <Avatar avatar={authUser.avatar as string} />
            <Link
              to={`/profile/${authUser.id}`}
              onClick={(e) => e.stopPropagation()}
              className='font-bold text-text-primary hover:underline'
            >
              {authUser.username}
            </Link>
          </div>
          <form className='flex flex-col px-6 gap-2 '>
            <TextArea
              {...register('content', { required: requiredError })}
              placeholder='Type something here...'
              rows={4}
            />
            <ErrorMessage errors={errors} name='content' />

            <Button
              variant='primary'
              type='submit'
              onClick={handleSubmit(onSubmit)}
              className={'md:w-[200px] md:self-end'}
            >
              Submit
            </Button>
          </form>
        </div>
      ) : (
        <>{'Not Logged In!'}</>
      )}
    </>
  )
}
