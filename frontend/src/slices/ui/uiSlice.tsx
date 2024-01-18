import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
	name: 'ui',
	initialState: {
		activeSidebar: '',
		viewProfile: false
	},
	reducers: {
		setActiveSidebar: (state, action) => {
			state.activeSidebar = action.payload as string
		},
		setViewProfile: (state, action) => {
			state.viewProfile = action.payload as boolean
		}
	}
})

export const { setActiveSidebar, setViewProfile } = uiSlice.actions

export default uiSlice.reducer
