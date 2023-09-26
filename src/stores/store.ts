import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query/react'
import { userApi } from '@/features/user/api/userApi'
import { postApi } from '@/features/post/api/postApi'
import { commentApi } from '@/features/post/api/commentApi'
import { likeApi } from '@/features/post/api/likeApi'
import { followApi } from '@/features/user/api/followApi'
import authUserReducer from "@/features/user/api/authUserSlice"
export const store = configureStore({
  reducer: {
    // Add the auto-generated reducer to your store
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [followApi.reducerPath]: followApi.reducer,
    authUser: authUserReducer,
  },
  // Add the middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(postApi.middleware)
      .concat(commentApi.middleware)
      .concat(likeApi.middleware)
      .concat(followApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Setup listeners for lifecycle events
setupListeners(store.dispatch)
