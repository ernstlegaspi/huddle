import { create } from 'zustand'

type Props = {
	currentUser: User
	setCurrentUser: (newVal: User) => void
}

const useCurrentUser = create<Props>((set) => ({
	currentUser: {
		id: '',
		name: '',
		email: '',
		username: '',
		interests: [],
		birthday: '',
		password: '',
		picture: ''
	},
	setCurrentUser: (newVal: User) => set({ currentUser: newVal })
}))

export default useCurrentUser
