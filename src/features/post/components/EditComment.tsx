import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { useAuth } from '@/features/user/hooks/useAuth'
import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetCommentQuery, useUpdateCommentMutation } from '../api/commentApi'
import { Loading } from '@/components/Loading'

export const EditComment = () => {
  const id = useParams().id
  const { data: comment, isLoading, isError } = useGetCommentQuery(id || '')
  const { authUser } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [updateComment] = useUpdateCommentMutation()
  const navigate = useNavigate()

  const requiredError = 'This field is required'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0 && authUser && comment) {
      try {
        await updateComment({
          ...comment,
          type: 'text',
          content: data.content,
          userId: authUser.id,
        })
        navigate(`/post/${comment.postId}`)
      } catch (error) {
        console.error(error)
      }
    } else {
      console.error(errors)
    }
  }

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <>Error Loading Comment!</>
  }
  return (
    <form className='flex flex-col px-6 gap-2 py-4'>
      <Input
        {...register('content', { required: requiredError })}
        defaultValue={comment!.content}
        placeholder='Type something here...'
      />
      <ErrorMessage errors={errors} name='content' />

      <Button variant='primary' type='submit' onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </form>
  )
}
