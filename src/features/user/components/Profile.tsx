import { Avatar } from '@/components/Avatar'
import { Button } from '@/components/Button'
import { IconButton } from '@/components/IconButton'
import { useGetPostsByUserIdQuery } from '@/features/post/api/postApi'
import { ItemList } from '@/features/post/components'
import { ICONS } from '@/types'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
import {
  useCreateFollowMutation,
  useDeleteFollowMutation,
  useGetFollowedByUserQuery,
  useGetFollowersByUserQuery,
} from '../api/followApi'
import { useGetProfileQuery } from '../api/userApi'
import { useAuth } from '../hooks/useAuth'
import { hasUserFollowed } from '../../../utils'
import { Loading } from '@/components/Loading'

export const Profile = () => {
  const id = useParams().id || ''
  const { data: profile, isLoading, isError } = useGetProfileQuery(id)
  const { data: posts } = useGetPostsByUserIdQuery(id)
  const { data: followers } = useGetFollowersByUserQuery(id)
  const { data: followed } = useGetFollowedByUserQuery(id)
  const [createFollow] = useCreateFollowMutation()
  const [deleteFollow] = useDeleteFollowMutation()
  const { authUser } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    return <>Error Loading!</>
  }

  const handleFollow = async () => {
    if (
      authUser &&
      profile &&
      (!followers || !hasUserFollowed(authUser.id, followers))
    ) {
      await createFollow({
        followerId: authUser?.id,
        followedId: profile.id,
      })
    } else {
      if (followers) {
        const follow = followers.find((follow) => follow.followedId)
        follow && (await deleteFollow(follow.id))
      }
    }
  }

  return (
    <>
      <div className='flex flex-col px-6 gap-2 md:mt-16'>
        <div className='flex justify-between items-center'>
          <Avatar avatar={profile!.avatar} className='w-[60px] h-[60px]' />
          <ul>
            <li>
              {profile!.id !== authUser?.id ? (
                authUser &&
                followers &&
                hasUserFollowed(authUser.id, followers) ? (
                  <Button variant='secondary' onClick={handleFollow}>
                    Followed
                  </Button>
                ) : (
                  <Button variant='primary' onClick={handleFollow}>
                    Follow
                  </Button>
                )
              ) : (
                <Button
                  variant='secondary'
                  onClick={() => navigate('/profile/edit')}
                >
                  Edit Profile
                </Button>
              )}
            </li>
          </ul>
        </div>
        <div className='flex flex-col gap-2'>
          <h1 className=' font-bold text-lg'>{profile!.username}</h1>
          <p>{profile!.bio || ''}</p>
          <div className='flex gap-2 items-center'>
            <IconButton
              Icon={ICONS.OUTLINE.DATE}
              SelectedIcon={ICONS.SOLID.DATE}
              iconStyle='w-[20px] h-[20px] '
              selectedIconStyle='w-[20px] h-[20px]'
            />
            <span className='text-sm leading-normal'>
              Joined {moment(new Date(profile!.createdAt)).format('MMMM YYYY')}
            </span>
          </div>
          <div className='flex gap-2 text-sm'>
            <span>{(followed && followed.length) || 0} Following</span>
            <span>{(followers && followers.length) || 0} Followers</span>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        {posts && posts.length > 0 ? (
          <ItemList
            className={`grid h-full`}
            items={posts}
            placeholder='Nothing to see here'
            itemClassName='pointer-events-auto cursor-pointer pt-4 px-2'
          />
        ) : (
          <div className='w-full flex justify-center'>Nothing to see here</div>
        )}
      </div>
    </>
  )
}
