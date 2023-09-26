import { db } from '@/utils/firebase'
import {
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@firebase/firestore'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { TLike, TLikeWithoutIdAndDate } from '../types'

const firestoreToTLike = (docSnap: DocumentSnapshot): TLike => {
  const data = docSnap.data()
  return {
    id: docSnap.ref.id,
    referenceId: data?.referenceId,
    type: data?.type,
    createdAt: data?.createdAt.seconds * 1000,
    userId: data?.userId,
  }
}

export const likeApi = createApi({
  reducerPath: 'likeApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Like'],
  endpoints: (builder) => ({
    createLike: builder.mutation<TLike, TLikeWithoutIdAndDate>({
      queryFn: async (like, _api, _options, _baseQuery) => {
        let ret: TLike
        try {
          const docRef = await addDoc(collection(db, 'likes'), {
            referenceId: like.referenceId,
            type: like.type,
            userId: like.userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          const likeSnap = await getDoc(docRef)

          ret = firestoreToTLike(likeSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['Like'],
    }),
    getLike: builder.query<TLike, any>({
      queryFn: async (likeId, _api, _options, _baseQuery) => {
        let ret: TLike
        try {
          const likeSnap = await getDoc(doc(db, 'likes', likeId))

          ret = firestoreToTLike(likeSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Like'],
    }),
    getAllLikes: builder.query<TLike[], any>({
      queryFn: async (_arg, _api, _options, _baseQuery) => {
        let ret: TLike[] = []
        try {
          const likeSnap = await getDocs(collection(db, 'likes'))

          likeSnap.docs.forEach((l) => {
            ret.push(firestoreToTLike(l))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Like'],
    }),
    getLikesByUserId: builder.query<TLike[], string>({
      queryFn: async (userId, _api, _options, _baseQuery) => {
        let ret: TLike[] = []
        try {
          const q = query(
            collection(db, 'likes'),
            where('userId', '==', userId)
          )
          const likeSnap = await getDocs(q)

          likeSnap.docs.forEach((l) => {
            ret.push(firestoreToTLike(l))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Like'],
    }),
    getLikesByReference: builder.query<TLike[], string>({
      queryFn: async (referenceId, _api, _options, _baseQuery) => {
        let ret: TLike[] = []
        try {
          const q = query(
            collection(db, 'likes'),
            where('referenceId', '==', referenceId)
          )
          const likeSnap = await getDocs(q)

          likeSnap.docs.forEach((l) => {
            ret.push(firestoreToTLike(l))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Like'],
    }),
    updateLike: builder.mutation<TLike, TLike>({
      queryFn: async (like, _api, _options, _baseQuery) => {
        let ret: TLike
        try {
          const d = await getDoc(doc(db, 'likes', like.id))

          await updateDoc(d.ref, {
            referenceId: like.referenceId,
            type: like.type,
            userId: like.userId,
            updatedAt: serverTimestamp(),
          })
          const likeSnap = await getDoc(d.ref)

          ret = firestoreToTLike(likeSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['Like'],
    }),
    deleteLike: builder.mutation<any, string>({
      queryFn: async (likeId, _api, _options, _baseQuery) => {
        try {
          await deleteDoc(doc(db, 'likes', likeId))
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: {} }
        }
      },
      invalidatesTags: ['Like'],
    }),
  }),
})

export const {
  useCreateLikeMutation,
  useGetLikeQuery,
  useGetAllLikesQuery,
  useGetLikesByUserIdQuery,
  useGetLikesByReferenceQuery,
  useUpdateLikeMutation,
  useDeleteLikeMutation,
} = likeApi
