import { SERVER_BASE_URL } from '@/types'
import {
  createApi,
  fakeBaseQuery,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react'
import { TFollow, TFollowWithoutIdAndDate } from '../types'
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from '@firebase/firestore'
import { db } from '@/utils/firebase'

const dataToTFollow = (data: any, id: string): TFollow => {
  return {
    followedId: data.followedId,
    followerId: data.followerId,
    createdAt: data.createdAt.toDate().getTime(),
    id,
  }
}

export const followApi = createApi({
  reducerPath: 'followApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createFollow: builder.mutation<TFollow, TFollowWithoutIdAndDate>({
      queryFn: async (follow, _api, _extraOptions, _baseQuery) => {
        let ret: TFollow
        try {
          const ref = await addDoc(collection(db, 'follows'), {
            followerId: follow.followerId,
            followedId: follow.followedId,
            createdAt: serverTimestamp(),
          })

          const docSnap = await getDoc(ref)

          ret = dataToTFollow(docSnap.data(), docSnap.id)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['User'],
    }),
    getFollow: builder.query<TFollow, string>({
      queryFn: async (followId, _api, _extraOptions, _baseQuery) => {
        let ret: TFollow
        try {
          const docSnap = await getDoc(doc(db, 'follows', followId))

          ret = dataToTFollow(docSnap.data(), docSnap.id)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
    }),
    getAllFollows: builder.query({
      queryFn: async (_arg, _api, _extraOptions, _baseQuery) => {
        let ret: TFollow[]
        try {
          const collectionSnap = await getDocs(collection(db, 'follows'))

          collectionSnap.docs.forEach((doc) => {
            ret.push(dataToTFollow(doc, doc.id))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['User'],
    }),
    getFollowersByUser: builder.query<TFollow[], string>({
      queryFn: async (userId, _api, _extraOptions, _baseQuery) => {
        let ret: TFollow[]
        try {
          const q = query(
            collection(db, 'follows'),
            where('followedId', '==', userId)
          )
          const collectionSnap = await getDocs(q)

          collectionSnap.docs.forEach((doc) => {
            ret.push(dataToTFollow(doc, doc.id))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['User'],
    }),
    getFollowedByUser: builder.query<TFollow[], string>({
      queryFn: async (userId, _api, _extraOptions, _baseQuery) => {
        let ret: TFollow[]
        try {
          const q = query(
            collection(db, 'follows'),
            where('followerId', '==', userId)
          )
          const collectionSnap = await getDocs(q)

          collectionSnap.docs.forEach((doc) => {
            ret.push(dataToTFollow(doc, doc.id))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['User'],
    }),
    deleteFollow: builder.mutation<any, string>({
      queryFn: async (followId, _api, _extraOptions, _baseQuery) => {
        try {
          await deleteDoc(doc(db, 'follows', followId))
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: {} }
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useCreateFollowMutation,
  useGetFollowQuery,
  useGetAllFollowsQuery,
  useGetFollowersByUserQuery,
  useGetFollowedByUserQuery,
  useDeleteFollowMutation,
} = followApi
