import { Avatar } from '@/components/Avatar'
import { IconButton } from '@/components/IconButton'
import { useGetProfileQuery } from '@/features/user/api/userApi'
import { useAuth } from '@/features/user/hooks/useAuth'
import { ICONS } from '@/types'
import moment from 'moment'
import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGetCommentsByPostIdQuery } from '../api/commentApi'
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikesByReferenceQuery,
} from '../api/likeApi'
import { ItemType } from '../types'
import { twMerge } from 'tailwind-merge'
import { Popover, PopoverItem } from '@/components/Popover'
import { Unavailable } from '@/components/Unavailable'
import { MoreMenu } from '@/components/MoreMenu'

interface ItemProps extends React.ComponentPropsWithoutRef<'article'> {
  item: ItemType
  className?: string
}

export const Item = ({ item, className = '' }: ItemProps) => {
  const { authUser } = useAuth()

  const { data: comments } = useGetCommentsByPostIdQuery(item.id)
  const { data: likes, isSuccess: isLikesSuccess } =
    useGetLikesByReferenceQuery(item.id)

  const { data: author } = useGetProfileQuery(item.userId)

  const [createLike] = useCreateLikeMutation()
  const [deleteLike] = useDeleteLikeMutation()

  const hasUserLiked = useCallback(
    (userId: string) => {
      if (likes && likes.length > 0) {
        return likes.some((like) => like.userId === userId)
      }
    },
    [likes]
  )

  const handleLike = async () => {
    if (authUser && (!likes || !hasUserLiked(authUser.id))) {
      await createLike({
        type: 'postId' in item ? 'Comment' : 'Post',
        referenceId: item.id,
        userId: authUser.id,
      })
    } else if (likes) {
      const like = likes.find((like) => like.id)
      like && (await deleteLike(like.id))
    }
  }

  const navigate = useNavigate()

  return (
    <>
      <article
        className={twMerge(
          `flex gap-2 bg-bg-primary md:hover:bg-hover-primary active:bg-hover-primary `,
          className
        )}
        onClick={
          'postId' in item ? undefined : () => navigate(`/post/${item.id}`)
        }
      >
        <div className='shrink-0'>
          <Link
            to={`/profile/${item.userId}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Avatar avatar={author?.avatar as string} className='w-12 h-12' />
          </Link>
        </div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-2 items-center '>
            <Link
              to={`/profile/${item.userId}`}
              onClick={(e) => e.stopPropagation()}
              className='font-bold text-text-primary hover:underline'
            >
              {author ? author.username : ''}
            </Link>
            <span className='text-text-secondary text-xs'>
              {moment(item.createdAt).fromNow()}
            </span>

            <div className='flex-1 flex justify-end'>
              <MoreMenu
                items={[
                  {
                    title: 'Not interested in this subject',
                    Icon: ICONS.OUTLINE.CANCEL,
                  },
                  {
                    title: 'Not interested in this Post',
                    Icon: ICONS.OUTLINE.SAD_FACE,
                  },
                  {
                    title: `Follow @${author?.username}`,
                    Icon: ICONS.OUTLINE.ADD_USER,
                  },
                  {
                    title: `Add/Remove @${author?.username} from Lists`,
                    Icon: ICONS.OUTLINE.LISTS,
                  },
                  {
                    title: `Mute @${author?.username}`,
                    Icon: ICONS.OUTLINE.MUTE,
                  },
                  {
                    title: `Block @${author?.username}`,
                    Icon: ICONS.OUTLINE.BLOCK,
                  },
                  {
                    title: 'View post engagement',
                    Icon: ICONS.OUTLINE.STATS,
                  },
                  {
                    title: 'Embed post',
                    Icon: ICONS.OUTLINE.EMBED,
                  },
                  {
                    title: `Report @${author?.username}`,
                    Icon: ICONS.OUTLINE.REPORT,
                  },
                ]}
              />
            </div>
          </div>
          <p className='break-all'>{item.content}</p>
          <div className='flex items-center ml-[-5px]'>
            {isLikesSuccess && (
              <>
                <IconButton
                  Icon={ICONS.OUTLINE.LIKE}
                  SelectedIcon={ICONS.SOLID.LIKE}
                  iconStyle='w-[18px] h-[18px]'
                  selectedIconStyle='w-[18px] h-[18px]'
                  onClick={handleLike}
                  selected={hasUserLiked(authUser!.id)}
                />
                <span className='text-text-secondary text-xs mr-2'>
                  {likes && likes.length}
                </span>
              </>
            )}

            {'postId' in item || (
              <>
                <IconButton
                  Icon={ICONS.OUTLINE.COMMENT}
                  SelectedIcon={ICONS.SOLID.COMMENT}
                  iconStyle='w-[20px] h-[20px]'
                  selectedIconStyle='w-[20px] h-[20px]'
                  onClick={() => {
                    navigate(`/post/${item.id}`)
                  }}
                  selected={false}
                />
                <span className='text-text-secondary text-xs'>
                  {comments && comments.length}
                </span>
              </>
            )}
          </div>
        </div>
      </article>
      <hr />
    </>
  )
}
