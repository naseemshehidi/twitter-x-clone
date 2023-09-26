import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TUser } from '../types'

export interface IAuthUserState {
  user: TUser | null
  status: 'idle' | 'loading' | 'failed' | 'succeeded'
  error: string | null
}

const initialState: IAuthUserState = {
  user: null,
  status: 'idle',
  error: null,
}

const authUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    userLoading: (state) => {
      state.status = 'loading'
    },
    userReceived: (state, action: PayloadAction<TUser>) => {
      state.status = 'succeeded'
      state.user = action.payload
    },
    userError: (state, action) => {
      state.status = 'failed'
      state.error = action.payload
    },
    userLogout: (state) => {
      state.user = null
    },
  },
})

export const { userLoading, userReceived, userError, userLogout } =
  authUserSlice.actions

export default authUserSlice.reducer
