import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/features/user/hooks/useAuth'
import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetPostQuery, useUpdatePostMutation } from '../api/postApi'
import { Loading } from '@/components/Loading'

export const EditPost = () => {
  const id = useParams().id
  const { data: post, isLoading, isError } = useGetPostQuery(id || '')

  const { authUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [updatePost] = useUpdatePostMutation()
  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <>Error Loading Post!</>
  }

  const requiredError = 'This field is required'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0 && authUser && post) {
      try {
        await updatePost({
          ...post,
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
    <form className='flex flex-col px-6 gap-2 py-4'>
      <Input
        {...register('content', { required: requiredError })}
        defaultValue={post!.content}
        placeholder='Type something here...'
      />
      <ErrorMessage errors={errors} name='content' />

      <Button variant='primary' type='submit' onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </form>
  )
}
