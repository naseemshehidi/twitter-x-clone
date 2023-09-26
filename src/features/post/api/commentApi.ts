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
import { TComment, TCommentWithoutIdAndDate } from '../types'

const firestoreToTComment = (commentDoc: DocumentSnapshot): TComment => {
  const commentData = commentDoc.data()
  return {
    id: commentDoc.id,
    content: commentData?.content,
    type: commentData?.type,
    userId: commentData?.userId,
    postId: commentData?.postId,
    createdAt: commentData?.createdAt.seconds * 1000,
    updatedAt: commentData?.updatedAt.seconds * 1000,
  }
}

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['Comment'],
  endpoints: (builder) => ({
    createComment: builder.mutation<TComment, TCommentWithoutIdAndDate>({
      queryFn: async (comment, _api, _options, _baseQuery) => {
        let ret: TComment
        try {
          const docRef = await addDoc(collection(db, 'comments'), {
            content: comment.content,
            type: comment.type,
            postId: comment.postId,
            userId: comment.userId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          })
          const commentSnap = await getDoc(docRef)

          ret = firestoreToTComment(commentSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['Comment'],
    }),
    getComment: builder.query<TComment, string>({
      queryFn: async (commentId, _api, _options, _baseQuery) => {
        let ret: TComment
        try {
          const commentSnap = await getDoc(doc(db, 'comments', commentId))

          ret = firestoreToTComment(commentSnap)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Comment'],
    }),
    getAllComments: builder.query<TComment[], void>({
      queryFn: async (_arg, _api, _options, _baseQuery) => {
        let ret: TComment[] = []
        try {
          const commentSnap = await getDocs(
            query(collection(db, 'comments'), orderBy('createdAt', 'desc'))
          )

          commentSnap.docs.forEach((d) => {
            ret.push(firestoreToTComment(d))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Comment'],
    }),
    getCommentsByUserId: builder.query<TComment[], string>({
      queryFn: async (userId, _api, _options, _baseQuery) => {
        let ret: TComment[] = []
        try {
          const q = query(
            collection(db, 'comments'),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
          )
          const commentSnap = await getDocs(q)

          commentSnap.docs.forEach((d) => {
            ret.push(firestoreToTComment(d))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Comment'],
    }),
    getCommentsByPostId: builder.query<TComment[], string>({
      queryFn: async (postId, _api, _options, _baseQuery) => {
        let ret: TComment[] = []
        try {
          const q = query(
            collection(db, 'comments'),
            where('postId', '==', postId),
            orderBy('createdAt', 'desc')
          )
          const commentSnap = await getDocs(q)

          commentSnap.docs.forEach((d) => {
            ret.push(firestoreToTComment(d))
          })
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['Comment'],
    }),
    updateComment: builder.mutation<TComment, TComment>({
      queryFn: async (comment, _api, _options, _baseQuery) => {
        let ret: TComment
        try {
          const docRef = await getDoc(doc(db, 'comments', comment.id))
          await updateDoc(docRef.ref, {
            content: comment.content,
            updatedAt: serverTimestamp(),
          })

          const newDoc = await getDoc(doc(db, 'comments', comment.id))

          ret = firestoreToTComment(newDoc)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['Comment'],
    }),
    deleteComment: builder.mutation<any, string>({
      queryFn: async (commentId, _api, _options, _baseQuery) => {
        try {
          await deleteDoc(doc(db, 'comments', commentId))
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: {} }
        }
      },
      invalidatesTags: ['Comment'],
    }),
  }),
})

export const {
  useCreateCommentMutation,
  useGetCommentQuery,
  useGetAllCommentsQuery,
  useGetCommentsByUserIdQuery,
  useGetCommentsByPostIdQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi
