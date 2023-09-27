import { RootState } from '@/stores/store'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { useGetPostQuery } from '../api/postApi'
import {
  useCreateCommentMutation,
  useGetCommentsByPostIdQuery,
} from '../api/commentApi'
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikesByReferenceQuery,
} from '../api/likeApi'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { Avatar } from '@/components/Avatar'
import moment from 'moment'
import { IconButton } from '@/components/IconButton'
import { ICONS } from '@/types'
import { Input } from '@/components/Input'
import { ErrorMessage } from '@hookform/error-message'
import { Button } from '@/components/Button'
import { ItemList } from './ItemList'
import { useAuth } from '@/features/user/hooks/useAuth'
import { useGetProfileQuery } from '@/features/user/api/userApi'
import { Loading } from '@/components/Loading'

export const PostDetails = () => {
  const id = useParams().id
  const { authUser } = useAuth()
  const { data: post, isLoading, isError } = useGetPostQuery(id || '')
  const { data: comments, isSuccess: isCommentsSuccess } =
    useGetCommentsByPostIdQuery(id as string)
  const { data: likes, isSuccess: isLikesSuccess } =
    useGetLikesByReferenceQuery(id as string)

  const [createComment] = useCreateCommentMutation()
  const [createLike] = useCreateLikeMutation()
  const [deleteLike] = useDeleteLikeMutation()

  const { data: author } = useGetProfileQuery(post?.userId as string)

  const hasUserLiked = useCallback(
    (userId: string) => {
      if (likes && likes.length > 0) {
        return likes.some((like) => like.userId === userId)
      }
    },
    [likes]
  )

  const handleLike = async () => {
    if (post && authUser && (!likes || !hasUserLiked(authUser.id))) {
      await createLike({
        type: 'Post',
        referenceId: post.id,
        userId: authUser.id,
      })
    } else if (likes) {
      const like = likes.find((like) => like.id)
      like && (await deleteLike(like.id))
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm()

  const requiredError = 'This field is required'

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (Object.keys(errors).length === 0 && authUser && id) {
      try {
        await createComment({
          type: 'text',
          content: data.comment,
          postId: id,
          userId: authUser.id,
        })
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
    return <>Error Loading Post!</>
  }

  return (
    <>
      <div className='flex flex-col pt-2 px-2 md:px-0 md:mt-16'>
        <div className='flex gap-2 items-center mb-2 md:px-2'>
          <div className='shrink-0'>
            <Link to={`/profile/${post?.userId}`}>
              <Avatar avatar={author?.avatar as string} className='w-12 h-12' />
            </Link>
          </div>
          <Link
            to={`/profile/${post?.userId}`}
            className='font-bold text-text-primary hover:underline'
          >
            {author ? author.username : ''}
          </Link>
        </div>
        <div className='md:px-2'>
          <p className='break-all'>{post?.content}</p>
        </div>
        <span className='text-text-secondary text-sm mt-4 mb-2 md:px-2'>
          {moment(post?.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
        </span>
        <hr />
        <div className='flex gap-2 py-4 md:px-2'>
          {isCommentsSuccess && (
            <div className='flex gap-1 items-center'>
              <span className='text-text-primary font-medium text-sm'>
                {comments ? comments.length : 0}
              </span>
              <span className='text-text-primary font-light text-sm'>
                {'Comments'}
              </span>
            </div>
          )}
          {isLikesSuccess && (
            <div className='flex gap-1 items-center'>
              <span className='text-text-primary font-medium text-sm'>
                {likes ? likes.length : 0}
              </span>
              <span className='text-text-primary font-light text-sm'>
                {'Likes'}
              </span>
            </div>
          )}
        </div>
        <hr />
        <div className='flex items-center gap-6 py-2 md:px-2'>
          {isLikesSuccess && (
            <IconButton
              Icon={ICONS.OUTLINE.LIKE}
              SelectedIcon={ICONS.SOLID.LIKE}
              onClick={handleLike}
              selected={hasUserLiked(authUser!.id) || false}
              className='w-[25px] h-[25px]'
            />
          )}

          <IconButton
            Icon={ICONS.OUTLINE.COMMENT}
            SelectedIcon={ICONS.SOLID.COMMENT}
            onClick={() => setFocus('comment')}
            className='w-[25px] h-[25px]'
          />
        </div>
        <hr />
        <div className='py-4'>
          <form className='flex gap-2 md:px-2'>
            <Avatar
              className='shrink-0 w-12 h-12'
              avatar={authUser?.avatar as string}
            />
            <Input
              {...register('comment', { required: requiredError })}
              type='text'
              placeholder='Add a comment!'
              className='shrink-1 flex-1 min-w-0 outline-none active:outline-none'
            />
            {/*             <ErrorMessage errors={errors} name='comment' />
             */}
            <Button
              variant='primary'
              type='submit'
              onClick={handleSubmit(onSubmit)}
            >
              Reply
            </Button>
          </form>
        </div>
        <hr />

        {isCommentsSuccess && (
          <ItemList
            className='grid overflow-auto'
            items={comments}
            placeholder='No Comments Yet...'
            itemClassName='pointer-events-auto cursor-pointer pt-4 px-2 flex-0'
          />
        )}
      </div>
    </>
  )
}
