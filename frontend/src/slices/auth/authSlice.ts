import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
	name: 'auth',
	initialState: {
		userInfo: {}
	},
	reducers: {
		authAction: (state, action) => {
			state.userInfo = action.payload
		},
		signOutAction: (state, action) => {
			state.userInfo = action.payload
			localStorage.removeItem('persist:root')
		}
	}
})

export const { authAction, signOutAction } = auth.actions

export default auth.reducer
