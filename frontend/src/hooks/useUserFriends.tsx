import { create } from 'zustand'

type Props = {
	userFriends: User[]
	setUserFriends: (newVal: User[]) => void
}

const useUserFriends = create<Props>((set) => ({
	userFriends: [],
	setUserFriends: (newVal: User[]) => set({ userFriends: newVal })
}))

export default useUserFriends
