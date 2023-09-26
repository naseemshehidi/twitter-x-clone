export type TUserWithoutIdAndDate = {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  birthDate: number // milliseconds
  avatar?: string | File[]
  bio?: string
}

export type TUser = TUserWithoutIdAndDate & {
  id: string
  createdAt: number
  updatedAt: number
  token?: string
}

export type TProfile = {
  id: string
  username: string
  email: string
  firstName: string
  lastName: string
  birthDate: number
  avatar?: string
  bio?: string
  createdAt: number
  updatedAt: number
}

export type TFollowWithoutIdAndDate = {
  followerId: string
  followedId: string
}

export type TFollow = TFollowWithoutIdAndDate & {
  id: string
  createdAt: number
}
