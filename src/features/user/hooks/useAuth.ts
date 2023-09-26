import { RootState } from '@/stores/store'
import { auth, db } from '@/utils/firebase'
import { collection, getDocs, query, where } from '@firebase/firestore'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userReceived } from '../api/authUserSlice'
import { firestoreToTUser } from '../api/userApi'
import { TUser } from '../types'

export const useAuth = () => {
  const [user, setUser] = useState<TUser | null>(
    useSelector((state: RootState) => state.authUser.user)
  )
  const [isLoading, setIsLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) {
      auth.onAuthStateChanged((user) => {
        if (user) {
          console.log('user found', user.email)
          //get user data from firebase
          const q = query(
            collection(db, 'users'),
            where('email', '==', user.email)
          )
          let u = null
          getDocs(q).then((snapshot) => {
            u = firestoreToTUser(snapshot.docs[0].data())
            dispatch(userReceived(u))
            setUser(u)
            setIsLoading(false)
          })
        } else {
          setUser(null)
          setIsLoading(false)
        }
      })
    } else {
      setIsLoading(false)
    }
  }, [ user])

  return { authUser: user, isLoading }
}
