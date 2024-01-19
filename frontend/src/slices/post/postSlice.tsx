import { createSlice } from '@reduxjs/toolkit'

const postSlice = createSlice({
	name: 'post',
	initialState: {
		currentUserPosts: {}
	},
	reducers: {
		setCurrentUserPosts: (state, action) => {
			state.currentUserPosts = action.payload
		}
	}
})

export const { setCurrentUserPosts } = postSlice.actions

export default postSlice.reducer
