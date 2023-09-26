import {
  EditComment,
  EditPost,
  Feed,
  NewPost,
  PostDetails,
} from '@/features/post/components'
import {
  EditProfile,
  Login,
  Logout,
  Profile,
  Register,
} from '@/features/user/components'
import { useAuth } from '@/features/user/hooks/useAuth'
import { ErrorPage, Home, Landing } from '@/pages'
import { Route, Routes } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Loading } from '@/components/Loading'

export const AppRoutes = () => {
  const { authUser, isLoading} = useAuth()

  const [main, setMain] = useState<React.ReactNode>(<Loading />)

  useEffect(() => {
    if (!isLoading)
    authUser ? setMain(<Home />) : setMain(<Landing />)
  }, [authUser, isLoading])



  return (
    <Routes>
      <Route path='/' element={main} errorElement={<ErrorPage />}>
        <Route index element={<Feed />} />
        <Route path='post/:id' element={<PostDetails />} />
        <Route path='post/edit/:id' element={<EditPost />} />
        <Route path='post/new' element={<NewPost />} />
        <Route path='comment/edit/:id' element={<EditComment />} />
        <Route path='profile/:id' element={<Profile />} />
        <Route path='profile/edit' element={<EditProfile />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/*' element={<ErrorPage />} />
    </Routes>
  )
}
