import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: ''
}

export const currentUserSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeCurrentUser: (state, action) => {
      state.currentUser = action.payload
    }
  }
})

export const { changeCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer
