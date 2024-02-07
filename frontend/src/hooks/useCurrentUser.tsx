import { create } from 'zustand'

type Props = {
	currentUser: User
	setCurrentUser: (newVal: User) => void
}

const useCurrentUser = create<Props>((set) => ({
	currentUser: {
		_id: '',
		birthday: '',
		coverPhoto: '',
		name: '',
		email: '',
		hasNotification: false,
		interests: [],
		password: '',
		picture: '',
		requestsSent: [],
		username: ''
	},
	setCurrentUser: (newVal: User) => set({ currentUser: newVal })
}))

export default useCurrentUser
