import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogout } from '../api/authUserSlice'
import { auth } from '@/utils/firebase'
import { deleteUser, signOut } from '@firebase/auth'
import { Loading } from '@/components/Loading'

export const Logout = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    auth.currentUser &&
      signOut(auth)
        .then(() => {
          dispatch(userLogout())
        })
        .catch((err) => {
          console.error('ERROR LOGGING OUT', err)
        })
        .finally(() => {
          navigate('/')
        })
  })

  return <Loading />
}
