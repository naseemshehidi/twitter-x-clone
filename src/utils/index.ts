import { TLike } from '@/features/post/types'
import { TFollow } from '../features/user/types'

export const hasUserFollowed = (userId: string, followers: TFollow[]) => {
  if (followers && followers.length > 0) {
    return followers.some((follow) => follow.follower.id === userId)
  }

  return false
}


