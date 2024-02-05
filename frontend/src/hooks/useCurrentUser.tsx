import { create } from 'zustand'

type Props = {
	currentUser: User
	setCurrentUser: (newVal: User) => void
}

const useCurrentUser = create<Props>((set) => ({
	currentUser: {
		_id: '',
		coverPhoto: '',
		name: '',
		email: '',
		username: '',
		interests: [],
		birthday: '',
		password: '',
		picture: '',
		requestsSent: []
	},
	setCurrentUser: (newVal: User) => set({ currentUser: newVal })
}))

export default useCurrentUser
