import { auth, db, storage } from '@/utils/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@firebase/auth'
import {
  Timestamp,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  serverTimestamp,
} from '@firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage'
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { TProfile, TUser, TUserWithoutIdAndDate } from '../types'

export const firestoreToTUser = (data: any): TUser => {
  return {
    id: data.id,
    username: data.username,
    password: '',
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatar: data.avatar,
    bio: data.bio,
    birthDate: data.birthDate.seconds * 1000, // data.birthDate should be a Timestamp => convert to milliseconds (number)
    createdAt: data.createdAt.seconds * 1000, // same
    updatedAt: data.updatedAt.seconds * 1000, // same
  }
}

const firestoreToTProfile = (data: any): TProfile => {
  return {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    avatar: data.avatar,
    bio: data.bio,
    birthDate: data.birthDate.seconds * 1000, // data.birthDate should be a Timestamp => convert to milliseconds (number)
    createdAt: data.createdAt.seconds * 1000, // same
    updatedAt: data.updatedAt.seconds * 1000, // same
  }
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fakeBaseQuery(),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    register: builder.mutation<TUser, TUserWithoutIdAndDate>({
      queryFn: async (user, _api, _extraOptions, _baseQuery) => {
        let ret: TUser
        /** upload image to storage */
        const time: string = new Date().getTime().toString()
        const storageRef = ref(storage, time)

        if (user.avatar) {
          try {
            const snapshot = await uploadBytes(
              storageRef,
              user.avatar[0] as File,
              { contentType: 'image/jpeg' }
            )
            const url = await getDownloadURL(snapshot.ref)

            user.avatar = url
          } catch (err) {
            console.error(err)
            return { error: err }
          }
        }
        try {
          const credential = await createUserWithEmailAndPassword(
            auth,
            user.email,
            user.password
          )

          const now = new Date()

          await addDoc(collection(db, 'users'), {
            id: credential.user.uid,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            birthDate: Timestamp.fromDate(new Date(user.birthDate)),
            createdAt: Timestamp.fromDate(now),
            updatedAt: Timestamp.fromDate(now),
            avatar: user.avatar,
            bio: user.bio,
          })

          ret = {
            ...user,
            id: credential.user.uid,
            createdAt: now.getTime(),
            updatedAt: now.getTime(),
          }
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['User'],
    }),
    login: builder.mutation<TUser, { email: string; password: string }>({
      queryFn: async (user, _api, _extraOptions, _baseQuery) => {
        let ret: TUser
        try {
          await signInWithEmailAndPassword(auth, user.email, user.password)
          const q = query(
            collection(db, 'users'),
            where('email', '==', user.email)
          )
          const snapshot = await getDocs(q)
          ret = firestoreToTUser(snapshot.docs[0].data())
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['User'],
    }),
    getProfile: builder.query<TProfile, string>({
      queryFn: async (profileId, _api, _extraOptions, _baseQuery) => {
        let ret: TProfile
        try {
          const q = query(collection(db, 'users'), where('id', '==', profileId))
          const snapshot = await getDocs(q)
          const data = snapshot.docs[0].data()
          ret = firestoreToTProfile(data)
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      providesTags: ['User'],
    }),
    updateProfile: builder.mutation<TProfile, TUser>({
      queryFn: async (user, _api, _extraOptions, _baseQuery) => {
        // Create FormData and append the avatar
        let ret: TProfile
        try {
          const q = query(collection(db, 'users'), where('id', '==', user.id))
          const snapshot = await getDocs(q)
          await updateDoc(snapshot.docs[0].ref, {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            birthDate: Timestamp.fromDate(new Date(user.birthDate)),
            updatedAt: serverTimestamp(),
            avatar: user.avatar,
            bio: user.bio,
          })
          const newSnap = await getDocs(q)
          ret = firestoreToTProfile(newSnap.docs[0])
        } catch (err) {
          console.error(err)
          return { error: err }
        } finally {
          return { data: ret! }
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = userApi
