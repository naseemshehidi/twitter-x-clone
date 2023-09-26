// use this to create a new Post and let the database deal with the ID and date
export type TPostWithoutIdAndDate = {
  content: string
  userId: string
  type: 'text' | 'image' | 'video'
}

export type TPost = TPostWithoutIdAndDate & {
  id: string
  createdAt: number
  updatedAt: number
}

export type TCommentWithoutIdAndDate = {
  content: string
  userId: string
  type: 'text' | 'image' | 'video'
  postId: string
}

export type TComment = TCommentWithoutIdAndDate & {
  id: string
  createdAt: number
  updatedAt: number
}

export type TLikeWithoutIdAndDate = {
  type: 'Post' | 'Comment'
  referenceId: string
  userId: string
}

export type TLike = TLikeWithoutIdAndDate & {
  id: string
  createdAt: number
}



export type ItemType = TPost | TComment