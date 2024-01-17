import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		activeSidebar: ''
	},
	reducers: {
		setActiveSidebar: (state, action) => {
			state.activeSidebar = action.payload as string
		}
	}
})

export const { setActiveSidebar } = uiSlice.actions

export default uiSlice.reducer
