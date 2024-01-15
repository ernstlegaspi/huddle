import { createSlice } from '@reduxjs/toolkit'

const auth = createSlice({
	name: 'auth',
	initialState: {
		userInfo: {}
	},
	reducers: {
		authAction: (state, action) => {
			state.userInfo = action.payload
			localStorage.setItem('userInfo', JSON.stringify(action.payload))
		}
	}
})

export const { authAction } = auth.actions

export default auth.reducer
