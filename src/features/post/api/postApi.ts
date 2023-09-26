import { db } from '@/utils/firebase'
import {
  DocumentSnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from '@firebase/firestore'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { TPost, TPostWithoutIdAndDate } from '../types'

function firestoreToTPost(docSnap: DocumentSnapshot): TPost {
  const data = docSnap.data()
  const post: TPost = {
    id: docSnap.id,
    type: data?.type,
    content: data?.content,
    userId: data?.userId,
    createdAt: data?.createdAt.seconds * 1000,
    updatedAt: data?.updatedAt.seconds * 1000,
  }
  return post
}

export const postApi = createApi({
  reducerPath: 'postApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    createPost: builder.mutation<TPost, TPostWithoutIdAndDate>({
      queryFn: async (post, _api, _options, _baseQuery) => {
        let ret: TPost
        try {
          const docRef = await addDoc(collection(db, 'posts'), {
            content: post.content,
            type: post.type,
            userId: post.userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          const postSnap = await getDoc(docRef)

          ret = firestoreToTPost(postSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['Post'],
    }),
    getPost: builder.query<TPost, string>({
      queryFn: async (postId, _api, _options, _baseQuery) => {
        let ret: TPost
        try {
          const postSnap = await getDoc(doc(db, 'posts', postId))

          ret = firestoreToTPost(postSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Post'],
    }),
    getAllPosts: builder.query<TPost[], void>({
      queryFn: async (_arg, _api, _options, _baseQuery) => {
        let ret: TPost[] = []
        try {
          const postSnap = await getDocs(
            query(collection(db, 'posts'), orderBy('createdAt', 'desc'))
          )

          postSnap.docs.forEach((d) => {
            ret.push(firestoreToTPost(d))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Post'],
    }),
    getPostsByUserId: builder.query<TPost[], string>({
      queryFn: async (userId, _api, _options, _baseQuery) => {
        let ret: TPost[] = []
        try {
          const postSnap = await getDocs(
            query(collection(db, 'posts'), where('userId', '==', userId), orderBy('createdAt', 'desc'))
          )

          postSnap.docs.forEach((d) => {
            ret.push(firestoreToTPost(d))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Post'],
    }),
    updatePost: builder.mutation<TPost, TPost>({
      queryFn: async (post, _api, _options, _baseQuery) => {
        let ret: TPost
        try {
          const postSnap = await getDoc(doc(db, 'posts', post.id))

          await updateDoc(postSnap.ref, {
            content: post.content,
            updatedAt: serverTimestamp(),
          })
          ret = firestoreToTPost(postSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['Post'],
    }),
    deletePost: builder.mutation<any, string>({
      queryFn: async (postId, _api, _options, _baseQuery) => {
        try {
          await deleteDoc(doc(db, 'posts', postId))
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: {} }
        }
      },
      invalidatesTags: ['Post'],
    }),
  }),
})

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetAllPostsQuery,
  useGetPostsByUserIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postApi
